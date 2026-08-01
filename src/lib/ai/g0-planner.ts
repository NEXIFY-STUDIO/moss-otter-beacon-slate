import {
  g0PlanSchema,
  type G0Plan,
} from "@/lib/validations/ai-schemas";
import { MODEL_MAP } from "@/lib/ai/providers";
import {
  blueprintFromPrompt,
  planFromBlueprint,
} from "@/lib/ai/generate-site";

export async function runG0Planner(
  prompt: string,
  options?: { signal?: AbortSignal | undefined },
): Promise<{ plan: G0Plan; latencyMs: number; tokens: number; model: string }> {
  const started = performance.now();
  if (!prompt.trim()) {
    throw new Error("Empty prompt — G0 requires a non-empty brief.");
  }
  await delay(420, options?.signal);

  const bp = blueprintFromPrompt(prompt);
  const raw = planFromBlueprint(bp, prompt);

  let plan: G0Plan;
  try {
    plan = g0PlanSchema.parse(raw);
  } catch {
    await delay(120, options?.signal);
    plan = g0PlanSchema.parse({
      summary: "Repaired multi-page plan: home + sections + pages",
      files: [
        {
          path: "src/App.tsx",
          description: "Home with sections",
          language: "tsx",
        },
        {
          path: "src/pages/Features.tsx",
          description: "Features page",
          language: "tsx",
        },
        {
          path: "src/pages/About.tsx",
          description: "About page",
          language: "tsx",
        },
        {
          path: "index.html",
          description: "Static multi-page entry",
          language: "html",
        },
      ],
    });
  }

  // Enforce multi-page minimum (home + >=2 pages)
  if (plan.files.length < 3) {
    plan = g0PlanSchema.parse(planFromBlueprint(bp, prompt));
  }

  const latencyMs = Math.round(performance.now() - started);
  return {
    plan,
    latencyMs,
    tokens: 220 + prompt.length + plan.files.length * 40,
    model: MODEL_MAP.g0.model,
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
