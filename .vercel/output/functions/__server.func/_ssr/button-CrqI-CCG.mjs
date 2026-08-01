import { o as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-B9P1p4Oo.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-CrqI-CCG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream dark:focus-visible:ring-offset-slate disabled:pointer-events-none disabled:opacity-50 border-2 border-charcoal dark:border-cream/20 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none", {
	variants: {
		variant: {
			primary: "bg-terracotta text-white shadow-brutal hover:bg-rust dark:shadow-[4px_4px_0px_0px_rgba(244,241,234,0.15)]",
			secondary: "bg-cream-secondary text-charcoal shadow-brutal hover:bg-cream dark:bg-slate-card dark:text-cream dark:shadow-[4px_4px_0px_0px_rgba(244,241,234,0.12)]",
			ghost: "border-transparent bg-transparent shadow-none text-charcoal hover:bg-charcoal/5 dark:text-cream dark:hover:bg-cream/5",
			destructive: "bg-diff-del-text text-white shadow-brutal hover:bg-red-800 dark:shadow-[4px_4px_0px_0px_rgba(244,241,234,0.12)]",
			outline: "bg-transparent text-charcoal shadow-brutal-sm hover:bg-cream-secondary dark:text-cream dark:hover:bg-slate-card"
		},
		size: {
			sm: "h-8 px-3 text-xs",
			md: "h-10 px-4 text-sm",
			lg: "h-12 px-6 text-base",
			icon: "h-10 w-10 p-0"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, type = "button", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	ref,
	type,
	className: cn(buttonVariants({
		variant,
		size
	}), className),
	...props
}));
Button.displayName = "Button";
//#endregion
export { Button as t };
