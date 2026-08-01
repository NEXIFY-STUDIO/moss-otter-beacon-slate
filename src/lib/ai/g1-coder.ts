import {
  g1CodeMapSchema,
  type G1CodeMap,
} from "@/lib/validations/ai-schemas";
import type { G0Plan } from "@/lib/validations/ai-schemas";
import { MODEL_MAP } from "@/lib/ai/providers";
import { generateSiteFiles } from "@/lib/ai/generate-site";

export async function runG1Coder(
  plan: G0Plan,
  originalByPath: Map<string, string>,
  options?: {
    signal?: AbortSignal | undefined;
    onToken?: ((chunk: string, path: string) => void) | undefined;
    prompt?: string | undefined;
  },
): Promise<{ codeMap: G1CodeMap; latencyMs: number; tokens: number; model: string }> {
  const started = performance.now();
  const prompt = options?.prompt ?? plan.summary;
  const generated = generateSiteFiles(prompt);
  const byPath = new Map(generated.files.map((f) => [f.path, f]));

  const files: G1CodeMap["files"] = [];
  const queue = [...plan.files];

  // Ensure every generated multi-page file is in the queue even if G0 missed one
  for (const g of generated.files) {
    if (!queue.some((q) => q.path === g.path)) {
      queue.push({
        path: g.path,
        description: g.description,
        language: g.language,
      });
    }
  }

  const workers = [0, 1].map(async () => {
    while (queue.length > 0) {
      if (options?.signal?.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }
      const item = queue.shift();
      if (!item) break;

      const gen = byPath.get(item.path);
      const content =
        gen?.content ??
        originalByPath.get(item.path) ??
        `// Generated for ${item.path}\nexport default function Stub(){return null}\n`;

      const chunkSize = 64;
      for (let i = 0; i < content.length; i += chunkSize) {
        if (options?.signal?.aborted) {
          throw new DOMException("Aborted", "AbortError");
        }
        const chunk = content.slice(i, i + chunkSize);
        options?.onToken?.(chunk, item.path);
        await delay(10, options?.signal);
      }
      files.push({
        path: item.path,
        content,
        language: item.language ?? gen?.language ?? "tsx",
      });
    }
  });
  await Promise.all(workers);

  // Dedupe by path (last wins)
  const dedup = new Map(files.map((f) => [f.path, f]));
  const codeMap = g1CodeMapSchema.parse({ files: [...dedup.values()] });
  return {
    codeMap,
    latencyMs: Math.round(performance.now() - started),
    tokens: codeMap.files.reduce((n, f) => n + Math.ceil(f.content.length / 4), 0),
    model: MODEL_MAP.g1.model,
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
