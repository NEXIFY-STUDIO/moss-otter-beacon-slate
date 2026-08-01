export type FileLanguage =
  | "tsx"
  | "ts"
  | "jsx"
  | "js"
  | "css"
  | "json"
  | "html"
  | "md"
  | "txt";

export interface ProjectFile {
  id: string;
  path: string;
  content: string;
  language: FileLanguage;
  version: number;
}

export interface FileNode {
  id: string;
  name: string;
  path: string;
  type: "file" | "folder";
  language?: FileLanguage;
  children?: FileNode[];
}

export interface DiffFileChange {
  path: string;
  original: string;
  modified: string;
  language: FileLanguage;
}

export interface DiffProposal {
  path: string;
  original: string;
  modified: string;
  language: FileLanguage;
  summary: string;
  /** Extra files in this multi-page proposal (applied together on Approve). */
  batch?: DiffFileChange[];
}
