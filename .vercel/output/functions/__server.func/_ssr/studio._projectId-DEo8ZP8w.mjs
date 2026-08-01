import { o as __toESM } from "../_runtime.mjs";
import { a as buildPreviewHtml, i as DEMO_PROPOSAL_MODIFIED, n as DEMO_PROJECTS } from "./demo-data-DrFUwAPu.mjs";
import { n as formatLatency, t as cn } from "./utils-B9P1p4Oo.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CrqI-CCG.mjs";
import { t as AppShell } from "./AppShell-C__DjOTN.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Files, B as ChevronRight, E as Folder, F as ExternalLink, H as Check, I as Command, M as FileJson, N as FileCode2, O as FolderOpen, P as Eye, R as Circle, V as ChevronDown, a as Trash2, b as Monitor, d as Smartphone, g as Plus, h as RefreshCw, j as FileText, l as Square, m as Send, n as ZoomOut, o as Terminal, r as X, s as Tablet, t as ZoomIn, u as Sparkles, w as ImagePlus, x as MessageSquare } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-D58brdQF.mjs";
import { t as ThemeToggle } from "./ThemeToggle-CH9VP2Mz.mjs";
import { a as useUiStore, i as useFileStore, n as Textarea, r as useAgentStore, t as Route } from "./studio._projectId-CvRfP3PM.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { n as Zt, r as tn, t as Xt } from "../_libs/react-resizable-panels.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio._projectId-DEo8ZP8w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TopBar({ projectName = "Untitled Project", className, compact = false }) {
	const agents = useAgentStore((s) => s.agents);
	const phase = useAgentStore((s) => s.phase);
	const toggleCommand = useUiStore((s) => s.toggleCommand);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("shrink-0 border-b-2 border-charcoal/10 dark:border-cream/10 bg-cream-secondary dark:bg-slate-card flex items-center gap-2 sm:gap-3 px-2.5 sm:px-4", compact ? "h-12 min-h-[48px] sm:h-14 sm:min-h-14" : "h-14 min-h-14", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2 shrink-0 group",
				"aria-label": "COSY Studio home",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-8 w-8 items-center justify-center border-2 border-charcoal dark:border-cream/30 bg-terracotta text-white shadow-brutal-sm font-serif font-bold text-sm group-hover:translate-x-px group-hover:translate-y-px group-hover:shadow-none transition-all",
					children: "C"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline font-serif font-semibold tracking-wide text-charcoal dark:text-cream",
					children: "COSY"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-px bg-charcoal/15 dark:bg-cream/15 hidden sm:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.14em] text-charcoal/45 dark:text-cream/40 font-semibold leading-none",
					children: "Project"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-semibold text-charcoal dark:text-cream leading-tight mt-0.5",
					children: projectName
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex md:hidden items-center gap-1 shrink-0",
				role: "status",
				"aria-label": "Agent pipeline",
				children: agents.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
					className: cn("h-2.5 w-2.5 fill-current", agent.state === "running" && "text-terracotta animate-pulse", agent.state === "success" && "text-diff-add-text", agent.state === "error" && "text-diff-del-text", agent.state === "idle" && "text-charcoal/30 dark:text-cream/30"),
					"aria-label": `${agent.type} ${agent.state}`
				}, agent.type))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden md:flex items-center gap-1.5 px-2 py-1 border-2 border-charcoal/10 dark:border-cream/10 bg-cream/60 dark:bg-slate/60",
				role: "status",
				"aria-label": "Agent pipeline status",
				children: [agents.map((agent, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-charcoal/25 dark:text-cream/25 text-xs",
						"aria-hidden": true,
						children: "→"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-xs font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
							className: cn("h-2.5 w-2.5 fill-current", agent.state === "running" && "text-terracotta animate-pulse", agent.state === "success" && "text-diff-add-text", agent.state === "error" && "text-diff-del-text", agent.state === "idle" && "text-charcoal/30 dark:text-cream/30"),
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-charcoal/80 dark:text-cream/80",
							children: agent.type
						})]
					})]
				}, agent.type)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "accent",
					className: "ml-2 normal-case tracking-normal",
					children: phase.replaceAll("_", " ")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-0.5 sm:gap-1 shrink-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "h-10 w-10 sm:hidden",
						onClick: toggleCommand,
						"aria-label": "Open command palette",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, {
							className: "h-4 w-4",
							"aria-hidden": true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						className: "hidden sm:inline-flex gap-1.5",
						onClick: toggleCommand,
						"aria-label": "Open command palette",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, {
							className: "h-3.5 w-3.5",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs",
							children: "Cmd+K"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden sm:flex h-8 w-8 items-center justify-center border-2 border-charcoal/20 dark:border-cream/20 bg-cream dark:bg-slate text-xs font-bold",
						"aria-label": "User profile placeholder",
						title: "Profile (auth coming later)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							className: "h-3.5 w-3.5 text-terracotta",
							"aria-hidden": true
						})
					})
				]
			})
		]
	});
}
function BottomBar({ className }) {
	const statusLog = useAgentStore((s) => s.statusLog);
	const latencyMs = useAgentStore((s) => s.latencyMs);
	const tokensUsed = useAgentStore((s) => s.tokensUsed);
	const toggleCommand = useUiStore((s) => s.toggleCommand);
	const last = statusLog[statusLog.length - 1] ?? "Ready";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: cn("h-10 shrink-0 border-t-2 border-charcoal/10 dark:border-cream/10 bg-cream-secondary dark:bg-slate-card flex items-center gap-3 px-3 text-xs", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, {
				className: "h-3.5 w-3.5 text-terracotta shrink-0",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-w-0 flex-1 truncate text-charcoal/70 dark:text-cream/65 font-mono",
				children: last
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "hidden sm:inline text-charcoal/45 dark:text-cream/40 font-mono tabular-nums",
				children: [
					formatLatency(latencyMs),
					" · ",
					tokensUsed,
					" tok"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				size: "sm",
				className: "h-7 px-2 gap-1",
				onClick: toggleCommand,
				"aria-label": "Open command palette",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, {
					className: "h-3 w-3",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
					className: "font-mono text-[10px] opacity-70",
					children: "⌘K"
				})]
			})
		]
	});
}
function AgentStatus() {
	const agents = useAgentStore((s) => s.agents);
	const latencyMs = useAgentStore((s) => s.latencyMs);
	const tokensUsed = useAgentStore((s) => s.tokensUsed);
	const isStreaming = useAgentStore((s) => s.isStreaming);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b-2 border-charcoal/10 dark:border-cream/10 px-3 py-2.5 space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.14em] font-semibold text-charcoal/50 dark:text-cream/45",
					children: "Agents"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[10px] font-mono tabular-nums text-charcoal/45 dark:text-cream/40",
					children: [
						formatLatency(latencyMs),
						" · ",
						tokensUsed,
						"t"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1.5",
				"aria-live": "polite",
				children: agents.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
							className: cn("h-2.5 w-2.5 shrink-0 fill-current", agent.state === "running" && "text-terracotta animate-pulse", agent.state === "success" && "text-diff-add-text", agent.state === "error" && "text-diff-del-text", agent.state === "idle" && "text-charcoal/30 dark:text-cream/30"),
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold w-6 text-charcoal dark:text-cream",
							children: agent.type
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-charcoal/60 dark:text-cream/55",
							children: agent.message ?? agent.label
						}),
						agent.latencyMs !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-auto font-mono tabular-nums text-charcoal/40 dark:text-cream/35",
							children: [agent.latencyMs, "ms"]
						})
					]
				}, agent.type))
			}),
			isStreaming && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-terracotta font-medium animate-pulse",
				children: "Streaming pipeline…"
			})
		]
	});
}
function ChatThread() {
	const messages = useAgentStore((s) => s.messages);
	const bottomRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		bottomRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "end"
		});
	}, [messages.length]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 py-3 space-y-3",
		role: "log",
		"aria-label": "Chat thread",
		"aria-live": "polite",
		children: [
			messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center py-8 px-4 border-2 border-dashed border-charcoal/15 dark:border-cream/15",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-base text-charcoal dark:text-cream",
					children: "Start a conversation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-charcoal/55 dark:text-cream/50 mt-1 leading-relaxed",
					children: "Popíš UI zmenu — G0→G1→G2 pipeline pripraví diff na schválenie."
				})]
			}),
			messages.map((msg) => {
				const isUser = msg.role === "user";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: cn("border-2 px-3 py-2.5 text-sm leading-relaxed max-w-[95%]", isUser ? "ml-auto border-charcoal dark:border-cream/25 bg-terracotta text-white shadow-brutal-sm" : "mr-auto border-charcoal/15 dark:border-cream/15 bg-cream dark:bg-slate-card text-charcoal dark:text-cream shadow-brutal-sm"),
					children: [!isUser && msg.agentType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "accent",
						className: "mb-1.5",
						children: msg.agentType
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-wrap break-words",
						children: msg.content
					})]
				}, msg.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: bottomRef,
				className: "h-px"
			})
		]
	});
}
function PromptInput() {
	const [value, setValue] = (0, import_react.useState)("");
	const [attachments, setAttachments] = (0, import_react.useState)([]);
	const fileRef = (0, import_react.useRef)(null);
	const isStreaming = useAgentStore((s) => s.isStreaming);
	const addMessage = useAgentStore((s) => s.addMessage);
	const runDemoPipeline = useAgentStore((s) => s.runDemoPipeline);
	const abort = useAgentStore((s) => s.abort);
	const setProposal = useFileStore((s) => s.setProposal);
	const files = useFileStore((s) => s.files);
	const setMobilePane = useUiStore((s) => s.setMobilePane);
	const onPickImage = (0, import_react.useCallback)((filesList) => {
		if (!filesList) return;
		const next = [];
		Array.from(filesList).slice(0, 3).forEach((file) => {
			if (!file.type.startsWith("image/")) return;
			next.push({
				id: crypto.randomUUID(),
				name: file.name,
				mimeType: file.type,
				previewUrl: URL.createObjectURL(file)
			});
		});
		setAttachments((prev) => [...prev, ...next].slice(0, 4));
	}, []);
	const submit = async () => {
		const prompt = value.trim();
		if (!prompt || isStreaming) return;
		addMessage({
			role: "user",
			content: prompt,
			...attachments.length > 0 ? { attachments } : {}
		});
		setValue("");
		setAttachments([]);
		const original = files.get("src/App.tsx")?.content ?? "";
		setProposal({
			path: "src/App.tsx",
			original,
			modified: DEMO_PROPOSAL_MODIFIED,
			language: "tsx",
			summary: prompt.slice(0, 120)
		});
		if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) setMobilePane("code");
		await runDemoPipeline();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-t-2 border-charcoal/10 dark:border-cream/10 p-2.5 sm:p-3 space-y-2 bg-cream dark:bg-slate",
		children: [
			attachments.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: attachments.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-12 w-12 border-2 border-charcoal/20 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: a.previewUrl,
						alt: a.name,
						className: "h-full w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute -top-1 -right-1 h-5 w-5 bg-charcoal text-cream text-[10px] leading-none",
						"aria-label": `Remove ${a.name}`,
						onClick: () => setAttachments((prev) => prev.filter((x) => x.id !== a.id)),
						children: "×"
					})]
				}, a.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value,
				onChange: (e) => setValue(e.target.value),
				placeholder: "Popíš zmenu… (Enter odoslať)",
				"aria-label": "Prompt input",
				className: "min-h-[64px] max-h-[28dvh] text-sm shadow-none text-base sm:text-sm",
				onKeyDown: (e) => {
					if (e.key === "Enter" && !e.shiftKey) {
						e.preventDefault();
						submit();
					}
				},
				disabled: isStreaming
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "image/*",
						multiple: true,
						className: "sr-only",
						onChange: (e) => onPickImage(e.target.files)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						className: "h-11 w-11",
						"aria-label": "Attach image",
						onClick: () => fileRef.current?.click(),
						disabled: isStreaming,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, {
							className: "h-4 w-4",
							"aria-hidden": true
						})
					})]
				}), isStreaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "destructive",
					size: "sm",
					className: "min-h-11 px-4",
					onClick: abort,
					"aria-label": "Stop generation",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {
						className: "h-3.5 w-3.5",
						"aria-hidden": true
					}), "Stop"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "sm",
					className: "min-h-11 px-5",
					onClick: () => void submit(),
					disabled: !value.trim(),
					"aria-label": "Send prompt",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
						className: "h-3.5 w-3.5",
						"aria-hidden": true
					}), "Send"]
				})]
			})
		]
	});
}
function LeftPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "h-full flex flex-col bg-cream dark:bg-slate border-r border-charcoal/5 dark:border-cream/5 min-h-0 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-3 py-2 border-b-2 border-charcoal/10 dark:border-cream/10 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.14em] font-semibold text-charcoal/50 dark:text-cream/45",
					children: "Chat & Agents"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-sm font-semibold text-charcoal dark:text-cream",
					children: "Conversation"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentStatus, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatThread, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptInput, {})
			})
		]
	});
}
var Input = import_react.forwardRef(({ className, type = "text", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	type,
	className: cn("flex h-10 w-full border-2 border-charcoal/20 dark:border-cream/15 bg-cream dark:bg-slate px-3 py-2 text-sm text-charcoal dark:text-cream placeholder:text-charcoal/40 dark:placeholder:text-cream/35 shadow-brutal-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:border-terracotta disabled:cursor-not-allowed disabled:opacity-50", className),
	...props
}));
Input.displayName = "Input";
function buildTree(files) {
	const root = [];
	const folderMap = /* @__PURE__ */ new Map();
	const ensureFolder = (parts) => {
		let path = "";
		let parentChildren = root;
		let node;
		for (const part of parts) {
			path = path ? `${path}/${part}` : part;
			node = folderMap.get(path);
			if (!node) {
				node = {
					id: `folder-${path}`,
					name: part,
					path,
					type: "folder",
					children: []
				};
				folderMap.set(path, node);
				parentChildren.push(node);
			}
			parentChildren = node.children ?? [];
		}
		return node;
	};
	const sorted = [...files.values()].sort((a, b) => a.path.localeCompare(b.path));
	for (const file of sorted) {
		const parts = file.path.split("/");
		const name = parts[parts.length - 1] ?? file.path;
		const folderParts = parts.slice(0, -1);
		(folderParts.length > 0 ? ensureFolder(folderParts).children : root).push({
			id: file.id,
			name,
			path: file.path,
			type: "file",
			language: file.language
		});
	}
	const sortNodes = (nodes) => {
		nodes.sort((a, b) => {
			if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
			return a.name.localeCompare(b.name);
		});
		for (const n of nodes) if (n.children) sortNodes(n.children);
	};
	sortNodes(root);
	return root;
}
function FileIcon({ node }) {
	if (node.type === "folder") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, {
		className: "h-3.5 w-3.5",
		"aria-hidden": true
	});
	if (node.language === "json") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileJson, {
		className: "h-3.5 w-3.5",
		"aria-hidden": true
	});
	if (node.language === "tsx" || node.language === "ts" || node.language === "css") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode2, {
		className: "h-3.5 w-3.5",
		"aria-hidden": true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
		className: "h-3.5 w-3.5",
		"aria-hidden": true
	});
}
function TreeNode({ node, depth, onFileSelect }) {
	const activeFilePath = useFileStore((s) => s.activeFilePath);
	const setActiveFile = useFileStore((s) => s.setActiveFile);
	const deleteFile = useFileStore((s) => s.deleteFile);
	const [open, setOpen] = (0, import_react.useState)(true);
	const isActive = activeFilePath === node.path;
	if (node.type === "folder") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "flex w-full items-center gap-1 px-1.5 py-1.5 text-left text-xs hover:bg-charcoal/5 dark:hover:bg-cream/5 min-h-[36px]",
		style: { paddingLeft: 6 + depth * 12 },
		onClick: () => setOpen((v) => !v),
		"aria-expanded": open,
		children: [
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
				className: "h-3 w-3 shrink-0",
				"aria-hidden": true
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
				className: "h-3 w-3 shrink-0",
				"aria-hidden": true
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
				className: "h-3.5 w-3.5 text-terracotta shrink-0",
				"aria-hidden": true
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, {
				className: "h-3.5 w-3.5 text-terracotta shrink-0",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate font-medium",
				children: node.name
			})
		]
	}), open && node.children?.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeNode, {
		node: child,
		depth: depth + 1,
		onFileSelect
	}, child.id))] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group flex items-center gap-1 pr-1 text-xs", isActive && "bg-terracotta/15 dark:bg-terracotta/20"),
		style: { paddingLeft: 6 + depth * 12 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "flex min-w-0 flex-1 items-center gap-1.5 py-1.5 text-left hover:bg-charcoal/5 dark:hover:bg-cream/5 min-h-[40px]",
			onClick: () => {
				setActiveFile(node.path);
				onFileSelect?.();
			},
			"aria-current": isActive ? "page" : void 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileIcon, { node }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: node.name
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 p-2 text-charcoal/50 hover:text-diff-del-text min-h-[40px] min-w-[40px] flex items-center justify-center",
			"aria-label": `Delete ${node.path}`,
			onClick: () => deleteFile(node.path),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
				className: "h-3.5 w-3.5",
				"aria-hidden": true
			})
		})]
	});
}
function FileTree({ onFileSelect, compact = false }) {
	const files = useFileStore((s) => s.files);
	const createFile = useFileStore((s) => s.createFile);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [newPath, setNewPath] = (0, import_react.useState)("");
	const tree = (0, import_react.useMemo)(() => buildTree(files), [files]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("h-full flex flex-col border-r-2 border-charcoal/10 dark:border-cream/10 bg-cream-secondary/50 dark:bg-slate-card/40 min-w-0", compact && "border-r-0"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-1 px-2 py-2 border-b border-charcoal/10 dark:border-cream/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.12em] font-semibold text-charcoal/50 dark:text-cream/45",
					children: "Files"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					className: "h-9 w-9",
					"aria-label": "New file",
					onClick: () => setCreating(true),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						className: "h-3.5 w-3.5",
						"aria-hidden": true
					})
				})]
			}),
			creating && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "p-2 border-b border-charcoal/10 dark:border-cream/10 space-y-1",
				onSubmit: (e) => {
					e.preventDefault();
					const path = newPath.trim();
					if (path) {
						createFile(path, "");
						setNewPath("");
						setCreating(false);
						onFileSelect?.();
					}
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: newPath,
					onChange: (e) => setNewPath(e.target.value),
					placeholder: "path/to/file.tsx",
					"aria-label": "New file path",
					className: "h-10 text-xs shadow-none",
					autoFocus: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "sm",
						className: "h-9 text-xs flex-1",
						children: "Create"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						className: "h-9 text-xs",
						onClick: () => {
							setCreating(false);
							setNewPath("");
						},
						children: "Cancel"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto py-1 overscroll-contain",
				children: tree.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeNode, {
					node,
					depth: 0,
					onFileSelect
				}, node.id))
			})
		]
	});
}
function computeLines(original, modified) {
	const a = original.split("\n");
	const b = modified.split("\n");
	const n = a.length;
	const m = b.length;
	const dp = Array.from({ length: n + 1 }, () => Array.from({ length: m + 1 }, () => 0));
	for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) {
		const row = dp[i];
		const nextRow = dp[i + 1];
		if (!row || !nextRow) continue;
		if (a[i] === b[j]) row[j] = (nextRow[j + 1] ?? 0) + 1;
		else row[j] = Math.max(nextRow[j] ?? 0, row[j + 1] ?? 0);
	}
	const lines = [];
	let i = 0;
	let j = 0;
	while (i < n && j < m) if (a[i] === b[j]) {
		lines.push({
			type: "same",
			text: a[i] ?? ""
		});
		i++;
		j++;
	} else if ((dp[i + 1]?.[j] ?? 0) >= (dp[i]?.[j + 1] ?? 0)) {
		lines.push({
			type: "del",
			text: a[i] ?? ""
		});
		i++;
	} else {
		lines.push({
			type: "add",
			text: b[j] ?? ""
		});
		j++;
	}
	while (i < n) {
		lines.push({
			type: "del",
			text: a[i] ?? ""
		});
		i++;
	}
	while (j < m) {
		lines.push({
			type: "add",
			text: b[j] ?? ""
		});
		j++;
	}
	return lines;
}
function DiffView({ proposal, fallbackContent, language }) {
	const lines = (0, import_react.useMemo)(() => {
		if (!proposal) return fallbackContent.split("\n").map((text) => ({
			type: "same",
			text
		}));
		return computeLines(proposal.original, proposal.modified);
	}, [proposal, fallbackContent]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full flex flex-col min-h-0 bg-cream dark:bg-slate",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2 px-3 py-1.5 border-b border-charcoal/10 dark:border-cream/10 text-[11px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-charcoal/60 dark:text-cream/55",
				children: [
					proposal ? `${proposal.path} · diff` : "editor",
					" · ",
					language
				]
			}), proposal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-charcoal/45 dark:text-cream/40 truncate max-w-[50%]",
				children: proposal.summary
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-auto font-mono text-[12px] leading-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "min-w-full",
				children: lines.map((line, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex px-2 border-l-2 border-transparent", line.type === "add" && "bg-diff-add-bg text-diff-add-text border-diff-add-text/40", line.type === "del" && "bg-diff-del-bg text-diff-del-text border-diff-del-text/40 line-through opacity-90", line.type === "same" && "text-charcoal/80 dark:text-cream/75"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-4 shrink-0 select-none opacity-50",
							children: line.type === "add" ? "+" : line.type === "del" ? "−" : " "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-10 shrink-0 select-none text-right pr-3 text-charcoal/30 dark:text-cream/25 tabular-nums",
							children: idx + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "whitespace-pre-wrap break-all flex-1",
							children: line.text || " "
						})
					]
				}, idx))
			})
		})]
	});
}
function HitLCard({ compact = false }) {
	const hitlVisible = useAgentStore((s) => s.hitlVisible);
	const setHitlVisible = useAgentStore((s) => s.setHitlVisible);
	const setRejectionOpen = useAgentStore((s) => s.setRejectionOpen);
	const setPhase = useAgentStore((s) => s.setPhase);
	const addMessage = useAgentStore((s) => s.addMessage);
	const pushStatus = useAgentStore((s) => s.pushStatus);
	const applyProposal = useFileStore((s) => s.applyProposal);
	const proposal = useFileStore((s) => s.proposal);
	const refreshPreview = useUiStore((s) => s.refreshPreview);
	const setMobilePane = useUiStore((s) => s.setMobilePane);
	const onApprove = () => {
		applyProposal();
		setHitlVisible(false);
		setPhase("done");
		pushStatus("Approved · file updated · preview refreshed");
		addMessage({
			role: "assistant",
			agentType: "ORCHESTRATOR",
			content: "Zmena schválená. Súbor aktualizovaný a live preview refreshnutý."
		});
		refreshPreview();
		if (compact) setMobilePane("preview");
	};
	const onReject = () => {
		setRejectionOpen(true);
	};
	(0, import_react.useEffect)(() => {
		if (!hitlVisible) return;
		const onKey = (e) => {
			const target = e.target;
			const tag = target?.tagName?.toLowerCase();
			if (tag === "textarea" || tag === "input" || target?.isContentEditable) return;
			if (e.key === "Enter") {
				e.preventDefault();
				onApprove();
			} else if (e.key === "Escape") {
				e.preventDefault();
				onReject();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [hitlVisible, compact]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: hitlVisible && proposal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: compact ? false : {
			opacity: 0,
			y: 16
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: 10
		},
		transition: {
			duration: .18,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: cn("absolute z-20 left-1/2 -translate-x-1/2 w-[min(420px,calc(100%-1rem))]", compact ? "bottom-2" : "bottom-4"),
		role: "dialog",
		"aria-modal": "false",
		"aria-label": "Human in the loop approval",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "backdrop-blur-xl bg-cream/90 dark:bg-slate-card/90 border-2 border-charcoal/20 dark:border-cream/15 shadow-brutal p-3 sm:p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.14em] font-semibold text-terracotta",
					children: "Human-in-the-loop"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-serif text-sm sm:text-base font-semibold mt-1 text-charcoal dark:text-cream",
					children: "Approve code change?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-charcoal/60 dark:text-cream/55 mt-1 leading-relaxed line-clamp-2",
					children: [
						proposal.summary,
						" ·",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono",
							children: proposal.path
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						className: "min-h-11 w-full",
						onClick: onApprove,
						"aria-label": "Approve change",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "h-3.5 w-3.5",
							"aria-hidden": true
						}), "Approve"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						variant: "destructive",
						className: "min-h-11 w-full",
						onClick: onReject,
						"aria-label": "Reject change",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							className: "h-3.5 w-3.5",
							"aria-hidden": true
						}), "Reject"]
					})]
				})
			]
		})
	}) });
}
function CenterPanel({ mobile = false }) {
	const files = useFileStore((s) => s.files);
	const activeFilePath = useFileStore((s) => s.activeFilePath);
	const proposal = useFileStore((s) => s.proposal);
	const active = activeFilePath ? files.get(activeFilePath) : void 0;
	const [treeOpen, setTreeOpen] = (0, import_react.useState)(!mobile);
	const showProposal = proposal && (!activeFilePath || proposal.path === activeFilePath || !active);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "h-full flex flex-col sm:flex-row min-h-0 bg-cream dark:bg-slate relative overflow-hidden",
		children: [
			mobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shrink-0 border-b-2 border-charcoal/10 dark:border-cream/10 bg-cream-secondary/60 dark:bg-slate-card/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "w-full flex items-center gap-2 px-3 py-2.5 text-left min-h-[44px]",
					onClick: () => setTreeOpen((v) => !v),
					"aria-expanded": treeOpen,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Files, {
							className: "h-4 w-4 text-terracotta shrink-0",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs truncate flex-1 text-charcoal dark:text-cream",
							children: activeFilePath ?? "Select file"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
							className: cn("h-4 w-4 shrink-0 transition-transform text-charcoal/50 dark:text-cream/45", treeOpen && "rotate-180"),
							"aria-hidden": true
						})
					]
				}), treeOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[40dvh] overflow-y-auto border-t border-charcoal/10 dark:border-cream/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTree, {
						onFileSelect: () => setTreeOpen(false),
						compact: true
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-[min(200px,34%)] shrink-0 min-w-[120px] min-h-0 hidden sm:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTree, {})
			}),
			!mobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sm:hidden shrink-0 border-b border-charcoal/10 max-h-[30%] overflow-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTree, { compact: true })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0 min-h-0 relative flex flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffView, {
					proposal: showProposal ? proposal : null,
					fallbackContent: active?.content ?? "// Select a file",
					language: showProposal ? proposal.language : active?.language ?? "txt"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HitLCard, { compact: mobile })]
			})
		]
	});
}
var FRAMES = {
	mobile: {
		width: 390,
		height: 844,
		label: "iPhone",
		radius: "rounded-[28px]"
	},
	tablet: {
		width: 768,
		height: 1024,
		label: "iPad",
		radius: "rounded-[18px]"
	},
	desktop: {
		width: 1280,
		height: 800,
		label: "Desktop",
		radius: "rounded-md"
	}
};
function DeviceFrame({ device, zoom, children, className }) {
	const frame = FRAMES[device];
	const scale = zoom / 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex items-start justify-center p-4 overflow-auto h-full w-full", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				width: frame.width * scale,
				height: frame.height * scale
			},
			className: "shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("border-2 border-charcoal dark:border-cream/25 bg-white shadow-brutal origin-top-left overflow-hidden", frame.radius, device !== "desktop" && "ring-4 ring-charcoal/10 dark:ring-cream/10"),
				style: {
					width: frame.width,
					height: frame.height,
					transform: `scale(${scale})`,
					transformOrigin: "top left"
				},
				children
			})
		})
	});
}
var devices = [
	{
		id: "mobile",
		icon: Smartphone,
		label: "Mobile"
	},
	{
		id: "tablet",
		icon: Tablet,
		label: "Tablet"
	},
	{
		id: "desktop",
		icon: Monitor,
		label: "Desktop"
	}
];
function RightPanel({ mobile = false }) {
	const files = useFileStore((s) => s.files);
	const device = useUiStore((s) => s.previewDevice);
	const zoom = useUiStore((s) => s.previewZoom);
	const previewKey = useUiStore((s) => s.previewKey);
	const setPreviewDevice = useUiStore((s) => s.setPreviewDevice);
	const setPreviewZoom = useUiStore((s) => s.setPreviewZoom);
	const refreshPreview = useUiStore((s) => s.refreshPreview);
	const contentMap = /* @__PURE__ */ new Map();
	for (const [path, file] of files) contentMap.set(path, file.content);
	const srcDoc = buildPreviewHtml(contentMap, device);
	const openExternal = () => {
		const blob = new Blob([srcDoc], { type: "text/html" });
		const url = URL.createObjectURL(blob);
		window.open(url, "_blank", "noopener,noreferrer");
		setTimeout(() => URL.revokeObjectURL(url), 3e4);
	};
	const effectiveDevice = mobile ? "mobile" : device;
	const effectiveZoom = mobile ? 100 : zoom;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "h-full flex flex-col bg-cream-secondary/40 dark:bg-slate-card/30 min-h-0 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-1.5 px-2 py-2 border-b-2 border-charcoal/10 dark:border-cream/10 shrink-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.12em] font-semibold text-charcoal/50 dark:text-cream/45 mr-1",
					children: "Preview"
				}),
				!mobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex border-2 border-charcoal/15 dark:border-cream/15 overflow-hidden",
					role: "group",
					"aria-label": "Device selector",
					children: devices.map(({ id, icon: Icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setPreviewDevice(id),
						"aria-label": label,
						"aria-pressed": device === id,
						className: cn("h-9 w-9 flex items-center justify-center transition-colors", device === id ? "bg-terracotta text-white" : "bg-cream dark:bg-slate text-charcoal dark:text-cream hover:bg-charcoal/5 dark:hover:bg-cream/5"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "h-3.5 w-3.5",
							"aria-hidden": true
						})
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: "normal-case tracking-normal",
					children: mobile ? "fill" : device
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-0.5",
					children: [
						!mobile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								className: "h-9 w-9",
								"aria-label": "Zoom out",
								onClick: () => setPreviewZoom(zoom - 10),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, {
									className: "h-3.5 w-3.5",
									"aria-hidden": true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] font-mono tabular-nums w-10 text-center text-charcoal/55 dark:text-cream/50",
								children: [zoom, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								className: "h-9 w-9",
								"aria-label": "Zoom in",
								onClick: () => setPreviewZoom(zoom + 10),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, {
									className: "h-3.5 w-3.5",
									"aria-hidden": true
								})
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							className: "h-9 w-9",
							"aria-label": "Refresh preview",
							onClick: refreshPreview,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
								className: "h-3.5 w-3.5",
								"aria-hidden": true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							className: "h-9 w-9",
							"aria-label": "Open preview in new tab",
							onClick: openExternal,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								className: "h-3.5 w-3.5",
								"aria-hidden": true
							})
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 min-h-0 relative bg-white dark:bg-slate",
			children: [mobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				title: "Live project preview",
				srcDoc,
				className: "absolute inset-0 h-full w-full border-0 bg-white",
				sandbox: "allow-scripts allow-same-origin"
			}, previewKey) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceFrame, {
				device: effectiveDevice,
				zoom: effectiveZoom,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: "Live project preview",
					srcDoc,
					className: "h-full w-full border-0 bg-white",
					sandbox: "allow-scripts allow-same-origin"
				}, previewKey)
			}), !mobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-2 right-2 pointer-events-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "default",
					className: "backdrop-blur-sm bg-cream/80 dark:bg-slate-card/80 normal-case tracking-normal shadow-brutal-sm",
					children: "Inspector soon"
				})
			})]
		})]
	});
}
/**
* Mobile (< lg): single full-height pane via Chat | Code | Preview tabs.
* Desktop (≥ lg): classic 3-column resizable IDE.
*/
function ResizableIDE({ className }) {
	const mobilePane = useUiStore((s) => s.mobilePane);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex-1 min-h-0 min-w-0 overflow-hidden relative", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 flex flex-col lg:hidden",
			children: [
				mobilePane === "chat" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full min-h-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeftPanel, {})
				}),
				mobilePane === "code" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full min-h-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CenterPanel, { mobile: true })
				}),
				mobilePane === "preview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full min-h-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RightPanel, { mobile: true })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 hidden lg:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Xt, {
				orientation: "horizontal",
				className: "h-full w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zt, {
						id: "left",
						defaultSize: "22",
						minSize: "15",
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeftPanel, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tn, {
						className: "w-1.5 bg-charcoal/10 dark:bg-cream/10 hover:bg-terracotta/50 active:bg-terracotta transition-colors",
						"aria-label": "Resize left panel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zt, {
						id: "center",
						defaultSize: "45",
						minSize: "20",
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CenterPanel, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tn, {
						className: "w-1.5 bg-charcoal/10 dark:bg-cream/10 hover:bg-terracotta/50 active:bg-terracotta transition-colors",
						"aria-label": "Resize right panel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zt, {
						id: "right",
						defaultSize: "33",
						minSize: "18",
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RightPanel, {})
					})
				]
			})
		})]
	});
}
var tabs = [
	{
		id: "chat",
		label: "Chat",
		icon: MessageSquare
	},
	{
		id: "code",
		label: "Code",
		icon: FileCode2
	},
	{
		id: "preview",
		label: "Preview",
		icon: Eye
	}
];
function MobileTabBar() {
	const mobilePane = useUiStore((s) => s.mobilePane);
	const setMobilePane = useUiStore((s) => s.setMobilePane);
	const hitlVisible = useAgentStore((s) => s.hitlVisible);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "lg:hidden shrink-0 border-t-2 border-charcoal/10 dark:border-cream/10 bg-cream-secondary dark:bg-slate-card",
		"aria-label": "Studio panels",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 h-14 min-h-[56px]",
			children: tabs.map(({ id, label, icon: Icon }) => {
				const active = mobilePane === id;
				const showDot = id === "code" && hitlVisible;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMobilePane(id),
					"aria-current": active ? "page" : void 0,
					"aria-label": label,
					className: cn("relative flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold transition-colors min-h-[44px]", active ? "text-terracotta bg-terracotta/10" : "text-charcoal/55 dark:text-cream/50 active:bg-charcoal/5 dark:active:bg-cream/5"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "h-5 w-5",
							"aria-hidden": true,
							strokeWidth: active ? 2.4 : 2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
						showDot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-1.5 right-[calc(50%-18px)] h-2 w-2 rounded-full bg-terracotta",
							"aria-label": "Awaiting approval"
						}),
						active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-0 inset-x-6 h-0.5 bg-terracotta",
							"aria-hidden": true
						})
					]
				}, id);
			})
		})
	});
}
var ErrorBoundary = class extends import_react.Component {
	state = { error: null };
	static getDerivedStateFromError(error) {
		return { error };
	}
	componentDidCatch(error, info) {
		console.error("[COSY ErrorBoundary]", error, info.componentStack);
	}
	render() {
		if (this.state.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "m-4 border-2 border-charcoal dark:border-cream/20 bg-cream dark:bg-slate-card shadow-brutal p-6 max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.14em] font-semibold text-diff-del-text",
					children: "Something broke"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-xl font-semibold mt-1 text-charcoal dark:text-cream",
					children: this.props.fallbackTitle ?? "Panel error"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-charcoal/65 dark:text-cream/55 mt-2 font-mono break-all",
					children: this.state.error.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					className: "mt-4",
					size: "sm",
					onClick: () => this.setState({ error: null }),
					children: "Try again"
				})
			]
		});
		return this.props.children;
	}
};
function StudioPage() {
	const { projectId } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			projectName: (DEMO_PROJECTS.find((p) => p.id === projectId) ?? DEMO_PROJECTS.find((p) => p.id === "cosy-demo-landing"))?.title ?? "Studio",
			compact: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, {
			fallbackTitle: "IDE crashed",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizableIDE, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomBar, { className: "hidden lg:flex" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileTabBar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sr-only",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/dashboard",
				children: "Back to dashboard"
			})
		})
	] });
}
//#endregion
export { StudioPage as component };
