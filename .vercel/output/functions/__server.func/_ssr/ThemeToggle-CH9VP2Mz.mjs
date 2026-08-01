import { t as cn } from "./utils-B9P1p4Oo.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CrqI-CCG.mjs";
import { b as Monitor, c as Sun, y as Moon } from "../_libs/lucide-react.mjs";
import { n as useThemeStore } from "./use-theme-store-Br83hdzd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ThemeToggle-CH9VP2Mz.js
var import_jsx_runtime = require_jsx_runtime();
var order = [
	"light",
	"dark",
	"system"
];
function ThemeToggle({ className }) {
	const mode = useThemeStore((s) => s.mode);
	const setMode = useThemeStore((s) => s.setMode);
	const cycle = () => {
		const next = order[(order.indexOf(mode) + 1) % order.length] ?? "system";
		setMode(next);
	};
	const Icon = mode === "dark" ? Moon : mode === "light" ? Sun : Monitor;
	const label = mode === "dark" ? "Dark theme" : mode === "light" ? "Light theme" : "System theme";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		variant: "ghost",
		size: "icon",
		onClick: cycle,
		"aria-label": `Theme: ${label}. Click to cycle.`,
		title: label,
		className: cn("shrink-0", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "h-4 w-4",
			"aria-hidden": true
		})
	});
}
//#endregion
export { ThemeToggle as t };
