import { create } from "zustand";
import type { DiffProposal, FileLanguage, ProjectFile } from "@/types/file";
import {
  DEMO_FILES,
  DEMO_PROJECT_ID,
  DEMO_PROPOSAL_MODIFIED,
} from "@/lib/demo-data";

interface FileState {
  projectId: string;
  files: Map<string, ProjectFile>;
  activeFilePath: string | null;
  proposal: DiffProposal | null;
  setProject: (projectId: string, files: ProjectFile[]) => void;
  setActiveFile: (path: string) => void;
  updateContent: (path: string, content: string) => void;
  createFile: (path: string, content?: string, language?: FileLanguage) => void;
  deleteFile: (path: string) => void;
  renameFile: (oldPath: string, newPath: string) => void;
  setProposal: (proposal: DiffProposal | null) => void;
  applyProposal: () => void;
  getContentMap: () => Map<string, string>;
}

function guessLanguage(path: string): FileLanguage {
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

function filesToMap(list: ProjectFile[]): Map<string, ProjectFile> {
  return new Map(list.map((f) => [f.path, f]));
}

const initialFiles = filesToMap(DEMO_FILES);
const appFile = initialFiles.get("src/App.tsx");

export const useFileStore = create<FileState>((set, get) => ({
  projectId: DEMO_PROJECT_ID,
  files: initialFiles,
  activeFilePath: "src/App.tsx",
  proposal: appFile
    ? {
        path: "src/App.tsx",
        original: appFile.content,
        modified: DEMO_PROPOSAL_MODIFIED,
        language: "tsx",
        summary: "Rewrite hero copy and add dual CTAs for HitL demo",
      }
    : null,

  setProject: (projectId, files) =>
    set({
      projectId,
      files: filesToMap(files),
      activeFilePath: files[0]?.path ?? null,
      proposal: null,
    }),

  setActiveFile: (path) => set({ activeFilePath: path }),

  updateContent: (path, content) =>
    set((state) => {
      const existing = state.files.get(path);
      if (!existing) return state;
      const next = new Map(state.files);
      next.set(path, {
        ...existing,
        content,
        version: existing.version + 1,
      });
      return { files: next };
    }),

  createFile: (path, content = "", language) =>
    set((state) => {
      if (state.files.has(path)) return state;
      const next = new Map(state.files);
      next.set(path, {
        id: `file-${crypto.randomUUID()}`,
        path,
        content,
        language: language ?? guessLanguage(path),
        version: 1,
      });
      return { files: next, activeFilePath: path };
    }),

  deleteFile: (path) =>
    set((state) => {
      if (!state.files.has(path)) return state;
      const next = new Map(state.files);
      next.delete(path);
      const activeFilePath =
        state.activeFilePath === path
          ? ([...next.keys()][0] ?? null)
          : state.activeFilePath;
      return { files: next, activeFilePath };
    }),

  renameFile: (oldPath, newPath) =>
    set((state) => {
      const existing = state.files.get(oldPath);
      if (!existing || state.files.has(newPath)) return state;
      const next = new Map(state.files);
      next.delete(oldPath);
      next.set(newPath, {
        ...existing,
        path: newPath,
        language: guessLanguage(newPath),
      });
      return {
        files: next,
        activeFilePath:
          state.activeFilePath === oldPath ? newPath : state.activeFilePath,
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
    const map = new Map<string, string>();
    for (const [path, file] of get().files) {
      map.set(path, file.content);
    }
    return map;
  },
}));
