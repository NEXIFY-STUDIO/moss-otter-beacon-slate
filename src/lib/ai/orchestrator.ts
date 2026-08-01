import { runG0Planner } from "@/lib/ai/g0-planner";
import { runG1Coder } from "@/lib/ai/g1-coder";
import { runG2Auditor } from "@/lib/ai/g2-auditor";
import type { G0Plan, G1CodeMap, G2Audit } from "@/lib/validations/ai-schemas";

export type OrchestratorEvent =
  | { type: "phase"; phase: "planning" | "coding" | "auditing" | "done" | "error" }
  | {
      type: "agent";
      agent: "G0" | "G1" | "G2";
      state: "running" | "success" | "error";
      message: string;
      latencyMs?: number;
    }
  | { type: "token"; path: string; chunk: string; accumulated: string }
  | { type: "plan"; plan: G0Plan }
  | { type: "code"; codeMap: G1CodeMap }
  | { type: "audit"; audit: G2Audit }
  | {
      type: "metrics";
      latencyMs: number;
      tokens: number;
      log: {
        model: string;
        agentType: string;
        latencyMs: number;
        tokens: number;
      }[];
    }
  | { type: "error"; message: string };

export async function runOrchestrator(input: {
  prompt: string;
  files: Map<string, string>;
  signal?: AbortSignal | undefined;
  onEvent?: ((event: OrchestratorEvent) => void) | undefined;
}): Promise<void> {
  const emit = (e: OrchestratorEvent) => input.onEvent?.(e);
  const log: {
    model: string;
    agentType: string;
    latencyMs: number;
    tokens: number;
  }[] = [];
  const t0 = performance.now();

  try {
    emit({ type: "phase", phase: "planning" });
    emit({
      type: "agent",
      agent: "G0",
      state: "running",
      message: "Architecture only…",
    });
    const g0 = await runG0Planner(input.prompt, { signal: input.signal });
    log.push({
      model: g0.model,
      agentType: "G0",
      latencyMs: g0.latencyMs,
      tokens: g0.tokens,
    });
    emit({
      type: "agent",
      agent: "G0",
      state: "success",
      message: `${g0.plan.files.length} file(s)`,
      latencyMs: g0.latencyMs,
    });
    emit({ type: "plan", plan: g0.plan });

    emit({ type: "phase", phase: "coding" });
    emit({
      type: "agent",
      agent: "G1",
      state: "running",
      message: "Streaming code…",
    });
    const accum = new Map<string, string>();
    let rafPending = false;
    let lastPath = "";
    let lastChunk = "";
    const flushToken = () => {
      rafPending = false;
      if (!lastPath) return;
      emit({
        type: "token",
        path: lastPath,
        chunk: lastChunk,
        accumulated: accum.get(lastPath) ?? "",
      });
    };
    const g1 = await runG1Coder(g0.plan, input.files, {
      signal: input.signal,
      prompt: input.prompt,
      onToken: (chunk, path) => {
        accum.set(path, (accum.get(path) ?? "") + chunk);
        lastPath = path;
        lastChunk = chunk;
        if (!rafPending) {
          rafPending = true;
          if (typeof requestAnimationFrame === "function") {
            requestAnimationFrame(flushToken);
          } else {
            flushToken();
          }
        }
      },
    });
    log.push({
      model: g1.model,
      agentType: "G1",
      latencyMs: g1.latencyMs,
      tokens: g1.tokens,
    });
    emit({
      type: "agent",
      agent: "G1",
      state: "success",
      message: "Code map ready",
      latencyMs: g1.latencyMs,
    });
    emit({ type: "code", codeMap: g1.codeMap });

    emit({ type: "phase", phase: "auditing" });
    emit({
      type: "agent",
      agent: "G2",
      state: "running",
      message: "Security + a11y…",
    });
    const g2 = await runG2Auditor(g1.codeMap, { signal: input.signal });
    log.push({
      model: g2.model,
      agentType: "G2",
      latencyMs: g2.latencyMs,
      tokens: g2.tokens,
    });
    emit({
      type: "agent",
      agent: "G2",
      state: g2.audit.passed ? "success" : "error",
      message: g2.audit.passed
        ? "Audit clean"
        : `${g2.audit.issues.filter((i) => i.severity === "error").length} critical`,
      latencyMs: g2.latencyMs,
    });
    emit({ type: "audit", audit: g2.audit });

    const totalTokens = log.reduce((n, r) => n + r.tokens, 0);
    emit({
      type: "metrics",
      latencyMs: Math.round(performance.now() - t0),
      tokens: totalTokens,
      log,
    });
    emit({ type: "phase", phase: "done" });
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      emit({ type: "error", message: "Aborted" });
      return;
    }
    const message = e instanceof Error ? e.message : "Pipeline error";
    emit({ type: "error", message });
    emit({ type: "phase", phase: "error" });
  }
}
