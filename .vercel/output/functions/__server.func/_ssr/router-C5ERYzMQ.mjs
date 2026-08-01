import { o as __toESM } from "../_runtime.mjs";
import { r as DEMO_PROJECT_ID } from "./demo-data-DrFUwAPu.mjs";
import { t as cn } from "./utils-B9P1p4Oo.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CrqI-CCG.mjs";
import { _ as useNavigate, c as HeadContent, d as createRouter, f as Outlet, h as createRootRoute, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as FolderPlus, N as FileCode2, S as LayoutDashboard, T as House, b as Monitor, c as Sun, y as Moon } from "../_libs/lucide-react.mjs";
import { n as useThemeStore, t as initThemeListeners } from "./use-theme-store-Br83hdzd.mjs";
import { a as useUiStore, i as useFileStore, n as Textarea, r as useAgentStore, t as Route$5 } from "./studio._projectId-CvRfP3PM.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C5ERYzMQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function CommandPalette() {
	const open = useUiStore((s) => s.commandOpen);
	const setCommandOpen = useUiStore((s) => s.setCommandOpen);
	const setMode = useThemeStore((s) => s.setMode);
	const navigate = useNavigate();
	const [query, setQuery] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setCommandOpen(!useUiStore.getState().commandOpen);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [setCommandOpen]);
	(0, import_react.useEffect)(() => {
		if (!open) setQuery("");
	}, [open]);
	if (!open) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
	const run = (fn) => {
		fn();
		setCommandOpen(false);
	};
	const setTheme = (mode) => run(() => setMode(mode));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4 bg-charcoal/40 backdrop-blur-sm",
		role: "presentation",
		onMouseDown: () => setCommandOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full max-w-lg border-2 border-charcoal dark:border-cream/20 bg-cream dark:bg-slate-card shadow-brutal overflow-hidden",
			onMouseDown: (e) => e.stopPropagation(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
				label: "Command palette",
				shouldFilter: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b-2 border-charcoal/10 dark:border-cream/10 px-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
						value: query,
						onValueChange: setQuery,
						placeholder: "Type a command…",
						className: "w-full h-12 bg-transparent text-sm outline-none text-charcoal dark:text-cream placeholder:text-charcoal/40 dark:placeholder:text-cream/35",
						autoFocus: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, {
					className: "max-h-72 overflow-y-auto p-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
							className: "px-3 py-6 text-center text-sm text-charcoal/50 dark:text-cream/45",
							children: "No results."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Group, {
							heading: "Navigate",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
									value: "home landing",
									onSelect: () => run(() => void navigate({ to: "/" })),
									className: itemClass,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
										className: "h-4 w-4 shrink-0 opacity-80",
										"aria-hidden": true
									}), "Home"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
									value: "dashboard projects",
									onSelect: () => run(() => void navigate({ to: "/dashboard" })),
									className: itemClass,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, {
										className: "h-4 w-4 shrink-0 opacity-80",
										"aria-hidden": true
									}), "Dashboard"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
									value: "open demo studio ide",
									onSelect: () => run(() => void navigate({
										to: "/studio/$projectId",
										params: { projectId: DEMO_PROJECT_ID }
									})),
									className: itemClass,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode2, {
										className: "h-4 w-4 shrink-0 opacity-80",
										"aria-hidden": true
									}), "Open demo studio"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Group, {
							heading: "Theme",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
									value: "light theme",
									onSelect: () => setTheme("light"),
									className: itemClass,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
										className: "h-4 w-4 shrink-0 opacity-80",
										"aria-hidden": true
									}), "Light theme"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
									value: "dark theme",
									onSelect: () => setTheme("dark"),
									className: itemClass,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
										className: "h-4 w-4 shrink-0 opacity-80",
										"aria-hidden": true
									}), "Dark theme"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
									value: "system theme",
									onSelect: () => setTheme("system"),
									className: itemClass,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
										className: "h-4 w-4 shrink-0 opacity-80",
										"aria-hidden": true
									}), "System theme"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
							heading: "Project",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
								value: "new project",
								onSelect: () => run(() => void navigate({ to: "/dashboard" })),
								className: itemClass,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, {
									className: "h-4 w-4 shrink-0 opacity-80",
									"aria-hidden": true
								}), "New project"]
							})
						})
					]
				})]
			})
		})
	});
}
var itemClass = cn("flex items-center gap-2 px-2 py-2 text-sm cursor-pointer rounded-none", "text-charcoal dark:text-cream", "data-[selected=true]:bg-terracotta data-[selected=true]:text-white", "aria-selected:bg-terracotta aria-selected:text-white");
var REASONS = [
	"Wrong approach",
	"Style mismatch",
	"Missing requirements",
	"Security concern",
	"Other"
];
function RejectionPoll() {
	const open = useAgentStore((s) => s.rejectionOpen);
	const setRejectionOpen = useAgentStore((s) => s.setRejectionOpen);
	const setLastRejection = useAgentStore((s) => s.setLastRejection);
	const setHitlVisible = useAgentStore((s) => s.setHitlVisible);
	const setPhase = useAgentStore((s) => s.setPhase);
	const addMessage = useAgentStore((s) => s.addMessage);
	const pushStatus = useAgentStore((s) => s.pushStatus);
	const setProposal = useFileStore((s) => s.setProposal);
	const [reason, setReason] = (0, import_react.useState)(REASONS[0]);
	const [freeText, setFreeText] = (0, import_react.useState)("");
	const submit = () => {
		setLastRejection({
			reason,
			...freeText.trim() ? { freeText: freeText.trim() } : {}
		});
		setProposal(null);
		setHitlVisible(false);
		setRejectionOpen(false);
		setPhase("idle");
		pushStatus(`Rejected · ${reason}`);
		addMessage({
			role: "assistant",
			agentType: "ORCHESTRATOR",
			content: `Zmena zamietnutá (${reason}). ${freeText.trim() ? `Poznámka: ${freeText.trim()}` : "Priprav nový prompt s viac detailmi."}`
		});
		setFreeText("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Rejection feedback",
		onClick: () => setRejectionOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .96,
				y: 8
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .98,
				y: 4
			},
			transition: { duration: .2 },
			className: "w-full max-w-md border-2 border-charcoal dark:border-cream/20 bg-cream dark:bg-slate-card shadow-brutal p-5",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-lg font-semibold text-charcoal dark:text-cream",
					children: "Prečo si zamietol?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-charcoal/55 dark:text-cream/50 mt-1",
					children: "Feedback trénuje ďalší run pipeline (AiInteractionLog)."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					role: "radiogroup",
					"aria-label": "Rejection reasons",
					children: REASONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "radio",
						"aria-checked": reason === r,
						onClick: () => setReason(r),
						className: cn("border-2 px-2.5 py-1 text-xs font-semibold transition-colors", reason === r ? "border-charcoal bg-terracotta text-white shadow-brutal-sm" : "border-charcoal/20 dark:border-cream/20 bg-transparent text-charcoal dark:text-cream hover:border-terracotta/50"),
						children: r
					}, r))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "mt-3 shadow-none min-h-[72px]",
					placeholder: "Voliteľný detail…",
					value: freeText,
					onChange: (e) => setFreeText(e.target.value),
					"aria-label": "Free text rejection reason"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: () => setRejectionOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "destructive",
						size: "sm",
						onClick: submit,
						children: "Submit rejection"
					})]
				})
			]
		})
	}) });
}
function AppProviders({ children }) {
	(0, import_react.useEffect)(() => {
		return initThemeListeners();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
		children,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RejectionPoll, {})
	] });
}
var styles_default = "/assets/styles-CA-q-0nD.css";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, interactive-widget=resizes-content"
			},
			{ title: "COSY Studio — AI Visual IDE" },
			{
				name: "description",
				content: "AI-powered visual IDE with multi-agent pipeline, human-in-the-loop diffs, and live preview. Warm Brutalism."
			},
			{
				name: "theme-color",
				content: "#D96B43"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "format-detection",
				content: "telephone=no"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
		}]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "sk",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "overflow-hidden bg-cream text-charcoal dark:bg-slate dark:text-cream antialiased",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppProviders, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
var $$splitComponentImporter$3 = () => import("./routes-CtXAgKGV.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./dashboard-iow96MQR.mjs");
var Route$2 = createFileRoute("/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./orders-DNveD3Lk.mjs");
var Route$1 = createFileRoute("/orders")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./profile-CyjPU0iI.mjs");
var Route = createFileRoute("/profile")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	DashboardRoute: Route$2.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$4
	}),
	OrdersRoute: Route$1.update({
		id: "/orders",
		path: "/orders",
		getParentRoute: () => Route$4
	}),
	ProfileRoute: Route.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => Route$4
	}),
	StudioProjectIdRoute: Route$5.update({
		id: "/studio/$projectId",
		path: "/studio/$projectId",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	return createRouter({
		routeTree,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
//#endregion
export { getRouter };
