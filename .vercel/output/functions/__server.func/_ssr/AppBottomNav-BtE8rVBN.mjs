import { t as cn } from "./utils-B9P1p4Oo.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as LayoutDashboard, T as House, b as Monitor, f as ShoppingBag } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppBottomNav-BtE8rVBN.js
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		to: "/",
		label: "Home",
		icon: House,
		match: (p) => p === "/"
	},
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard,
		match: (p) => p.startsWith("/dashboard")
	},
	{
		to: "/orders",
		label: "Orders",
		icon: ShoppingBag,
		match: (p) => p.startsWith("/orders")
	},
	{
		to: "/profile",
		label: "Profile",
		icon: Monitor,
		match: (p) => p.startsWith("/profile")
	}
];
function AppBottomNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "shrink-0 border-t border-white/10 bg-black/95 backdrop-blur-xl",
		"aria-label": "Main",
		style: { paddingBottom: "env(safe-area-inset-bottom, 0px)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid max-w-lg grid-cols-4 h-16 min-h-[64px]",
			children: items.map(({ to, label, icon: Icon, match }) => {
				const active = match(pathname);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to,
					"aria-current": active ? "page" : void 0,
					"aria-label": label,
					className: cn("relative flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors min-h-[44px]", active ? "text-terracotta" : "text-white/45 active:text-white/70"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "h-5 w-5",
							strokeWidth: active ? 2.4 : 1.8,
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
						active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-0 inset-x-8 h-0.5 rounded-full bg-terracotta",
							"aria-hidden": true
						})
					]
				}, to);
			})
		})
	});
}
//#endregion
export { AppBottomNav as t };
