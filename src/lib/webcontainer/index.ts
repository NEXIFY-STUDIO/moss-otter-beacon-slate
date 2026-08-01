/**
 * WebContainer boot skeleton + capability detection.
 * Full @webcontainer/api boot needs COOP/COEP headers (deploy note).
 * Sandbox/embed falls back to elegant srcdoc preview.
 */

export type WebContainerCapability = {
  supported: boolean;
  crossOriginIsolated: boolean;
  sharedArrayBuffer: boolean;
  reason: string;
};

export function detectWebContainerSupport(): WebContainerCapability {
  if (typeof window === "undefined") {
    return {
      supported: false,
      crossOriginIsolated: false,
      sharedArrayBuffer: false,
      reason: "SSR — client only",
    };
  }
  const crossOriginIsolated = Boolean(window.crossOriginIsolated);
  const sharedArrayBuffer = typeof SharedArrayBuffer !== "undefined";
  const ua = navigator.userAgent;
  const isSafari = /Safari/i.test(ua) && !/Chrome|Chromium|Edg/i.test(ua);

  if (isSafari) {
    return {
      supported: false,
      crossOriginIsolated,
      sharedArrayBuffer,
      reason: "Safari: WebContainers require Chromium + COOP/COEP. Using static preview.",
    };
  }
  if (!crossOriginIsolated || !sharedArrayBuffer) {
    return {
      supported: false,
      crossOriginIsolated,
      sharedArrayBuffer,
      reason:
        "Missing crossOriginIsolated / SharedArrayBuffer. Deploy with COOP/COEP headers for live WC runtime.",
    };
  }
  return {
    supported: true,
    crossOriginIsolated,
    sharedArrayBuffer,
    reason: "Ready for WebContainer boot",
  };
}

export type BootStatus =
  | "idle"
  | "detecting"
  | "booting"
  | "ready"
  | "fallback"
  | "error";

let bootLock = false;

/**
 * Simulated boot when WC unsupported — returns null URL and marks fallback.
 * When supported, reserved for real @webcontainer/api integration.
 */
export async function bootWebContainer(options?: {
  signal?: AbortSignal | undefined;
  timeoutMs?: number | undefined;
}): Promise<{ url: string | null; mode: "wc" | "fallback"; logs: string[] }> {
  const logs: string[] = [];
  const timeoutMs = options?.timeoutMs ?? 8_000;
  if (bootLock) {
    logs.push("Concurrent boot prevented");
    return { url: null, mode: "fallback", logs };
  }
  bootLock = true;
  try {
    logs.push("Detecting WebContainer capability…");
    const cap = detectWebContainerSupport();
    logs.push(cap.reason);
    if (!cap.supported) {
      // brief delay so UI doesn't flash fallback under 300ms path in store
      await sleep(50, options?.signal);
      return { url: null, mode: "fallback", logs };
    }
    logs.push("Booting WebContainer (stub — install @webcontainer/api for full FS)…");
    await sleep(Math.min(400, timeoutMs), options?.signal);
    // Placeholder: real boot would mount FS + npm run dev
    logs.push("WC package not wired in this demo — elegant srcdoc fallback");
    return { url: null, mode: "fallback", logs };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Boot failed";
    logs.push(msg);
    return { url: null, mode: "fallback", logs };
  } finally {
    bootLock = false;
  }
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const t = window.setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        window.clearTimeout(t);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}
