/** Which database backend is active. */
export type DbSource = "neon" | "pglite";

// An empty/whitespace DATABASE_URL (an easy misconfig in deploy UIs) must mean
// "unset" — otherwise production would silently run on the PGLite fallback.
const rawDatabaseUrl =
  typeof process !== "undefined" ? process.env.DATABASE_URL : undefined;
const databaseUrl =
  rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : undefined;

/**
 * Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
 * sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
 * the app has a working database even with nothing configured — the live preview
 * included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
 */
export const dbSource: DbSource = databaseUrl ? "neon" : "pglite";

/**
 * Minimal shared SQL surface, satisfied by both Neon and PGLite. Both the
 * tagged-template and `.query()` forms resolve to an array of row objects:
 *
 *   const sql = await getSql();
 *   const rows = await sql`select * from todos where id = ${id}`; // parameterized
 *   const rows2 = await sql.query("select * from todos where id = $1", [id]);
 */
export interface Sql {
  <T = Record<string, unknown>>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<T[]>;
  query<T = Record<string, unknown>>(
    text: string,
    params?: unknown[],
  ): Promise<T[]>;
}

/**
 * Init state lives on globalThis as promises: dev HMR creates new instances of
 * this module, and two instances racing module-level state would open a second
 * pool or run two concurrent PGLite migration passes (whose duplicate
 * `_migrations` insert rejects — and would get memoized, poisoning every later
 * `getSql()`). A failed init clears its slot so the next call retries.
 */
const globalRef = globalThis as typeof globalThis & {
  __pgSqlPromise__?: Promise<Sql> | undefined;
  __pgliteInstance__?: Promise<import("@electric-sql/pglite").PGlite> | undefined;
  __pgliteMigrateChain__?: Promise<void> | undefined;
  __pgliteSqlPromise__?: Promise<Sql> | undefined;
};

/**
 * Result-type parity: Postgres sends every value as text plus a type OID — the
 * JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
 * int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
 * JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
 * production return identical, JSON-safe shapes:
 *   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
 *                                   `::text` if you ever need huge integers)
 *   date                         -> 'YYYY-MM-DD' string
 *   interval                     -> Postgres interval text
 * numeric already comes back as a string on both (arbitrary precision).
 */
const OID_INT8 = 20;
const OID_DATE = 1082;
const OID_INTERVAL = 1186;
const identity = (v: string) => v;

type Run = <T>(text: string, params: unknown[]) => Promise<T[]>;

/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run: Run): Sql {
  const sql = (async <T = Record<string, unknown>>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<T[]> => {
    // Rebuild with $1, $2, … placeholders so values stay parameterized.
    let text = strings[0] ?? "";
    for (let i = 0; i < values.length; i += 1) {
      text += `$${i + 1}${strings[i + 1] ?? ""}`;
    }
    return run<T>(text, values);
  }) as unknown as Sql;
  sql.query = <T = Record<string, unknown>>(text: string, params: unknown[] = []) =>
    run<T>(text, params);
  return sql;
}

function createNeonSql(): Promise<Sql> {
  globalRef.__pgSqlPromise__ ??= (async () => {
    // Regular Postgres driver: node-postgres (`pg`) — works directly with Neon's
    // pooled endpoint. One pool per process; warm serverless instances reuse it.
    const { Pool, types } = await import("pg");
    types.setTypeParser(OID_INT8, Number);
    types.setTypeParser(OID_DATE, identity);
    types.setTypeParser(OID_INTERVAL, identity);
    const pool = new Pool({ connectionString: databaseUrl });
    return toSql(async <T>(text: string, params: unknown[]) => {
      const res = await pool.query(text, params);
      return res.rows as T[];
    });
  })().catch((err) => {
    globalRef.__pgSqlPromise__ = undefined;
    throw err;
  });
  return globalRef.__pgSqlPromise__;
}

async function ensurePgliteInstance(): Promise<
  import("@electric-sql/pglite").PGlite
> {
  globalRef.__pgliteInstance__ ??= (async () => {
    const { PGlite } = await import("@electric-sql/pglite");
    const pg = new PGlite({
      parsers: {
        [OID_INT8]: Number,
        [OID_DATE]: identity,
        [OID_INTERVAL]: identity,
      },
    });
    await pg.waitReady;
    await pg.exec(
      "create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())",
    );
    return pg;
  })().catch((err) => {
    globalRef.__pgliteInstance__ = undefined;
    throw err;
  });
  return globalRef.__pgliteInstance__;
}

async function migratePglite(
  pg: import("@electric-sql/pglite").PGlite,
): Promise<void> {
  const migrations = import.meta.glob("/migrations/*.sql", {
    query: "?raw",
    import: "default",
    eager: true,
  }) as Record<string, string>;
  const names = Object.keys(migrations).sort();
  for (const path of names) {
    const name = path.split("/").pop() ?? path;
    const existing = await pg.query<{ name: string }>(
      "select name from _migrations where name = $1",
      [name],
    );
    if (existing.rows.length > 0) continue;
    const sqlText = migrations[path];
    if (!sqlText) continue;
    await pg.exec(sqlText);
    await pg.query("insert into _migrations (name) values ($1)", [name]);
  }
}

async function createPgliteSql(): Promise<Sql> {
  globalRef.__pgliteSqlPromise__ ??= (async () => {
    const pg = await ensurePgliteInstance();

    // Serialize migration passes across concurrent getSql/getPglite callers.
    globalRef.__pgliteMigrateChain__ = (
      globalRef.__pgliteMigrateChain__ ?? Promise.resolve()
    )
      .then(() => migratePglite(pg))
      .catch((err) => {
        console.error("[db] migration failed:", err);
        throw err;
      });
    await globalRef.__pgliteMigrateChain__;

    return toSql(async <T>(text: string, params: unknown[]) => {
      const res = await pg.query(text, params);
      return res.rows as T[];
    });
  })().catch((err) => {
    globalRef.__pgliteSqlPromise__ = undefined;
    throw err;
  });
  return globalRef.__pgliteSqlPromise__;
}

/**
 * Shared PGLite client for Better Auth dialect and any code that needs the
 * raw embedded instance. Ensures migrations have applied first.
 */
export async function getPglite(): Promise<
  import("@electric-sql/pglite").PGlite
> {
  if (typeof window !== "undefined") {
    throw new Error("getPglite() is server-only");
  }
  if (dbSource !== "pglite") {
    throw new Error("getPglite() is only available when DATABASE_URL is unset");
  }
  // Run migrations via SQL path, then return the singleton instance.
  await createPgliteSql();
  return ensurePgliteInstance();
}

/**
 * Return a ready `Sql` handle. On the Neon path this is a thin wrapper around a
 * process-wide `pg.Pool`. On the PGLite path it also applies any pending
 * migrations. Throws when called from the browser — DB access is server-only.
 */
export async function getSql(): Promise<Sql> {
  if (typeof window !== "undefined") {
    throw new Error("getSql() is server-only");
  }
  if (dbSource === "neon") return createNeonSql();
  return createPgliteSql();
}

/**
 * Kick PGLite bootstrap (migrations included) without waiting for a route to
 * call `getSql`. No-op on Neon. Vite plugin awaits this during dev server setup;
 * module kick it off immediately (see bottom of file).
 */
export function ensureDbReady(): Promise<void> {
  if (dbSource !== "pglite") return Promise.resolve();
  return getSql().then(() => undefined);
}

// Server-only eager start: kick PGLite bootstrap as soon as this module loads in
// Node. Client bundles never hit this path (`getSql` throws in the browser).
const globalBoot = globalThis as typeof globalThis & {
  __pgBootstrapPromise__?: Promise<void> | undefined;
};
if (typeof window === "undefined" && dbSource === "pglite") {
  globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
    globalBoot.__pgBootstrapPromise__ = undefined;
    console.error("[db] PGLite bootstrap failed:", err);
    throw err;
  });
}
