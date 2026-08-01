import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Network, UserRound, ArrowRight, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { AppBottomNav } from "@/components/layout/AppBottomNav";
import { DEMO_PROJECT_ID } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const features = [
  {
    icon: Network,
    title: "Multi-Agent AI",
    body: "G0 → G1 → G2 pipeline",
  },
  {
    icon: Eye,
    title: "Live Preview",
    body: "Instant device frames",
  },
  {
    icon: UserRound,
    title: "Human-in-the-Loop",
    body: "Approve every diff",
  },
] as const;

function LandingPage() {
  return (
    <AppShell className="bg-black text-white">
      <main className="app-scroll flex flex-col">
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-6 pt-4 sm:max-w-xl sm:pt-10">
          {/* 3D logo hero */}
          <div className="flex flex-col items-center text-center pt-2 sm:pt-6">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/3] flex items-center justify-center">
              <div
                className="absolute inset-8 rounded-full bg-terracotta/10 blur-3xl"
                aria-hidden
              />
              <img
                src="/cosy-logo-3d.png"
                alt="COSY Studio liquid chrome logo"
                className="relative z-[1] h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)]"
                width={523}
                height={391}
                decoding="async"
              />
            </div>

            <h1 className="mt-2 font-serif text-[2.35rem] sm:text-5xl font-semibold tracking-[0.02em] text-white leading-none">
              COSY STUDIO
            </h1>
            <p className="mt-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
              AI Visual IDE
            </p>
            <p className="mt-5 max-w-[18rem] sm:max-w-sm text-[15px] sm:text-base leading-snug text-white/80">
              Design. Diff. Deploy.
              <br />
              <span className="text-white/55">Without context switching.</span>
            </p>
          </div>

          {/* Feature chips — match Imagine mock */}
          <div className="mt-8 sm:mt-10 space-y-2.5">
            {features.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex items-center gap-3.5 rounded-2xl border border-white/[0.06] bg-[#121214] px-3.5 py-3.5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-terracotta/15 text-terracotta">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <div className="min-w-0 text-left">
                  <p className="text-[15px] font-semibold text-white leading-tight">
                    {title}
                  </p>
                  <p className="text-[12px] text-white/45 mt-0.5 leading-snug">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/studio/$projectId"
              params={{ projectId: DEMO_PROJECT_ID }}
              className={cn(
                "inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl",
                "bg-terracotta text-white font-semibold text-sm",
                "active:scale-[0.98] transition-transform",
              )}
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Open Studio
            </Link>
            <Link
              to="/dashboard"
              className={cn(
                "inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl",
                "border border-white/15 bg-white/5 text-white font-semibold text-sm",
                "active:scale-[0.98] transition-transform",
              )}
            >
              Dashboard
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <p className="mt-6 text-center text-[11px] text-white/30 tracking-wide">
            Mobile-first shell · Orders · PC profile
          </p>
        </div>
      </main>
      <AppBottomNav />
    </AppShell>
  );
}
