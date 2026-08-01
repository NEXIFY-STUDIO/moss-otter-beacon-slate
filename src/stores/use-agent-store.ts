import { create } from "zustand";
import type {
  AgentPhase,
  AgentStatus,
  ChatMessage,
  RejectionFeedback,
} from "@/types/agent";

interface AgentState {
  phase: AgentPhase;
  agents: AgentStatus[];
  messages: ChatMessage[];
  isStreaming: boolean;
  latencyMs: number;
  tokensUsed: number;
  hitlVisible: boolean;
  rejectionOpen: boolean;
  lastRejection: RejectionFeedback | null;
  statusLog: string[];
  setPhase: (phase: AgentPhase) => void;
  setAgentState: (
    type: AgentStatus["type"],
    patch: Partial<Omit<AgentStatus, "type">>,
  ) => void;
  addMessage: (
    message: Omit<ChatMessage, "id" | "createdAt"> & { id?: string },
  ) => void;
  clearMessages: () => void;
  setStreaming: (value: boolean) => void;
  setMetrics: (latencyMs: number, tokensUsed: number) => void;
  setHitlVisible: (value: boolean) => void;
  setRejectionOpen: (value: boolean) => void;
  setLastRejection: (feedback: RejectionFeedback | null) => void;
  pushStatus: (line: string) => void;
  resetPipeline: () => void;
  runDemoPipeline: () => Promise<void>;
  abort: () => void;
}

const defaultAgents: AgentStatus[] = [
  { type: "G0", label: "Planner", state: "idle", message: "Ready" },
  { type: "G1", label: "Coder", state: "idle", message: "Ready" },
  { type: "G2", label: "Auditor", state: "idle", message: "Ready" },
];

const seededAgents: AgentStatus[] = [
  {
    type: "G0",
    label: "Planner",
    state: "success",
    message: "Plan ready",
    latencyMs: 420,
  },
  {
    type: "G1",
    label: "Coder",
    state: "success",
    message: "Diff ready",
    latencyMs: 1280,
  },
  {
    type: "G2",
    label: "Auditor",
    state: "success",
    message: "Audit clean",
    latencyMs: 310,
  },
];

let abortFlag = false;

export const useAgentStore = create<AgentState>((set, get) => ({
  phase: "awaiting_approval",
  agents: seededAgents,
  messages: [
    {
      id: "m1",
      role: "user",
      content:
        "Prepíš hero sekciu landing page – silnejší headline a dual CTA buttons v Warm Brutalism štýle.",
      createdAt: Date.now() - 60_000,
    },
    {
      id: "m2",
      role: "assistant",
      agentType: "ORCHESTRATOR",
      content:
        "Pipeline hotová. G0 navrhol úpravu `src/App.tsx`, G1 vygeneroval diff, G2 nenašiel security issues. Čakám na Approve / Reject.",
      createdAt: Date.now() - 30_000,
    },
  ],
  isStreaming: false,
  latencyMs: 2010,
  tokensUsed: 1842,
  hitlVisible: true,
  rejectionOpen: false,
  lastRejection: null,
  statusLog: [
    "Boot complete · Warm Brutalism tokens loaded",
    "G0 → G1 → G2 pipeline ready",
    "HitL card visible · Enter approve · Esc reject",
  ],

  setPhase: (phase) => set({ phase }),

  setAgentState: (type, patch) =>
    set((state) => ({
      agents: state.agents.map((a) =>
        a.type === type ? { ...a, ...patch } : a,
      ),
    })),

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: message.id ?? crypto.randomUUID(),
          createdAt: Date.now(),
          role: message.role,
          content: message.content,
          ...(message.agentType !== undefined
            ? { agentType: message.agentType }
            : {}),
          ...(message.attachments !== undefined
            ? { attachments: message.attachments }
            : {}),
        },
      ],
    })),

  clearMessages: () => set({ messages: [] }),

  setStreaming: (value) => set({ isStreaming: value }),

  setMetrics: (latencyMs, tokensUsed) => set({ latencyMs, tokensUsed }),

  setHitlVisible: (value) => set({ hitlVisible: value }),

  setRejectionOpen: (value) => set({ rejectionOpen: value }),

  setLastRejection: (feedback) => set({ lastRejection: feedback }),

  pushStatus: (line) =>
    set((state) => ({
      statusLog: [...state.statusLog.slice(-40), line],
    })),

  resetPipeline: () => {
    abortFlag = false;
    set({
      phase: "idle",
      agents: defaultAgents.map((a) => ({ ...a })),
      isStreaming: false,
      hitlVisible: false,
      rejectionOpen: false,
    });
  },

  abort: () => {
    abortFlag = true;
    set({
      phase: "aborted",
      isStreaming: false,
      hitlVisible: false,
    });
    get().pushStatus("Pipeline aborted by user");
  },

  runDemoPipeline: async () => {
    abortFlag = false;
    const {
      setAgentState,
      setPhase,
      setStreaming,
      pushStatus,
      addMessage,
      setMetrics,
      setHitlVisible,
    } = get();
    setStreaming(true);
    setHitlVisible(false);
    setPhase("planning");
    setAgentState("G0", { state: "running", message: "Planning files…" });
    setAgentState("G1", { state: "idle", message: "Waiting" });
    setAgentState("G2", { state: "idle", message: "Waiting" });
    pushStatus("G0 Planner started");
    await sleep(700);
    if (abortFlag) return;
    setAgentState("G0", {
      state: "success",
      message: "1 file planned",
      latencyMs: 680,
    });
    pushStatus("G0 complete · src/App.tsx");

    setPhase("coding");
    setAgentState("G1", { state: "running", message: "Streaming code…" });
    pushStatus("G1 Coder streaming tokens");
    await sleep(900);
    if (abortFlag) return;
    setAgentState("G1", {
      state: "success",
      message: "Diff ready",
      latencyMs: 910,
    });
    pushStatus("G1 complete · proposal ready");

    setPhase("auditing");
    setAgentState("G2", { state: "running", message: "Auditing…" });
    await sleep(500);
    if (abortFlag) return;
    setAgentState("G2", {
      state: "success",
      message: "0 critical issues",
      latencyMs: 480,
    });
    pushStatus("G2 Auditor passed");

    setMetrics(2070, 1920);
    setPhase("awaiting_approval");
    setStreaming(false);
    setHitlVisible(true);
    addMessage({
      role: "assistant",
      agentType: "ORCHESTRATOR",
      content:
        "Nový diff pripravený. Skontroluj stredný panel a potvrď Enter / Approve alebo zamietni Esc / Reject.",
    });
    pushStatus("Awaiting human approval");
  },
}));

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
