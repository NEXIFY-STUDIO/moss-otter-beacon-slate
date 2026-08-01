import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-B9P1p4Oo.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatLatency(ms) {
	if (ms < 1e3) return `${Math.round(ms)}ms`;
	return `${(ms / 1e3).toFixed(1)}s`;
}
//#endregion
export { formatLatency as n, cn as t };
