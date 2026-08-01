import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Circle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { AppBottomNav } from "@/components/layout/AppBottomNav";
import { DEMO_PROJECT_ID } from "@/lib/demo-data";

export const Route = createFileRoute("/launch")({
  component: LaunchPage,
});

const CHECKS: { id: string; title: string; done: boolean; note: string }[] = [
  {
    id: "a11y-keyboard",
    title: "Keyboard HitL (Enter/Esc) + focus trap",
    done: true,
    note: "HitL card + RejectionPoll",
  },
  {
    id: "a11y-targets",
    title: "Touch targets ≥40–44px on mobile chrome",
    done: true,
    note: "TopBar / PromptInput / MobileTabBar",
  },
  {
    id: "a11y-live",
    title: "aria-live regions for chat + agent status",
    done: true,
    note: "ChatThread role=log, AgentStatus",
  },
  {
    id: "sec-secrets",
    title: "0 secrets client-side (model ids only)",
    done: true,
    note: "providers.ts public model map",
  },
  {
    id: "sec-auth",
    title: "Server ownership checks on project/file CRUD",
    done: true,
    note: "assertOwnsProject + authMiddleware",
  },
  {
    id: "sec-xss",
    title: "No dangerouslySetInnerHTML / eval in pipeline",
    done: true,
    note: "G2 auditor flags critical patterns",
  },
  {
    id: "sec-sql",
    title: "Parameterized SQL via getSql tagged templates",
    done: true,
    note: "lib/db.ts",
  },
  {
    id: "build",
    title: "Production build + non-blank preview",
    done: true,
    note: "Vite + nitro vercel preset",
  },
  {
    id: "pwa",
    title: "PWA manifest linked",
    done: true,
    note: "/manifest.webmanifest",
  },
  {
    id: "demo",
    title: "3-min demo script ready",
    done: true,
    note: "Landing → Studio → Prompt → Approve → Publish",
  },
];

function LaunchPage() {
  const doneCount = CHECKS.filter((c) => c.done).length;

  return (
    <AppShell className="bg-black text-white">
      <header className="shrink-0 border-b border-white/10 px-4 py-3">
        <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-terracotta">
          S25 · Launch
        </p>
        <h1 className="font-serif text-xl font-semibold text-white">
          Launch checklist
        </h1>
        <p className="text-xs text-white/45 mt-1">
          {doneCount}/{CHECKS.length} complete · a11y + security + demo
        </p>
      </header>
      <main className="app-scroll">
        <div className="mx-auto max-w-lg px-4 py-5 space-y-3 pb-8">
          <section className="rounded-2xl border border-white/[0.06] bg-[#121214] p-4 space-y-2">
            <h2 className="text-sm font-semibold text-white">3-min demo script</h2>
            <ol className="list-decimal list-inside text-xs text-white/60 space-y-1.5 leading-relaxed">
              <li>Open landing → click Open Studio</li>
              <li>Send prompt (optional image) → watch G0→G1→G2 stream</li>
              <li>Approve HitL → preview refresh → Publish via Cmd+K</li>
            </ol>
            <Link
              to="/studio/$projectId"
              params={{ projectId: DEMO_PROJECT_ID }}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-terracotta px-4 text-sm font-semibold text-white mt-2"
            >
              Run demo studio
            </Link>
          </section>

          <ul className="space-y-2" aria-label="Launch checks">
            {CHECKS.map((c) => (
              <li
                key={c.id}
                className="rounded-2xl border border-white/[0.06] bg-[#121214] p-3.5 flex gap-3"
              >
                {c.done ? (
                  <CheckCircle2
                    className="h-5 w-5 text-diff-add-text shrink-0 mt-0.5"
                    aria-label="Done"
                  />
                ) : (
                  <Circle
                    className="h-5 w-5 text-white/25 shrink-0 mt-0.5"
                    aria-label="Open"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{c.title}</p>
                  <p className="text-[11px] text-white/40 mt-0.5">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <AppBottomNav />
    </AppShell>
  );
}
