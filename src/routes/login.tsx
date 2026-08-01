import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import {
  authEnabled,
  GROK_PROVIDERS,
  signIn,
} from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { DEMO_PROJECT_ID } from "@/lib/demo-data";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { user, isPending } = useCurrentUserState();

  if (isPending) {
    return (
      <AppShell className="bg-black text-white">
        <div className="flex-1 grid place-items-center p-8">
          <p className="text-sm text-white/50">Checking session…</p>
        </div>
      </AppShell>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <AppShell className="bg-black text-white">
      <main className="flex-1 grid place-items-center px-4 py-10">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#121214] p-6 space-y-5 shadow-brutal">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-terracotta">
              COSY Studio
            </p>
            <h1 className="font-serif text-2xl font-semibold text-white mt-1">
              Sign in
            </h1>
            <p className="text-xs text-white/50 mt-2 leading-relaxed">
              Protected project CRUD and billing require an authenticated
              session. The demo studio stays available without login.
            </p>
          </div>

          {!authEnabled ? (
            <p className="text-sm text-white/70">
              Auth is disabled — using shared dev user.
            </p>
          ) : (
            <div className="space-y-2">
              {GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  className="w-full min-h-11 justify-center"
                  onClick={() =>
                    void signIn(p.providerId, {
                      callbackURL: "/dashboard",
                      errorCallbackURL: "/login",
                    })
                  }
                >
                  <LogIn className="h-4 w-4" aria-hidden />
                  Continue with {p.label}
                </Button>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <Link
              to="/studio/$projectId"
              params={{ projectId: DEMO_PROJECT_ID }}
              className="text-sm text-terracotta font-semibold text-center min-h-11 grid place-items-center"
            >
              Continue to demo studio (no login)
            </Link>
            <Link
              to="/"
              className="text-xs text-white/40 text-center min-h-10 grid place-items-center"
            >
              Back to landing
            </Link>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
