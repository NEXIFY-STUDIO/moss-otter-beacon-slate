import { z } from "zod";

export const projectSettingsSchema = z.object({
  defaultDevice: z.enum(["mobile", "tablet", "desktop"]).default("desktop"),
  theme: z.enum(["light", "dark", "system"]).default("system"),
});

export const createProjectSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(500).default(""),
  isPublic: z.boolean().default(false),
});

export const updateProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(120).optional(),
  description: z.string().max(500).optional(),
  isPublic: z.boolean().optional(),
});

export const projectFileUpsertSchema = z.object({
  projectId: z.string().min(1),
  path: z
    .string()
    .min(1)
    .max(260)
    .regex(/^[a-zA-Z0-9._\-/]+$/, "Invalid path"),
  content: z.string().max(500_000),
  language: z
    .enum(["tsx", "ts", "jsx", "js", "css", "json", "html", "md", "txt"])
    .default("txt"),
});

export const projectIdSchema = z.object({
  projectId: z.string().min(1),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectFileUpsert = z.infer<typeof projectFileUpsertSchema>;
