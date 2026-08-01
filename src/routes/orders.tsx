import { createFileRoute } from "@tanstack/react-router";
import { Package, Clock, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { AppBottomNav } from "@/components/layout/AppBottomNav";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
});

const orders = [
  {
    id: "ORD-1042",
    title: "Pro plan · monthly",
    status: "active" as const,
    when: "Renews Aug 28",
    amount: "€29",
  },
  {
    id: "ORD-1038",
    title: "Extra agent tokens",
    status: "paid" as const,
    when: "Jul 12 · paid",
    amount: "€9",
  },
  {
    id: "ORD-1021",
    title: "Enterprise trial",
    status: "pending" as const,
    when: "Awaiting invoice",
    amount: "—",
  },
];

function OrdersPage() {
  return (
    <AppShell className="bg-black text-white">
      <header className="shrink-0 border-b border-white/10 px-4 py-3">
        <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-terracotta">
          Billing
        </p>
        <h1 className="font-serif text-xl font-semibold text-white">Orders</h1>
      </header>
      <main className="app-scroll">
        <div className="mx-auto max-w-lg px-4 py-5 space-y-3 pb-8">
          {orders.map((o) => (
            <article
              key={o.id}
              className="rounded-2xl border border-white/[0.06] bg-[#121214] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta/15 text-terracotta">
                    {o.status === "pending" ? (
                      <Clock className="h-4 w-4" aria-hidden />
                    ) : o.status === "active" ? (
                      <Package className="h-4 w-4" aria-hidden />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-white truncate">
                      {o.title}
                    </p>
                    <p className="text-[11px] text-white/40 font-mono mt-0.5">
                      {o.id}
                    </p>
                    <p className="text-xs text-white/50 mt-1">{o.when}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-sm tabular-nums">{o.amount}</p>
                  <Badge
                    variant={
                      o.status === "active"
                        ? "accent"
                        : o.status === "paid"
                          ? "success"
                          : "outline"
                    }
                    className="mt-1 normal-case tracking-normal"
                  >
                    {o.status}
                  </Badge>
                </div>
              </div>
            </article>
          ))}
          <p className="text-center text-[11px] text-white/30 pt-4">
            Stripe checkout wiring · super-prompt S22
          </p>
        </div>
      </main>
      <AppBottomNav />
    </AppShell>
  );
}
