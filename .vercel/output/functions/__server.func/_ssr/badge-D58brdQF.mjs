import "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-B9P1p4Oo.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center border-2 border-charcoal/15 dark:border-cream/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide", {
	variants: { variant: {
		default: "bg-cream-secondary text-charcoal dark:bg-slate-card dark:text-cream",
		accent: "bg-terracotta/15 text-rust border-terracotta/30 dark:text-terracotta",
		success: "bg-diff-add-bg text-diff-add-text border-diff-add-text/30",
		danger: "bg-diff-del-bg text-diff-del-text border-diff-del-text/30",
		outline: "bg-transparent text-charcoal dark:text-cream"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };
