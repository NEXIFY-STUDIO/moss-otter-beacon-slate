import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AppShell } from "./AppShell-C__DjOTN.mjs";
import { L as Clock, _ as Package, z as CircleCheck } from "../_libs/lucide-react.mjs";
import { t as AppBottomNav } from "./AppBottomNav-BtE8rVBN.mjs";
import { t as Badge } from "./badge-D58brdQF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-DNveD3Lk.js
var import_jsx_runtime = require_jsx_runtime();
var orders = [
	{
		id: "ORD-1042",
		title: "Pro plan · monthly",
		status: "active",
		when: "Renews Aug 28",
		amount: "€29"
	},
	{
		id: "ORD-1038",
		title: "Extra agent tokens",
		status: "paid",
		when: "Jul 12 · paid",
		amount: "€9"
	},
	{
		id: "ORD-1021",
		title: "Enterprise trial",
		status: "pending",
		when: "Awaiting invoice",
		amount: "—"
	}
];
function OrdersPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		className: "bg-black text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "shrink-0 border-b border-white/10 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.16em] font-semibold text-terracotta",
					children: "Billing"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-xl font-semibold text-white",
					children: "Orders"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "app-scroll",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-lg px-4 py-5 space-y-3 pb-8",
					children: [orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						className: "rounded-2xl border border-white/[0.06] bg-[#121214] p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta/15 text-terracotta",
									children: o.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
										className: "h-4 w-4",
										"aria-hidden": true
									}) : o.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {
										className: "h-4 w-4",
										"aria-hidden": true
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
										className: "h-4 w-4",
										"aria-hidden": true
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-sm text-white truncate",
											children: o.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-white/40 font-mono mt-0.5",
											children: o.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-white/50 mt-1",
											children: o.when
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-sm tabular-nums",
									children: o.amount
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: o.status === "active" ? "accent" : o.status === "paid" ? "success" : "outline",
									className: "mt-1 normal-case tracking-normal",
									children: o.status
								})]
							})]
						})
					}, o.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-[11px] text-white/30 pt-4",
						children: "Stripe checkout wiring · super-prompt S22"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppBottomNav, {})
		]
	});
}
//#endregion
export { OrdersPage as component };
