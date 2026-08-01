import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import {
  createProjectSchema,
  projectFileUpsertSchema,
  projectIdSchema,
  updateProjectSchema,
} from "@/lib/validations/project";

export type ProjectRow = {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  fileCount: number;
  updatedAt: string;
  userId: string;
};

export type ProjectFileRow = {
  id: string;
  path: string;
  content: string;
  language: string;
  updatedAt: string;
};

async function ensureProjectTables(): Promise<void> {
  const sql = await getSql();
  await sql.query(`
    create table if not exists projects (
      id text primary key,
      user_id text not null,
      title text not null,
      description text not null default '',
      is_public boolean not null default false,
      settings_json text not null default '{}',
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `);
  await sql.query(`
    create table if not exists project_files (
      id text primary key,
      project_id text not null,
      user_id text not null,
      path text not null,
      content text not null default '',
      language text not null default 'txt',
      updated_at timestamptz not null default now(),
      unique (project_id, path)
    )
  `);
}

async function assertOwnsProject(
  userId: string,
  projectId: string,
): Promise<void> {
  const sql = await getSql();
  const rows = await sql<{ id: string }>`
    select id from projects where id = ${projectId} and user_id = ${userId} limit 1
  `;
  if (rows.length === 0) {
    throw new Error("Forbidden: project not found or not owned");
  }
}

export const listProjects = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<ProjectRow[]> => {
    await ensureProjectTables();
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      title: string;
      description: string;
      is_public: boolean;
      file_count: number;
      updated_at: string;
      user_id: string;
    }>`
      select p.id, p.title, p.description, p.is_public,
             coalesce(f.cnt, 0)::int as file_count,
             p.updated_at::text as updated_at,
             p.user_id
      from projects p
      left join (
        select project_id, count(*)::int as cnt from project_files group by project_id
      ) f on f.project_id = p.id
      where p.user_id = ${context.userId}
      order by p.updated_at desc
    `;
    return rows.map((r) => ({
      id: String(r.id),
      title: String(r.title),
      description: String(r.description),
      isPublic: Boolean(r.is_public),
      fileCount: Number(r.file_count),
      updatedAt: String(r.updated_at),
      userId: String(r.user_id),
    }));
  });

export const createProject = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((data: unknown) => createProjectSchema.parse(data))
  .handler(async ({ data, context }) => {
    await ensureProjectTables();
    const sql = await getSql();
    const id = crypto.randomUUID();
    await sql`
      insert into projects (id, user_id, title, description, is_public)
      values (
        ${id},
        ${context.userId},
        ${data.title},
        ${data.description},
        ${data.isPublic}
      )
    `;
    return { id, ok: true as const };
  });

export const updateProject = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((data: unknown) => updateProjectSchema.parse(data))
  .handler(async ({ data, context }) => {
    await ensureProjectTables();
    await assertOwnsProject(context.userId, data.id);
    const sql = await getSql();
    if (data.title !== undefined) {
      await sql`
        update projects set title = ${data.title}, updated_at = now()
        where id = ${data.id} and user_id = ${context.userId}
      `;
    }
    if (data.description !== undefined) {
      await sql`
        update projects set description = ${data.description}, updated_at = now()
        where id = ${data.id} and user_id = ${context.userId}
      `;
    }
    if (data.isPublic !== undefined) {
      await sql`
        update projects set is_public = ${data.isPublic}, updated_at = now()
        where id = ${data.id} and user_id = ${context.userId}
      `;
    }
    return { ok: true as const };
  });

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((data: unknown) =>
    z.object({ id: z.string().min(1) }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await ensureProjectTables();
    await assertOwnsProject(context.userId, data.id);
    const sql = await getSql();
    await sql`
      delete from project_files where project_id = ${data.id} and user_id = ${context.userId}
    `;
    await sql`
      delete from projects where id = ${data.id} and user_id = ${context.userId}
    `;
    return { ok: true as const };
  });

export const listProjectFiles = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator((data: unknown) => projectIdSchema.parse(data))
  .handler(async ({ data, context }): Promise<ProjectFileRow[]> => {
    await ensureProjectTables();
    await assertOwnsProject(context.userId, data.projectId);
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      path: string;
      content: string;
      language: string;
      updated_at: string;
    }>`
      select id, path, content, language, updated_at::text as updated_at
      from project_files
      where project_id = ${data.projectId} and user_id = ${context.userId}
      order by path asc
    `;
    return rows.map((r) => ({
      id: String(r.id),
      path: String(r.path),
      content: String(r.content),
      language: String(r.language),
      updatedAt: String(r.updated_at),
    }));
  });

export const upsertProjectFile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((data: unknown) => projectFileUpsertSchema.parse(data))
  .handler(async ({ data, context }) => {
    await ensureProjectTables();
    await assertOwnsProject(context.userId, data.projectId);
    const sql = await getSql();
    const existing = await sql<{ id: string }>`
      select id from project_files
      where project_id = ${data.projectId} and path = ${data.path}
      limit 1
    `;
    if (existing[0]) {
      await sql`
        update project_files
        set content = ${data.content}, language = ${data.language}, updated_at = now()
        where id = ${existing[0].id} and user_id = ${context.userId}
      `;
      await sql`
        update projects set updated_at = now()
        where id = ${data.projectId} and user_id = ${context.userId}
      `;
      return { id: String(existing[0].id), ok: true as const };
    }
    const id = crypto.randomUUID();
    await sql`
      insert into project_files (id, project_id, user_id, path, content, language)
      values (
        ${id},
        ${data.projectId},
        ${context.userId},
        ${data.path},
        ${data.content},
        ${data.language}
      )
    `;
    await sql`
      update projects set updated_at = now()
      where id = ${data.projectId} and user_id = ${context.userId}
    `;
    return { id, ok: true as const };
  });

export const deleteProjectFile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((data: unknown) =>
    z
      .object({
        projectId: z.string().min(1),
        path: z.string().min(1),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await ensureProjectTables();
    await assertOwnsProject(context.userId, data.projectId);
    const sql = await getSql();
    await sql`
      delete from project_files
      where project_id = ${data.projectId}
        and path = ${data.path}
        and user_id = ${context.userId}
    `;
    return { ok: true as const };
  });
