import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LayoutDashboard, ShoppingBag, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    match: (p: string) => p.startsWith("/dashboard"),
  },
  {
    to: "/orders",
    label: "Orders",
    icon: ShoppingBag,
    match: (p: string) => p.startsWith("/orders"),
  },
  {
    to: "/profile",
    label: "Profile",
    icon: Monitor,
    match: (p: string) => p.startsWith("/profile"),
  },
] as const;

export function AppBottomNav(): React.JSX.Element {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      className="shrink-0 border-t border-white/10 bg-black/95 backdrop-blur-xl"
      aria-label="Main"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto grid max-w-lg grid-cols-4 h-16 min-h-[64px]">
        {items.map(({ to, label, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={to}
              to={to}
              aria-current={active ? "page" : undefined}
              aria-label={label}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors min-h-[44px]",
                active
                  ? "text-terracotta"
                  : "text-white/45 active:text-white/70",
              )}
            >
              <Icon
                className="h-5 w-5"
                strokeWidth={active ? 2.4 : 1.8}
                aria-hidden
              />
              <span>{label}</span>
              {active && (
                <span
                  className="absolute top-0 inset-x-8 h-0.5 rounded-full bg-terracotta"
                  aria-hidden
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
