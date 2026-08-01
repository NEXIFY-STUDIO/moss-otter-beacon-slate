import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FolderKanban, Plus } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { AppBottomNav } from "@/components/layout/AppBottomNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DEMO_PROJECTS, DEMO_PROJECT_ID } from "@/lib/demo-data";
import { createProject } from "@/lib/projects/server";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user, isPending } = useCurrentUserState();
  const [creating, setCreating] = useState(false);

  const onNew = async () => {
    if (isPending) return;
    if (!user) {
      toast.error("Sign in required to create a project");
      return;
    }
    setCreating(true);
    try {
      const res = await createProject({
        data: {
          title: "New COSY project",
          description: "Created from dashboard",
          isPublic: false,
        },
      });
      toast.success(`Project created: ${res.id.slice(0, 8)}…`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Create failed";
      if (msg === "Unauthorized" || /Unauthorized/i.test(msg)) {
        toast.error("Unauthorized — sign in to create projects");
      } else {
        toast.error(msg);
      }
    } finally {
      setCreating(false);
    }
  };

  return (
    <AppShell className="bg-black text-white">
      <header className="shrink-0 border-b border-white/10 px-4 py-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-terracotta">
            Workspace
          </p>
          <h1 className="font-serif text-xl sm:text-2xl font-semibold text-white">
            Dashboard
          </h1>
        </div>
        <Button
          size="sm"
          className="min-h-11 shrink-0 rounded-xl border-0"
          onClick={() => void onNew()}
          disabled={creating}
          aria-label="Create new project"
        >
          <Plus className="h-4 w-4" aria-hidden />
          {creating ? "Creating…" : "New"}
        </Button>
      </header>
      <main className="app-scroll">
        <div className="mx-auto max-w-lg sm:max-w-3xl px-4 py-5 space-y-3 pb-8">
          {!user && !isPending ? (
            <p className="text-xs text-white/45 rounded-xl border border-white/10 px-3 py-2">
              Demo projects below.{" "}
              <Link to="/login" className="text-terracotta font-semibold">
                Sign in
              </Link>{" "}
              for server-owned CRUD.
            </p>
          ) : null}
          {DEMO_PROJECTS.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl border border-white/[0.06] bg-[#121214] p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3 min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta/15 text-terracotta">
                  <FolderKanban className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-semibold text-white text-sm">
                      {project.title}
                    </h2>
                    {project.isPublic ? (
                      <Badge variant="success" className="normal-case tracking-normal">
                        Public
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="normal-case tracking-normal border-white/15 text-white/70"
                      >
                        Private
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-white/45 mt-1 leading-relaxed">
                    {project.description}
                  </p>
                  <p className="text-[11px] text-white/30 font-mono mt-1.5">
                    {project.fileCount} files · {project.lastAgent ?? "—"}
                  </p>
                </div>
              </div>
              <Link
                to="/studio/$projectId"
                params={{
                  projectId:
                    project.id === DEMO_PROJECTS[0]?.id
                      ? DEMO_PROJECT_ID
                      : project.id,
                }}
                className={cn(
                  "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-4",
                  "bg-terracotta text-white text-sm font-semibold shrink-0",
                  "active:scale-[0.98] transition-transform",
                )}
              >
                Open
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </main>
      <AppBottomNav />
    </AppShell>
  );
}
