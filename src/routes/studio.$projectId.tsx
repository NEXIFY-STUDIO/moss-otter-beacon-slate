import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/layout/TopBar";
import { BottomBar } from "@/components/layout/BottomBar";
import { ResizableIDE } from "@/components/layout/ResizableIDE";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { AppShell } from "@/components/layout/AppShell";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { DEMO_PROJECTS, DEMO_PROJECT_ID } from "@/lib/demo-data";

export const Route = createFileRoute("/studio/$projectId")({
  component: StudioPage,
});

function StudioPage() {
  const { projectId } = Route.useParams();
  const project =
    DEMO_PROJECTS.find((p) => p.id === projectId) ??
    DEMO_PROJECTS.find((p) => p.id === DEMO_PROJECT_ID);

  return (
    <AppShell>
      <TopBar projectName={project?.title ?? "Studio"} compact />
      <ErrorBoundary fallbackTitle="IDE crashed">
        <ResizableIDE />
      </ErrorBoundary>
      {/* Desktop status strip */}
      <BottomBar className="hidden lg:flex" />
      {/* iPhone / mobile: primary navigation between panes */}
      <MobileTabBar />
      <div className="sr-only">
        <Link to="/dashboard">Back to dashboard</Link>
      </div>
    </AppShell>
  );
}
