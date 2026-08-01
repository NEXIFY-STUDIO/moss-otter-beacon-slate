import { create } from "zustand";
import type {
  DiffFileChange,
  DiffProposal,
  FileLanguage,
  ProjectFile,
} from "@/types/file";
import {
  DEMO_FILES,
  DEMO_PROJECT_ID,
  DEMO_PROPOSAL_MODIFIED,
} from "@/lib/demo-data";
import { parseProjectPath } from "@/lib/validations/file-path";
import { applyHunkAt } from "@/lib/diff";

export type FileStoreError = {
  code: "invalid_path" | "duplicate" | "not_found";
  message: string;
};

interface FileState {
  projectId: string;
  files: Map<string, ProjectFile>;
  activeFilePath: string | null;
  proposal: DiffProposal | null;
  lastError: FileStoreError | null;
  setProject: (projectId: string, files: ProjectFile[]) => void;
  setActiveFile: (path: string) => void;
  updateContent: (path: string, content: string) => void;
  upsertFile: (path: string, content: string, language?: FileLanguage) => void;
  createFile: (
    path: string,
    content?: string,
    language?: FileLanguage,
  ) => FileStoreError | null;
  deleteFile: (path: string) => FileStoreError | null;
  renameFile: (oldPath: string, newPath: string) => FileStoreError | null;
  setProposal: (proposal: DiffProposal | null) => void;
  setProposalFromCodeMap: (
    files: { path: string; content: string; language: FileLanguage }[],
    originals: Map<string, string>,
    summary: string,
  ) => void;
  applyProposal: () => void;
  rejectProposal: () => void;
  applyHunk: (lineIndex: number) => void;
  clearError: () => void;
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
        summary: "Rewrite hero + dual CTAs (demo single-file)",
      }
    : null,
  lastError: null,

  setProject: (projectId, files) =>
    set({
      projectId,
      files: filesToMap(files),
      activeFilePath: files[0]?.path ?? null,
      proposal: null,
      lastError: null,
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

  upsertFile: (path, content, language) => {
    const parsed = parseProjectPath(path);
    if (!parsed.ok) {
      set({
        lastError: { code: "invalid_path", message: parsed.error },
      });
      return;
    }
    set((state) => {
      const next = new Map(state.files);
      const existing = next.get(parsed.path);
      if (existing) {
        next.set(parsed.path, {
          ...existing,
          content,
          version: existing.version + 1,
          language: language ?? existing.language,
        });
      } else {
        next.set(parsed.path, {
          id: `file-${crypto.randomUUID()}`,
          path: parsed.path,
          content,
          language: language ?? guessLanguage(parsed.path),
          version: 1,
        });
      }
      return { files: next, lastError: null };
    });
  },

  createFile: (path, content = "", language) => {
    const parsed = parseProjectPath(path);
    if (!parsed.ok) {
      const err: FileStoreError = {
        code: "invalid_path",
        message: parsed.error,
      };
      set({ lastError: err });
      return err;
    }
    const { files } = get();
    if (files.has(parsed.path)) {
      const err: FileStoreError = {
        code: "duplicate",
        message: `File already exists: ${parsed.path}`,
      };
      set({ lastError: err });
      return err;
    }
    const next = new Map(files);
    next.set(parsed.path, {
      id: `file-${crypto.randomUUID()}`,
      path: parsed.path,
      content,
      language: language ?? guessLanguage(parsed.path),
      version: 1,
    });
    set({ files: next, activeFilePath: parsed.path, lastError: null });
    return null;
  },

  deleteFile: (path) => {
    const { files, activeFilePath, proposal } = get();
    if (!files.has(path)) {
      const err: FileStoreError = {
        code: "not_found",
        message: `File not found: ${path}`,
      };
      set({ lastError: err });
      return err;
    }
    const next = new Map(files);
    next.delete(path);
    const nextActive =
      activeFilePath === path ? ([...next.keys()][0] ?? null) : activeFilePath;
    const nextProposal = proposal?.path === path ? null : proposal;
    set({
      files: next,
      activeFilePath: nextActive,
      proposal: nextProposal,
      lastError: null,
    });
    return null;
  },

  renameFile: (oldPath, newPath) => {
    const parsed = parseProjectPath(newPath);
    if (!parsed.ok) {
      const err: FileStoreError = {
        code: "invalid_path",
        message: parsed.error,
      };
      set({ lastError: err });
      return err;
    }
    const { files, activeFilePath, proposal } = get();
    const existing = files.get(oldPath);
    if (!existing) {
      const err: FileStoreError = {
        code: "not_found",
        message: `File not found: ${oldPath}`,
      };
      set({ lastError: err });
      return err;
    }
    if (files.has(parsed.path) && parsed.path !== oldPath) {
      const err: FileStoreError = {
        code: "duplicate",
        message: `File already exists: ${parsed.path}`,
      };
      set({ lastError: err });
      return err;
    }
    const next = new Map(files);
    next.delete(oldPath);
    next.set(parsed.path, {
      ...existing,
      path: parsed.path,
      language: guessLanguage(parsed.path),
    });
    set({
      files: next,
      activeFilePath: activeFilePath === oldPath ? parsed.path : activeFilePath,
      proposal:
        proposal?.path === oldPath
          ? { ...proposal, path: parsed.path }
          : proposal,
      lastError: null,
    });
    return null;
  },

  setProposal: (proposal) => set({ proposal }),

  setProposalFromCodeMap: (files, originals, summary) => {
    if (files.length === 0) {
      set({ proposal: null });
      return;
    }
    const primary =
      files.find((f) => f.path === "src/App.tsx") ??
      files.find((f) => f.path === "index.html") ??
      files[0];
    if (!primary) {
      set({ proposal: null });
      return;
    }
    const batch: DiffFileChange[] = files
      .filter((f) => f.path !== primary.path)
      .map((f) => ({
        path: f.path,
        original: originals.get(f.path) ?? "",
        modified: f.content,
        language: f.language,
      }));
    set({
      proposal: {
        path: primary.path,
        original: originals.get(primary.path) ?? "",
        modified: primary.content,
        language: primary.language,
        summary,
        batch,
      },
      activeFilePath: primary.path,
    });
  },

  applyProposal: () => {
    const { proposal, files } = get();
    if (!proposal) return;
    const all = [
      {
        path: proposal.path,
        content: proposal.modified,
        language: proposal.language,
      },
      ...(proposal.batch ?? []).map((b) => ({
        path: b.path,
        content: b.modified,
        language: b.language,
      })),
    ];
    const next = new Map(files);
    for (const item of all) {
      const parsed = parseProjectPath(item.path);
      if (!parsed.ok) continue;
      const existing = next.get(parsed.path);
      if (existing) {
        next.set(parsed.path, {
          ...existing,
          content: item.content,
          language: item.language,
          version: existing.version + 1,
        });
      } else {
        next.set(parsed.path, {
          id: `file-${crypto.randomUUID()}`,
          path: parsed.path,
          content: item.content,
          language: item.language,
          version: 1,
        });
      }
    }
    set({ files: next, proposal: null, lastError: null });
  },

  rejectProposal: () => {
    set({ proposal: null });
  },

  applyHunk: (lineIndex) => {
    const { proposal } = get();
    if (!proposal) return;
    const next = applyHunkAt(proposal.original, proposal.modified, lineIndex);
    if (!next) return;
    if (next.original === next.modified) {
      get().updateContent(proposal.path, next.modified);
      set({ proposal: null });
      return;
    }
    set({
      proposal: {
        ...proposal,
        original: next.original,
        modified: next.modified,
        summary: `${proposal.summary} · partial hunk`,
      },
    });
  },

  clearError: () => set({ lastError: null }),

  getContentMap: () => {
    const map = new Map<string, string>();
    for (const [path, file] of get().files) {
      map.set(path, file.content);
    }
    return map;
  },
}));
