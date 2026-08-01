import { t as cn } from "./utils-B9P1p4Oo.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-C__DjOTN.js
var import_jsx_runtime = require_jsx_runtime();
/**
* iPhone / mobile-safe full-viewport shell.
* Styles live in `.app-shell` (styles.css): fixed + 100dvh + safe-area.
*/
function AppShell({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("app-shell", className),
		children
	});
}
//#endregion
export { AppShell as t };
