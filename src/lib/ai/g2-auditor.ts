import {
  g2AuditSchema,
  type G1CodeMap,
  type G2Audit,
} from "@/lib/validations/ai-schemas";
import { MODEL_MAP } from "@/lib/ai/providers";

const CRITICAL = [/dangerouslySetInnerHTML/, /\beval\s*\(/, /new Function\s*\(/];

export async function runG2Auditor(
  codeMap: G1CodeMap,
  options?: { signal?: AbortSignal | undefined },
): Promise<{ audit: G2Audit; latencyMs: number; tokens: number; model: string }> {
  const started = performance.now();
  await delay(280, options?.signal);

  const issues: G2Audit["issues"] = [];
  for (const file of codeMap.files) {
    for (const re of CRITICAL) {
      if (re.test(file.content)) {
        issues.push({
          severity: "error",
          path: file.path,
          message: `Critical pattern: ${re.source}`,
          suggestion: "Remove unsafe runtime evaluation / raw HTML inject.",
        });
      }
    }
    if (!file.content.includes("aria-") && file.language === "tsx") {
      issues.push({
        severity: "info",
        path: file.path,
        message: "No explicit ARIA attributes detected (may be fine).",
        suggestion: "Ensure interactive elements have labels.",
      });
    }
    if (/#[0-9a-fA-F]{3,8}\b/.test(file.content) && file.language === "tsx") {
      issues.push({
        severity: "warn",
        path: file.path,
        message: "Raw hex color in TSX — prefer design tokens.",
        suggestion: "Use terracotta/cream/slate utility classes.",
      });
    }
  }

  const hasCritical = issues.some((i) => i.severity === "error");
  const audit = g2AuditSchema.parse({
    issues,
    cleanedFiles: codeMap.files,
    passed: !hasCritical,
  });

  return {
    audit,
    latencyMs: Math.round(performance.now() - started),
    tokens: 90 + issues.length * 12,
    model: MODEL_MAP.g2.model,
  };
}

function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const t = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(t);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}
