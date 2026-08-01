import { r as DEMO_PROJECT_ID } from "./demo-data-DrFUwAPu.mjs";
import { t as cn } from "./utils-B9P1p4Oo.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AppShell } from "./AppShell-C__DjOTN.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as Eye, U as ArrowRight, i as UserRound, u as Sparkles, v as Network } from "../_libs/lucide-react.mjs";
import { t as AppBottomNav } from "./AppBottomNav-BtE8rVBN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CtXAgKGV.js
var import_jsx_runtime = require_jsx_runtime();
var features = [
	{
		icon: Network,
		title: "Multi-Agent AI",
		body: "G0 → G1 → G2 pipeline"
	},
	{
		icon: Eye,
		title: "Live Preview",
		body: "Instant device frames"
	},
	{
		icon: UserRound,
		title: "Human-in-the-Loop",
		body: "Approve every diff"
	}
];
function LandingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		className: "bg-black text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "app-scroll flex flex-col",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-6 pt-4 sm:max-w-xl sm:pt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center text-center pt-2 sm:pt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/3] flex items-center justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-8 rounded-full bg-terracotta/10 blur-3xl",
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/cosy-logo-3d.png",
									alt: "COSY Studio liquid chrome logo",
									className: "relative z-[1] h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)]",
									width: 523,
									height: 391,
									decoding: "async"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 font-serif text-[2.35rem] sm:text-5xl font-semibold tracking-[0.02em] text-white leading-none",
								children: "COSY STUDIO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-white/45",
								children: "AI Visual IDE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-5 max-w-[18rem] sm:max-w-sm text-[15px] sm:text-base leading-snug text-white/80",
								children: [
									"Design. Diff. Deploy.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white/55",
										children: "Without context switching."
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 sm:mt-10 space-y-2.5",
						children: features.map(({ icon: Icon, title, body }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3.5 rounded-2xl border border-white/[0.06] bg-[#121214] px-3.5 py-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-terracotta/15 text-terracotta",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "h-5 w-5",
									strokeWidth: 2,
									"aria-hidden": true
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[15px] font-semibold text-white leading-tight",
									children: title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[12px] text-white/45 mt-0.5 leading-snug",
									children: body
								})]
							})]
						}, title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/studio/$projectId",
							params: { projectId: DEMO_PROJECT_ID },
							className: cn("inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl", "bg-terracotta text-white font-semibold text-sm", "active:scale-[0.98] transition-transform"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
								className: "h-4 w-4",
								"aria-hidden": true
							}), "Open Studio"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard",
							className: cn("inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl", "border border-white/15 bg-white/5 text-white font-semibold text-sm", "active:scale-[0.98] transition-transform"),
							children: ["Dashboard", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								className: "h-4 w-4",
								"aria-hidden": true
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-center text-[11px] text-white/30 tracking-wide",
						children: "Mobile-first shell · Orders · PC profile"
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppBottomNav, {})]
	});
}
//#endregion
export { LandingPage as component };
