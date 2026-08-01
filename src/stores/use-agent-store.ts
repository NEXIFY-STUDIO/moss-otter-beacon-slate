import { create } from "zustand";
import type {
  AgentPhase,
  AgentStatus,
  ChatMessage,
  RejectionFeedback,
} from "@/types/agent";
import { runOrchestrator } from "@/lib/ai/orchestrator";
import { logAiInteraction } from "@/lib/ai/log-interaction";
import { useFileStore } from "@/stores/use-file-store";
import { DEMO_PROJECT_ID } from "@/lib/demo-data";
import type { FileLanguage } from "@/types/file";

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
  lastLogIds: string[];
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
  runDemoPipeline: (
    prompt?: string,
    options?: { imageCount?: number; projectId?: string },
  ) => Promise<void>;
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

let abortController: AbortController | null = null;
let tokenThrottle: ReturnType<typeof setTimeout> | null = null;
let pendingToken: { path: string; accumulated: string } | null = null;

async function persistLog(input: {
  projectId: string;
  agentType: "G0" | "G1" | "G2" | "ORCHESTRATOR";
  model: string;
  prompt: string;
  responseSummary?: string;
  latencyMs: number;
  tokens: number;
  imageCount: number;
  status: "ok" | "error" | "aborted";
}): Promise<string | null> {
  try {
    const res = await logAiInteraction({ data: input });
    return res.id;
  } catch (err) {
    console.warn("[AiInteractionLog] persist failed", err);
    return null;
  }
}

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
  lastLogIds: [],

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
    abortController?.abort();
    abortController = null;
    if (tokenThrottle) clearTimeout(tokenThrottle);
    tokenThrottle = null;
    pendingToken = null;
    set({
      phase: "idle",
      agents: defaultAgents.map((a) => ({ ...a })),
      isStreaming: false,
      hitlVisible: false,
      rejectionOpen: false,
    });
  },

  abort: () => {
    abortController?.abort();
    abortController = null;
    if (tokenThrottle) clearTimeout(tokenThrottle);
    tokenThrottle = null;
    pendingToken = null;
    useFileStore.getState().setProposal(null);
    set({
      phase: "aborted",
      isStreaming: false,
      hitlVisible: false,
    });
    get().pushStatus("Pipeline aborted by user");
    get().addMessage({
      role: "assistant",
      agentType: "ORCHESTRATOR",
      content: "Pipeline zastavená. Môžeš poslať nový prompt.",
    });
  },

  runDemoPipeline: async (
    prompt = "Refresh hero section with dual CTAs",
    options,
  ) => {
    abortController?.abort();
    abortController = new AbortController();
    const signal = abortController.signal;
    if (tokenThrottle) clearTimeout(tokenThrottle);
    tokenThrottle = null;
    pendingToken = null;

    const projectId = options?.projectId ?? DEMO_PROJECT_ID;
    const imageCount = options?.imageCount ?? 0;

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
    setAgentState("G0", { state: "running", message: "Planning…" });
    setAgentState("G1", { state: "idle", message: "Waiting" });
    setAgentState("G2", { state: "idle", message: "Waiting" });
    pushStatus("Orchestrator · G0 started");

    const fileState = useFileStore.getState();
    const contentMap = fileState.getContentMap();
    const originals = new Map(contentMap);
    const logIds: string[] = [];

    const flushTokenProposal = () => {
      tokenThrottle = null;
      if (!pendingToken || signal.aborted) return;
      const { path, accumulated } = pendingToken;
      useFileStore.getState().setProposal({
        path,
        original: originals.get(path) ?? "",
        modified: accumulated,
        language: guessLang(path),
        summary: `Streaming ${path}…`,
      });
    };

    await runOrchestrator({
      prompt,
      files: contentMap,
      signal,
      onEvent: (event) => {
        if (signal.aborted) return;
        switch (event.type) {
          case "phase":
            if (event.phase === "planning") setPhase("planning");
            if (event.phase === "coding") setPhase("coding");
            if (event.phase === "auditing") setPhase("auditing");
            if (event.phase === "done") setPhase("awaiting_approval");
            if (event.phase === "error") setPhase("idle");
            break;
          case "agent":
            setAgentState(event.agent, {
              state: event.state,
              message: event.message,
              ...(event.latencyMs !== undefined
                ? { latencyMs: event.latencyMs }
                : {}),
            });
            pushStatus(`${event.agent} · ${event.message}`);
            break;
          case "token": {
            pendingToken = {
              path: event.path,
              accumulated: event.accumulated,
            };
            if (!tokenThrottle) {
              tokenThrottle = setTimeout(flushTokenProposal, 100);
            }
            break;
          }
          case "code": {
            if (tokenThrottle) clearTimeout(tokenThrottle);
            tokenThrottle = null;
            pendingToken = null;
            const pages = event.codeMap.files.filter((f) =>
              f.path.includes("/pages/") || f.path === "src/App.tsx" || f.path === "index.html",
            );
            useFileStore.getState().setProposalFromCodeMap(
              event.codeMap.files,
              originals,
              `Multi-page output · ${event.codeMap.files.length} file(s) · ${pages.length} routes/shell`,
            );
            pushStatus(
              `G1 · ${event.codeMap.files.length} files (pages + sections) ready for Approve`,
            );
            break;
          }
          case "audit":
            if (!event.audit.passed) {
              pushStatus("G2 critical issues — HitL still available (override)");
              addMessage({
                role: "assistant",
                agentType: "G2",
                content: event.audit.issues
                  .map((i) => `[${i.severity}] ${i.path ?? "—"}: ${i.message}`)
                  .join("\n"),
              });
            } else {
              pushStatus("G2 Auditor passed");
            }
            break;
          case "metrics": {
            setMetrics(event.latencyMs, event.tokens);
            pushStatus(
              `Metrics · ${event.latencyMs}ms · ${event.tokens} tok · log ${event.log.length}`,
            );
            // Persist per-agent AiInteractionLog rows (fire-and-forget)
            void (async () => {
              for (const row of event.log) {
                const agentType = row.agentType as "G0" | "G1" | "G2";
                const id = await persistLog({
                  projectId,
                  agentType,
                  model: row.model,
                  prompt,
                  responseSummary: `${agentType} completed in ${row.latencyMs}ms`,
                  latencyMs: row.latencyMs,
                  tokens: row.tokens,
                  imageCount,
                  status: "ok",
                });
                if (id) logIds.push(id);
              }
              const orchId = await persistLog({
                projectId,
                agentType: "ORCHESTRATOR",
                model: "mock-orchestrator",
                prompt,
                responseSummary: `E2E pipeline ${event.latencyMs}ms · ${event.tokens} tokens`,
                latencyMs: event.latencyMs,
                tokens: event.tokens,
                imageCount,
                status: "ok",
              });
              if (orchId) logIds.push(orchId);
              set({ lastLogIds: logIds });
              if (logIds.length > 0) {
                pushStatus(
                  `AiInteractionLog · ${logIds.length} row(s) persisted`,
                );
              }
            })();
            break;
          }
          case "error":
            if (event.message === "Aborted") {
              setStreaming(false);
              void persistLog({
                projectId,
                agentType: "ORCHESTRATOR",
                model: "mock-orchestrator",
                prompt,
                responseSummary: "Aborted by user",
                latencyMs: 0,
                tokens: 0,
                imageCount,
                status: "aborted",
              });
              return;
            }
            setAgentState("G0", { state: "error", message: event.message });
            pushStatus(`Error · ${event.message}`);
            addMessage({
              role: "assistant",
              agentType: "ORCHESTRATOR",
              content: `Pipeline error: ${event.message}`,
            });
            setStreaming(false);
            void persistLog({
              projectId,
              agentType: "ORCHESTRATOR",
              model: "mock-orchestrator",
              prompt,
              responseSummary: event.message,
              latencyMs: 0,
              tokens: 0,
              imageCount,
              status: "error",
            });
            break;
          default:
            break;
        }
      },
    });

    if (signal.aborted) {
      setStreaming(false);
      return;
    }

    setStreaming(false);
    setHitlVisible(true);
    setPhase("awaiting_approval");
    addMessage({
      role: "assistant",
      agentType: "ORCHESTRATOR",
      content:
        "Multi-page diff ready (home + sections + new pages). Approve zapíše všetky súbory a obnoví preview so in-app navigáciou (žiadne opustenie hostu).",
    });
    pushStatus("Awaiting human approval");
    abortController = null;
  },
}));

function guessLang(path: string): FileLanguage {
  if (path.endsWith(".tsx")) return "tsx";
  if (path.endsWith(".ts")) return "ts";
  if (path.endsWith(".css")) return "css";
  if (path.endsWith(".json")) return "json";
  if (path.endsWith(".html")) return "html";
  if (path.endsWith(".md")) return "md";
  return "txt";
}
