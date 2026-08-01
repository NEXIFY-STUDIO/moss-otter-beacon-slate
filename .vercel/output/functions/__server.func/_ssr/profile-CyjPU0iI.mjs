import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AppShell } from "./AppShell-C__DjOTN.mjs";
import { C as Laptop, b as Monitor, c as Sun, p as Shield, y as Moon } from "../_libs/lucide-react.mjs";
import { t as AppBottomNav } from "./AppBottomNav-BtE8rVBN.mjs";
import { t as Badge } from "./badge-D58brdQF.mjs";
import { n as useThemeStore } from "./use-theme-store-Br83hdzd.mjs";
import { t as ThemeToggle } from "./ThemeToggle-CH9VP2Mz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-CyjPU0iI.js
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const mode = useThemeStore((s) => s.mode);
	const resolved = useThemeStore((s) => s.resolved);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		className: "bg-black text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "shrink-0 border-b border-white/10 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.16em] font-semibold text-terracotta",
					children: "Account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-xl font-semibold text-white",
					children: "Profile"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "app-scroll",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-lg px-4 py-6 space-y-4 pb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-[#121214] p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black text-terracotta",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
								className: "h-7 w-7",
								"aria-hidden": true
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-white",
									children: "Erik · COSY"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-white/45 mt-0.5",
									children: "FREE plan · PC + mobile"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "accent",
									className: "mt-2 normal-case tracking-normal",
									children: "SuperGrok Pro builder"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-white/[0.06] bg-[#121214] divide-y divide-white/[0.06]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: Laptop,
								title: "Devices",
								meta: "This session · browser preview"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: Shield,
								title: "Security",
								meta: "Better Auth · ownership checks"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-9 w-9 items-center justify-center rounded-xl bg-terracotta/15 text-terracotta",
										children: resolved === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
											className: "h-4 w-4",
											"aria-hidden": true
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
											className: "h-4 w-4",
											"aria-hidden": true
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-white",
										children: "Theme"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-white/45 capitalize",
										children: mode
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppBottomNav, {})
		]
	});
}
function Row({ icon: Icon, title, meta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex h-9 w-9 items-center justify-center rounded-xl bg-terracotta/15 text-terracotta",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "h-4 w-4",
				"aria-hidden": true
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold text-white",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-white/45",
				children: meta
			})]
		})]
	});
}
//#endregion
export { ProfilePage as component };
