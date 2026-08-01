/**
 * Server-oriented model map. Never put API keys here — only public model ids.
 * Real keys live in env on server routes only.
 */
export type ProviderId = "mock" | "openai" | "anthropic";

export interface ModelRef {
  provider: ProviderId;
  model: string;
  label: string;
}

export const MODEL_MAP = {
  g0: {
    provider: "mock",
    model: "mock-g0-planner",
    label: "G0 Planner (mock)",
  },
  g1: {
    provider: "mock",
    model: "mock-g1-coder",
    label: "G1 Coder (mock)",
  },
  g2: {
    provider: "mock",
    model: "mock-g2-auditor",
    label: "G2 Auditor (mock)",
  },
} as const satisfies Record<"g0" | "g1" | "g2", ModelRef>;

export function resolveProviderFromEnv(): ProviderId {
  // Client-safe: never reads secrets; only public flags if any
  if (typeof process !== "undefined") {
    const flag = process.env.VITE_AI_PROVIDER;
    if (flag === "openai" || flag === "anthropic" || flag === "mock") {
      return flag;
    }
  }
  return "mock";
}
