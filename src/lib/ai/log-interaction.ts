import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { aiInteractionLogInputSchema } from "@/lib/validations/ai-schemas";

const resultSchema = z.object({
  id: z.string(),
  ok: z.literal(true),
  userId: z.string(),
});

export type AiLogRow = {
  id: string;
  project_id: string;
  agent_type: string;
  model: string;
  prompt: string;
  response_summary: string | null;
  latency_ms: number;
  tokens: number;
  image_count: number;
  status: string;
  created_at: string;
};

/** Ensure table exists even if a long-lived PGLite skipped a late migration file. */
async function ensureAiLogTable(): Promise<void> {
  const sql = await getSql();
  await sql.query(`
    create table if not exists ai_interaction_log (
      id text primary key,
      user_id text not null,
      project_id text not null,
      agent_type text not null,
      model text not null,
      prompt text not null,
      response_summary text,
      latency_ms integer not null default 0,
      tokens integer not null default 0,
      image_count integer not null default 0,
      status text not null default 'ok',
      created_at timestamptz not null default now()
    )
  `);
}

/**
 * Persist one AiInteractionLog row (PGLite in preview / Neon in prod).
 * Uses session user when present; falls back to 'anonymous' so the demo
 * pipeline can log without forcing sign-in (S21 hardens ownership elsewhere).
 */
export const logAiInteraction = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => aiInteractionLogInputSchema.parse(data))
  .handler(async ({ data }) => {
    const { getSessionUser, DEV_USER_ID } = await import(
      "@/lib/auth/verify.server"
    );
    const { authConfigured } = await import("@/lib/auth/server");
    let userId = DEV_USER_ID;
    if (authConfigured) {
      const session = await getSessionUser();
      userId = session?.id ?? "anonymous";
    }

    await ensureAiLogTable();
    const sql = await getSql();
    const id = crypto.randomUUID();
    await sql`
      insert into ai_interaction_log (
        id, user_id, project_id, agent_type, model, prompt,
        response_summary, latency_ms, tokens, image_count, status
      ) values (
        ${id},
        ${userId},
        ${data.projectId},
        ${data.agentType},
        ${data.model},
        ${data.prompt},
        ${data.responseSummary ?? null},
        ${data.latencyMs},
        ${data.tokens},
        ${data.imageCount},
        ${data.status}
      )
    `;
    return resultSchema.parse({ id, ok: true as const, userId });
  });

export const listAiInteractionLogs = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z
      .object({
        projectId: z.string().min(1).optional(),
        limit: z.number().int().min(1).max(100).optional(),
      })
      .parse(data ?? {}),
  )
  .handler(async ({ data }): Promise<AiLogRow[]> => {
    const { getSessionUser, DEV_USER_ID } = await import(
      "@/lib/auth/verify.server"
    );
    const { authConfigured } = await import("@/lib/auth/server");
    let userId = DEV_USER_ID;
    if (authConfigured) {
      const session = await getSessionUser();
      userId = session?.id ?? "anonymous";
    }

    await ensureAiLogTable();
    const sql = await getSql();
    const limit = data.limit ?? 20;
    const rows = data.projectId
      ? await sql<AiLogRow>`
        select id, project_id, agent_type, model, prompt, response_summary,
               latency_ms, tokens, image_count, status, created_at::text as created_at
        from ai_interaction_log
        where user_id = ${userId} and project_id = ${data.projectId}
        order by created_at desc
        limit ${limit}
      `
      : await sql<AiLogRow>`
        select id, project_id, agent_type, model, prompt, response_summary,
               latency_ms, tokens, image_count, status, created_at::text as created_at
        from ai_interaction_log
        where user_id = ${userId}
        order by created_at desc
        limit ${limit}
      `;
    return rows.map((r) => ({
      id: String(r.id),
      project_id: String(r.project_id),
      agent_type: String(r.agent_type),
      model: String(r.model),
      prompt: String(r.prompt),
      response_summary:
        r.response_summary === null || r.response_summary === undefined
          ? null
          : String(r.response_summary),
      latency_ms: Number(r.latency_ms),
      tokens: Number(r.tokens),
      image_count: Number(r.image_count),
      status: String(r.status),
      created_at: String(r.created_at),
    }));
  });
