import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-theme-store-Br83hdzd.js
function resolveSystem() {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyDocumentTheme(resolved) {
	if (typeof document === "undefined") return;
	document.documentElement.classList.toggle("dark", resolved === "dark");
	document.documentElement.style.colorScheme = resolved;
}
var useThemeStore = create()(persist((set, get) => ({
	mode: "system",
	resolved: "light",
	setMode: (mode) => {
		const resolved = mode === "system" ? resolveSystem() : mode;
		applyDocumentTheme(resolved);
		set({
			mode,
			resolved
		});
	},
	applyResolved: (resolved) => {
		applyDocumentTheme(resolved);
		set({ resolved });
	}
}), {
	name: "cosy-theme",
	partialize: (s) => ({ mode: s.mode }),
	onRehydrateStorage: () => (state) => {
		if (!state) return;
		const resolved = state.mode === "system" ? resolveSystem() : state.mode;
		applyDocumentTheme(resolved);
		state.applyResolved(resolved);
	}
}));
function initThemeListeners() {
	if (typeof window === "undefined") return () => void 0;
	const mq = window.matchMedia("(prefers-color-scheme: dark)");
	const onChange = () => {
		const { mode, applyResolved } = useThemeStore.getState();
		if (mode === "system") applyResolved(mq.matches ? "dark" : "light");
	};
	mq.addEventListener("change", onChange);
	const { mode, applyResolved } = useThemeStore.getState();
	applyResolved(mode === "system" ? resolveSystem() : mode);
	return () => mq.removeEventListener("change", onChange);
}
//#endregion
export { useThemeStore as n, initThemeListeners as t };
