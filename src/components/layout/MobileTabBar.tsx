import { MessageSquare, FileCode2, Eye } from "lucide-react";
import { useUiStore, type MobilePane } from "@/stores/use-ui-store";
import { useAgentStore } from "@/stores/use-agent-store";
import { cn } from "@/lib/utils";

const tabs: {
  id: MobilePane;
  label: string;
  icon: typeof MessageSquare;
}[] = [
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "code", label: "Code", icon: FileCode2 },
  { id: "preview", label: "Preview", icon: Eye },
];

export function MobileTabBar(): React.JSX.Element {
  const mobilePane = useUiStore((s) => s.mobilePane);
  const setMobilePane = useUiStore((s) => s.setMobilePane);
  const hitlVisible = useAgentStore((s) => s.hitlVisible);

  return (
    <nav
      className="lg:hidden shrink-0 border-t-2 border-charcoal/10 dark:border-cream/10 bg-cream-secondary dark:bg-slate-card"
      aria-label="Studio panels"
    >
      <div className="grid grid-cols-3 h-14 min-h-[56px]">
        {tabs.map(({ id, label, icon: Icon }) => {
          const active = mobilePane === id;
          const showDot = id === "code" && hitlVisible;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setMobilePane(id)}
              aria-current={active ? "page" : undefined}
              aria-label={label}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold transition-colors min-h-[44px]",
                active
                  ? "text-terracotta bg-terracotta/10"
                  : "text-charcoal/55 dark:text-cream/50 active:bg-charcoal/5 dark:active:bg-cream/5",
              )}
            >
              <Icon
                className="h-5 w-5"
                aria-hidden
                strokeWidth={active ? 2.4 : 2}
              />
              <span>{label}</span>
              {showDot && (
                <span
                  className="absolute top-1.5 right-[calc(50%-18px)] h-2 w-2 rounded-full bg-terracotta"
                  aria-label="Awaiting approval"
                />
              )}
              {active && (
                <span
                  className="absolute top-0 inset-x-6 h-0.5 bg-terracotta"
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
