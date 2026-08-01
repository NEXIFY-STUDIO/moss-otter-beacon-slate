import { z } from "zod";

/** Relative project path: no absolute, no `..`, no leading slash. */
export const projectFilePathSchema = z
  .string()
  .trim()
  .min(1, "Path is required")
  .max(512, "Path too long")
  .refine((p) => !p.startsWith("/"), { message: "Absolute paths are not allowed" })
  .refine((p) => !p.includes("\\"), { message: "Use forward slashes" })
  .refine((p) => !p.split("/").some((seg) => seg === ".." || seg === "."), {
    message: "Path must not contain . or .. segments",
  })
  .refine((p) => !p.includes("\0"), { message: "Invalid path character" })
  .refine((p) => /^[a-zA-Z0-9_./@+-]+$/.test(p), {
    message: "Path has invalid characters",
  });

export type ProjectFilePath = z.infer<typeof projectFilePathSchema>;

export function parseProjectPath(
  path: string,
): { ok: true; path: string } | { ok: false; error: string } {
  const result = projectFilePathSchema.safeParse(path);
  if (!result.success) {
    const msg =
      result.error.issues[0]?.message ?? "Invalid path";
    return { ok: false, error: msg };
  }
  return { ok: true, path: result.data };
}
