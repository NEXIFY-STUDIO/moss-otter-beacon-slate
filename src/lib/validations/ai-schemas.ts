import { z } from "zod";

export const agentTypeSchema = z.enum(["G0", "G1", "G2", "ORCHESTRATOR"]);

export const filePlanItemSchema = z.object({
  path: z.string().min(1),
  description: z.string().min(1),
  language: z
    .enum(["tsx", "ts", "jsx", "js", "css", "json", "html", "md", "txt"])
    .optional(),
});

export const g0PlanSchema = z.object({
  summary: z.string().min(1),
  files: z.array(filePlanItemSchema).min(1),
});

export const g1CodeFileSchema = z.object({
  path: z.string().min(1),
  content: z.string(),
  language: z.enum([
    "tsx",
    "ts",
    "jsx",
    "js",
    "css",
    "json",
    "html",
    "md",
    "txt",
  ]),
});

export const g1CodeMapSchema = z.object({
  files: z.array(g1CodeFileSchema).min(1),
});

export const g2IssueSchema = z.object({
  severity: z.enum(["info", "warn", "error"]),
  path: z.string().optional(),
  message: z.string().min(1),
  suggestion: z.string().optional(),
});

export const g2AuditSchema = z.object({
  issues: z.array(g2IssueSchema),
  cleanedFiles: z.array(g1CodeFileSchema),
  passed: z.boolean(),
});

export const promptInputSchema = z.object({
  prompt: z.string().min(1).max(8000),
  projectId: z.string().uuid().or(z.string().min(1)),
  imageDataUrls: z.array(z.string()).max(4).optional(),
});

export type G0Plan = z.infer<typeof g0PlanSchema>;
export type G1CodeMap = z.infer<typeof g1CodeMapSchema>;
export type G2Audit = z.infer<typeof g2AuditSchema>;
export type PromptInput = z.infer<typeof promptInputSchema>;
