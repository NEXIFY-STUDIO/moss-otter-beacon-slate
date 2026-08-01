import { o as __toESM } from "../_runtime.mjs";
import { i as DEMO_PROPOSAL_MODIFIED, r as DEMO_PROJECT_ID, t as DEMO_FILES } from "./demo-data-DrFUwAPu.mjs";
import { t as cn } from "./utils-B9P1p4Oo.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio._projectId-CvRfP3PM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var useUiStore = create((set) => ({
	commandOpen: false,
	previewDevice: "desktop",
	previewZoom: 100,
	previewKey: 0,
	leftCollapsed: false,
	mobilePane: "chat",
	setCommandOpen: (open) => set({ commandOpen: open }),
	toggleCommand: () => set((s) => ({ commandOpen: !s.commandOpen })),
	setPreviewDevice: (device) => set({ previewDevice: device }),
	setPreviewZoom: (zoom) => set({ previewZoom: Math.min(150, Math.max(50, zoom)) }),
	refreshPreview: () => set((s) => ({ previewKey: s.previewKey + 1 })),
	setLeftCollapsed: (value) => set({ leftCollapsed: value }),
	setMobilePane: (pane) => set({ mobilePane: pane })
}));
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	ref,
	className: cn("flex min-h-[96px] w-full border-2 border-charcoal/20 dark:border-cream/15 bg-cream dark:bg-slate px-3 py-2 text-sm text-charcoal dark:text-cream placeholder:text-charcoal/40 dark:placeholder:text-cream/35 shadow-brutal-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:border-terracotta disabled:cursor-not-allowed disabled:opacity-50 resize-y", className),
	...props
}));
Textarea.displayName = "Textarea";
var defaultAgents = [
	{
		type: "G0",
		label: "Planner",
		state: "idle",
		message: "Ready"
	},
	{
		type: "G1",
		label: "Coder",
		state: "idle",
		message: "Ready"
	},
	{
		type: "G2",
		label: "Auditor",
		state: "idle",
		message: "Ready"
	}
];
var seededAgents = [
	{
		type: "G0",
		label: "Planner",
		state: "success",
		message: "Plan ready",
		latencyMs: 420
	},
	{
		type: "G1",
		label: "Coder",
		state: "success",
		message: "Diff ready",
		latencyMs: 1280
	},
	{
		type: "G2",
		label: "Auditor",
		state: "success",
		message: "Audit clean",
		latencyMs: 310
	}
];
var abortFlag = false;
var useAgentStore = create((set, get) => ({
	phase: "awaiting_approval",
	agents: seededAgents,
	messages: [{
		id: "m1",
		role: "user",
		content: "Prepíš hero sekciu landing page – silnejší headline a dual CTA buttons v Warm Brutalism štýle.",
		createdAt: Date.now() - 6e4
	}, {
		id: "m2",
		role: "assistant",
		agentType: "ORCHESTRATOR",
		content: "Pipeline hotová. G0 navrhol úpravu `src/App.tsx`, G1 vygeneroval diff, G2 nenašiel security issues. Čakám na Approve / Reject.",
		createdAt: Date.now() - 3e4
	}],
	isStreaming: false,
	latencyMs: 2010,
	tokensUsed: 1842,
	hitlVisible: true,
	rejectionOpen: false,
	lastRejection: null,
	statusLog: [
		"Boot complete · Warm Brutalism tokens loaded",
		"G0 → G1 → G2 pipeline ready",
		"HitL card visible · Enter approve · Esc reject"
	],
	setPhase: (phase) => set({ phase }),
	setAgentState: (type, patch) => set((state) => ({ agents: state.agents.map((a) => a.type === type ? {
		...a,
		...patch
	} : a) })),
	addMessage: (message) => set((state) => ({ messages: [...state.messages, {
		id: message.id ?? crypto.randomUUID(),
		createdAt: Date.now(),
		role: message.role,
		content: message.content,
		...message.agentType !== void 0 ? { agentType: message.agentType } : {},
		...message.attachments !== void 0 ? { attachments: message.attachments } : {}
	}] })),
	clearMessages: () => set({ messages: [] }),
	setStreaming: (value) => set({ isStreaming: value }),
	setMetrics: (latencyMs, tokensUsed) => set({
		latencyMs,
		tokensUsed
	}),
	setHitlVisible: (value) => set({ hitlVisible: value }),
	setRejectionOpen: (value) => set({ rejectionOpen: value }),
	setLastRejection: (feedback) => set({ lastRejection: feedback }),
	pushStatus: (line) => set((state) => ({ statusLog: [...state.statusLog.slice(-40), line] })),
	resetPipeline: () => {
		abortFlag = false;
		set({
			phase: "idle",
			agents: defaultAgents.map((a) => ({ ...a })),
			isStreaming: false,
			hitlVisible: false,
			rejectionOpen: false
		});
	},
	abort: () => {
		abortFlag = true;
		set({
			phase: "aborted",
			isStreaming: false,
			hitlVisible: false
		});
		get().pushStatus("Pipeline aborted by user");
	},
	runDemoPipeline: async () => {
		abortFlag = false;
		const { setAgentState, setPhase, setStreaming, pushStatus, addMessage, setMetrics, setHitlVisible } = get();
		setStreaming(true);
		setHitlVisible(false);
		setPhase("planning");
		setAgentState("G0", {
			state: "running",
			message: "Planning files…"
		});
		setAgentState("G1", {
			state: "idle",
			message: "Waiting"
		});
		setAgentState("G2", {
			state: "idle",
			message: "Waiting"
		});
		pushStatus("G0 Planner started");
		await sleep(700);
		if (abortFlag) return;
		setAgentState("G0", {
			state: "success",
			message: "1 file planned",
			latencyMs: 680
		});
		pushStatus("G0 complete · src/App.tsx");
		setPhase("coding");
		setAgentState("G1", {
			state: "running",
			message: "Streaming code…"
		});
		pushStatus("G1 Coder streaming tokens");
		await sleep(900);
		if (abortFlag) return;
		setAgentState("G1", {
			state: "success",
			message: "Diff ready",
			latencyMs: 910
		});
		pushStatus("G1 complete · proposal ready");
		setPhase("auditing");
		setAgentState("G2", {
			state: "running",
			message: "Auditing…"
		});
		await sleep(500);
		if (abortFlag) return;
		setAgentState("G2", {
			state: "success",
			message: "0 critical issues",
			latencyMs: 480
		});
		pushStatus("G2 Auditor passed");
		setMetrics(2070, 1920);
		setPhase("awaiting_approval");
		setStreaming(false);
		setHitlVisible(true);
		addMessage({
			role: "assistant",
			agentType: "ORCHESTRATOR",
			content: "Nový diff pripravený. Skontroluj stredný panel a potvrď Enter / Approve alebo zamietni Esc / Reject."
		});
		pushStatus("Awaiting human approval");
	}
}));
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
function guessLanguage(path) {
	if (path.endsWith(".tsx")) return "tsx";
	if (path.endsWith(".ts")) return "ts";
	if (path.endsWith(".jsx")) return "jsx";
	if (path.endsWith(".js")) return "js";
	if (path.endsWith(".css")) return "css";
	if (path.endsWith(".json")) return "json";
	if (path.endsWith(".html")) return "html";
	if (path.endsWith(".md")) return "md";
	return "txt";
}
function filesToMap(list) {
	return new Map(list.map((f) => [f.path, f]));
}
var initialFiles = filesToMap(DEMO_FILES);
var appFile = initialFiles.get("src/App.tsx");
var useFileStore = create((set, get) => ({
	projectId: DEMO_PROJECT_ID,
	files: initialFiles,
	activeFilePath: "src/App.tsx",
	proposal: appFile ? {
		path: "src/App.tsx",
		original: appFile.content,
		modified: DEMO_PROPOSAL_MODIFIED,
		language: "tsx",
		summary: "Rewrite hero copy and add dual CTAs for HitL demo"
	} : null,
	setProject: (projectId, files) => set({
		projectId,
		files: filesToMap(files),
		activeFilePath: files[0]?.path ?? null,
		proposal: null
	}),
	setActiveFile: (path) => set({ activeFilePath: path }),
	updateContent: (path, content) => set((state) => {
		const existing = state.files.get(path);
		if (!existing) return state;
		const next = new Map(state.files);
		next.set(path, {
			...existing,
			content,
			version: existing.version + 1
		});
		return { files: next };
	}),
	createFile: (path, content = "", language) => set((state) => {
		if (state.files.has(path)) return state;
		const next = new Map(state.files);
		next.set(path, {
			id: `file-${crypto.randomUUID()}`,
			path,
			content,
			language: language ?? guessLanguage(path),
			version: 1
		});
		return {
			files: next,
			activeFilePath: path
		};
	}),
	deleteFile: (path) => set((state) => {
		if (!state.files.has(path)) return state;
		const next = new Map(state.files);
		next.delete(path);
		return {
			files: next,
			activeFilePath: state.activeFilePath === path ? [...next.keys()][0] ?? null : state.activeFilePath
		};
	}),
	renameFile: (oldPath, newPath) => set((state) => {
		const existing = state.files.get(oldPath);
		if (!existing || state.files.has(newPath)) return state;
		const next = new Map(state.files);
		next.delete(oldPath);
		next.set(newPath, {
			...existing,
			path: newPath,
			language: guessLanguage(newPath)
		});
		return {
			files: next,
			activeFilePath: state.activeFilePath === oldPath ? newPath : state.activeFilePath
		};
	}),
	setProposal: (proposal) => set({ proposal }),
	applyProposal: () => {
		const { proposal, updateContent, setProposal } = get();
		if (!proposal) return;
		updateContent(proposal.path, proposal.modified);
		setProposal(null);
	},
	getContentMap: () => {
		const map = /* @__PURE__ */ new Map();
		for (const [path, file] of get().files) map.set(path, file.content);
		return map;
	}
}));
var $$splitComponentImporter = () => import("./studio._projectId-DEo8ZP8w.mjs");
var Route = createFileRoute("/studio/$projectId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
export { useUiStore as a, useFileStore as i, Textarea as n, useAgentStore as r, Route as t };
