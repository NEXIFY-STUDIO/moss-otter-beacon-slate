import { createFileRoute } from "@tanstack/react-router";
import { Monitor, Moon, Sun, Laptop, Shield } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { AppBottomNav } from "@/components/layout/AppBottomNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { useThemeStore } from "@/stores/use-theme-store";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const mode = useThemeStore((s) => s.mode);
  const resolved = useThemeStore((s) => s.resolved);

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
              <p className="font-semibold text-white">Erik · COSY</p>
              <p className="text-xs text-white/45 mt-0.5">FREE plan · PC + mobile</p>
              <Badge variant="accent" className="mt-2 normal-case tracking-normal">
                SuperGrok Pro builder
              </Badge>
            </div>
          </div>

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
