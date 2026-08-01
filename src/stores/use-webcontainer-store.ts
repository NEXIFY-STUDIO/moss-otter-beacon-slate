import { create } from "zustand";
import {
  bootWebContainer,
  detectWebContainerSupport,
  type BootStatus,
  type WebContainerCapability,
} from "@/lib/webcontainer";

interface WebContainerState {
  status: BootStatus;
  url: string | null;
  error: string | null;
  logs: string[];
  capability: WebContainerCapability | null;
  boot: () => Promise<void>;
  pushLog: (line: string) => void;
  tearDown: () => void;
}

let abort: AbortController | null = null;

export const useWebContainerStore = create<WebContainerState>((set, get) => ({
  status: "idle",
  url: null,
  error: null,
  logs: [],
  capability: null,

  pushLog: (line) => set((s) => ({ logs: [...s.logs.slice(-80), line] })),

  boot: async () => {
    if (get().status === "booting") return;
    abort?.abort();
    abort = new AbortController();
    set({ status: "detecting", error: null });
    const capability = detectWebContainerSupport();
    set({ capability, status: "booting" });
    get().pushLog(capability.reason);

    const start = performance.now();
    try {
      const result = await bootWebContainer({ signal: abort.signal });
      for (const line of result.logs) get().pushLog(line);
      const elapsed = performance.now() - start;
      if (result.mode === "fallback") {
        if (elapsed < 300) {
          await new Promise((r) => setTimeout(r, 300 - elapsed));
        }
        set({
          status: "fallback",
          url: null,
          error: null,
        });
        get().pushLog("Static preview ready · mirrors App.tsx on Approve");
        return;
      }
      set({ status: "ready", url: result.url, error: null });
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        get().pushLog("Boot aborted");
        set({ status: "idle" });
        return;
      }
      get().pushLog("Boot failed — retry 1×");
      try {
        const retry = await bootWebContainer({ signal: abort.signal });
        for (const line of retry.logs) get().pushLog(line);
        set({
          status: retry.mode === "fallback" ? "fallback" : "ready",
          url: retry.url,
          error: null,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Boot error";
        set({ status: "error", error: message, url: null });
        get().pushLog(message);
      }
    }
  },

  tearDown: () => {
    abort?.abort();
    abort = null;
    set({
      status: "idle",
      url: null,
      error: null,
      logs: [],
      capability: null,
    });
  },
}));
