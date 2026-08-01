import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Monitor, Moon, Sun, Laptop, Shield, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { AppBottomNav } from "@/components/layout/AppBottomNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/stores/use-theme-store";
import {
  createCheckoutSession,
  getBillingStatus,
  type BillingPlan,
} from "@/lib/billing/server";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const mode = useThemeStore((s) => s.mode);
  const resolved = useThemeStore((s) => s.resolved);
  const { user, isPending } = useCurrentUserState();
  const [billing, setBilling] = useState<BillingPlan | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isPending || !user) return;
    void getBillingStatus()
      .then(setBilling)
      .catch(() => setBilling(null));
  }, [user, isPending]);

  const upgrade = async () => {
    if (!user) {
      toast.error("Sign in to upgrade");
      return;
    }
    setBusy(true);
    try {
      const res = await createCheckoutSession({ data: {} });
      if (res.mock) {
        toast.success("Mock Pro plan activated");
        const next = await getBillingStatus();
        setBilling(next);
      } else if (res.url) {
        window.location.href = res.url;
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Checkout failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppShell className="bg-black text-white">
      <header className="shrink-0 border-b border-white/10 px-4 py-3">
        <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-terracotta">
          Account
        </p>
        <h1 className="font-serif text-xl font-semibold text-white">Profile</h1>
      </header>
      <main className="app-scroll">
        <div className="mx-auto max-w-lg px-4 py-6 space-y-4 pb-8">
          <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-[#121214] p-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black text-terracotta">
              <Monitor className="h-7 w-7" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-white">
                {user?.displayName ?? "Guest · COSY"}
              </p>
              <p className="text-xs text-white/45 mt-0.5">
                {billing
                  ? `${billing.plan.toUpperCase()} · ${billing.tokensUsed}/${billing.tokenLimit} tokens`
                  : "FREE plan · PC + mobile"}
              </p>
              <Badge variant="accent" className="mt-2 normal-case tracking-normal">
                SuperGrok Pro builder
              </Badge>
            </div>
          </div>

          <section className="rounded-2xl border border-white/[0.06] bg-[#121214] p-4 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-terracotta/15 text-terracotta">
                <CreditCard className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">Billing</p>
                <p className="text-xs text-white/45">
                  {billing
                    ? `Remaining ${billing.remaining} tokens · ${billing.status}`
                    : "Sign in to load usage metering"}
                </p>
              </div>
              <Button
                size="sm"
                className="min-h-11"
                onClick={() => void upgrade()}
                disabled={busy}
              >
                {busy ? "…" : "Upgrade"}
              </Button>
            </div>
            {!user && !isPending ? (
              <Link
                to="/login"
                className="text-xs text-terracotta font-semibold block min-h-10"
              >
                Sign in for checkout + metering
              </Link>
            ) : null}
          </section>

          <section className="rounded-2xl border border-white/[0.06] bg-[#121214] divide-y divide-white/[0.06]">
            <Row
              icon={Laptop}
              title="Devices"
              meta="This session · browser preview"
            />
            <Row
              icon={Shield}
              title="Security"
              meta="Better Auth · ownership checks"
            />
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-terracotta/15 text-terracotta">
                  {resolved === "dark" ? (
                    <Moon className="h-4 w-4" aria-hidden />
                  ) : (
                    <Sun className="h-4 w-4" aria-hidden />
                  )}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Theme</p>
                  <p className="text-xs text-white/45 capitalize">{mode}</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </section>
        </div>
      </main>
      <AppBottomNav />
    </AppShell>
  );
}

function Row({
  icon: Icon,
  title,
  meta,
}: {
  icon: typeof Laptop;
  title: string;
  meta: string;
}): React.JSX.Element {
  return (
    <div className="flex items-center gap-3 p-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-terracotta/15 text-terracotta">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-white/45">{meta}</p>
      </div>
    </div>
  );
}
