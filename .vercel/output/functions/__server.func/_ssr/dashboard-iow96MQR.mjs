import { n as DEMO_PROJECTS, r as DEMO_PROJECT_ID } from "./demo-data-DrFUwAPu.mjs";
import { t as cn } from "./utils-B9P1p4Oo.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CrqI-CCG.mjs";
import { t as AppShell } from "./AppShell-C__DjOTN.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { U as ArrowRight, g as Plus, k as FolderKanban } from "../_libs/lucide-react.mjs";
import { t as AppBottomNav } from "./AppBottomNav-BtE8rVBN.mjs";
import { t as Badge } from "./badge-D58brdQF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-iow96MQR.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		className: "bg-black text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "shrink-0 border-b border-white/10 px-4 py-3 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-[0.16em] font-semibold text-terracotta",
						children: "Workspace"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-serif text-xl sm:text-2xl font-semibold text-white",
						children: "Dashboard"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					className: "min-h-11 shrink-0 rounded-xl border-0",
					disabled: true,
					title: "S22",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						className: "h-4 w-4",
						"aria-hidden": true
					}), "New"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "app-scroll",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-lg sm:max-w-3xl px-4 py-5 space-y-3 pb-8",
					children: DEMO_PROJECTS.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-white/[0.06] bg-[#121214] p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta/15 text-terracotta",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, {
									className: "h-4 w-4",
									"aria-hidden": true
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-semibold text-white text-sm",
											children: project.title
										}), project.isPublic ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "success",
											className: "normal-case tracking-normal",
											children: "Public"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "normal-case tracking-normal border-white/15 text-white/70",
											children: "Private"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-white/45 mt-1 leading-relaxed",
										children: project.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-white/30 font-mono mt-1.5",
										children: [
											project.fileCount,
											" files · ",
											project.lastAgent ?? "—"
										]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/studio/$projectId",
							params: { projectId: project.id === DEMO_PROJECTS[0]?.id ? DEMO_PROJECT_ID : project.id },
							className: cn("inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-4", "bg-terracotta text-white text-sm font-semibold shrink-0", "active:scale-[0.98] transition-transform"),
							children: ["Open", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								className: "h-3.5 w-3.5",
								"aria-hidden": true
							})]
						})]
					}, project.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppBottomNav, {})
		]
	});
}
//#endregion
export { DashboardPage as component };
