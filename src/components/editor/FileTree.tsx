import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FileCode2,
  FileJson,
  FileText,
  Folder,
  FolderOpen,
  Plus,
  Trash2,
} from "lucide-react";
import { useFileStore } from "@/stores/use-file-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FileNode, ProjectFile } from "@/types/file";
import { cn } from "@/lib/utils";

function buildTree(files: Map<string, ProjectFile>): FileNode[] {
  const root: FileNode[] = [];
  const folderMap = new Map<string, FileNode>();

  const ensureFolder = (parts: string[]): FileNode => {
    let path = "";
    let parentChildren = root;
    let node: FileNode | undefined;
    for (const part of parts) {
      path = path ? `${path}/${part}` : part;
      node = folderMap.get(path);
      if (!node) {
        node = {
          id: `folder-${path}`,
          name: part,
          path,
          type: "folder",
          children: [],
        };
        folderMap.set(path, node);
        parentChildren.push(node);
      }
      parentChildren = node.children ?? [];
    }
    return node!;
  };

  const sorted = [...files.values()].sort((a, b) =>
    a.path.localeCompare(b.path),
  );

  for (const file of sorted) {
    const parts = file.path.split("/");
    const name = parts[parts.length - 1] ?? file.path;
    const folderParts = parts.slice(0, -1);
    const target =
      folderParts.length > 0 ? ensureFolder(folderParts).children! : root;
    target.push({
      id: file.id,
      name,
      path: file.path,
      type: "file",
      language: file.language,
    });
  }

  const sortNodes = (nodes: FileNode[]) => {
    nodes.sort((a, b) => {
      if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    for (const n of nodes) {
      if (n.children) sortNodes(n.children);
    }
  };
  sortNodes(root);
  return root;
}

function FileIcon({ node }: { node: FileNode }): React.JSX.Element {
  if (node.type === "folder")
    return <Folder className="h-3.5 w-3.5" aria-hidden />;
  if (node.language === "json")
    return <FileJson className="h-3.5 w-3.5" aria-hidden />;
  if (
    node.language === "tsx" ||
    node.language === "ts" ||
    node.language === "css"
  ) {
    return <FileCode2 className="h-3.5 w-3.5" aria-hidden />;
  }
  return <FileText className="h-3.5 w-3.5" aria-hidden />;
}

function TreeNode({
  node,
  depth,
  onFileSelect,
}: {
  node: FileNode;
  depth: number;
  onFileSelect?: (() => void) | undefined;
}): React.JSX.Element {
  const activeFilePath = useFileStore((s) => s.activeFilePath);
  const setActiveFile = useFileStore((s) => s.setActiveFile);
  const deleteFile = useFileStore((s) => s.deleteFile);
  const [open, setOpen] = useState(true);
  const isActive = activeFilePath === node.path;

  if (node.type === "folder") {
    return (
      <div>
        <button
          type="button"
          className="flex w-full items-center gap-1 px-1.5 py-1.5 text-left text-xs hover:bg-charcoal/5 dark:hover:bg-cream/5 min-h-[36px]"
          style={{ paddingLeft: 6 + depth * 12 }}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? (
            <ChevronDown className="h-3 w-3 shrink-0" aria-hidden />
          ) : (
            <ChevronRight className="h-3 w-3 shrink-0" aria-hidden />
          )}
          {open ? (
            <FolderOpen
              className="h-3.5 w-3.5 text-terracotta shrink-0"
              aria-hidden
            />
          ) : (
            <Folder
              className="h-3.5 w-3.5 text-terracotta shrink-0"
              aria-hidden
            />
          )}
          <span className="truncate font-medium">{node.name}</span>
        </button>
        {open &&
          node.children?.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              onFileSelect={onFileSelect}
            />
          ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-1 pr-1 text-xs",
        isActive && "bg-terracotta/15 dark:bg-terracotta/20",
      )}
      style={{ paddingLeft: 6 + depth * 12 }}
    >
      <button
        type="button"
        className="flex min-w-0 flex-1 items-center gap-1.5 py-1.5 text-left hover:bg-charcoal/5 dark:hover:bg-cream/5 min-h-[40px]"
        onClick={() => {
          setActiveFile(node.path);
          onFileSelect?.();
        }}
        aria-current={isActive ? "page" : undefined}
      >
        <FileIcon node={node} />
        <span className="truncate">{node.name}</span>
      </button>
      <button
        type="button"
        className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 p-2 text-charcoal/50 hover:text-diff-del-text min-h-[40px] min-w-[40px] flex items-center justify-center"
        aria-label={`Delete ${node.path}`}
        onClick={() => deleteFile(node.path)}
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}

export function FileTree({
  onFileSelect,
  compact = false,
}: {
  onFileSelect?: (() => void) | undefined;
  compact?: boolean;
}): React.JSX.Element {
  const files = useFileStore((s) => s.files);
  const createFile = useFileStore((s) => s.createFile);
  const [creating, setCreating] = useState(false);
  const [newPath, setNewPath] = useState("");
  const tree = useMemo(() => buildTree(files), [files]);

  return (
    <div
      className={cn(
        "h-full flex flex-col border-r-2 border-charcoal/10 dark:border-cream/10 bg-cream-secondary/50 dark:bg-slate-card/40 min-w-0",
        compact && "border-r-0",
      )}
    >
      <div className="flex items-center justify-between gap-1 px-2 py-2 border-b border-charcoal/10 dark:border-cream/10">
        <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-charcoal/50 dark:text-cream/45">
          Files
        </p>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          aria-label="New file"
          onClick={() => setCreating(true)}
        >
          <Plus className="h-3.5 w-3.5" aria-hidden />
        </Button>
      </div>
      {creating && (
        <form
          className="p-2 border-b border-charcoal/10 dark:border-cream/10 space-y-1"
          onSubmit={(e) => {
            e.preventDefault();
            const path = newPath.trim();
            if (path) {
              createFile(path, "");
              setNewPath("");
              setCreating(false);
              onFileSelect?.();
            }
          }}
        >
          <Input
            value={newPath}
            onChange={(e) => setNewPath(e.target.value)}
            placeholder="path/to/file.tsx"
            aria-label="New file path"
            className="h-10 text-xs shadow-none"
            autoFocus
          />
          <div className="flex gap-1">
            <Button type="submit" size="sm" className="h-9 text-xs flex-1">
              Create
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-9 text-xs"
              onClick={() => {
                setCreating(false);
                setNewPath("");
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
      <div className="flex-1 overflow-y-auto py-1 overscroll-contain">
        {tree.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            depth={0}
            onFileSelect={onFileSelect}
          />
        ))}
      </div>
    </div>
  );
}
