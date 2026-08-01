import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("[COSY ErrorBoundary]", error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.error) {
      return (
        <div className="m-4 border-2 border-charcoal dark:border-cream/20 bg-cream dark:bg-slate-card shadow-brutal p-6 max-w-lg">
          <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-diff-del-text">
            Something broke
          </p>
          <h2 className="font-serif text-xl font-semibold mt-1 text-charcoal dark:text-cream">
            {this.props.fallbackTitle ?? "Panel error"}
          </h2>
          <p className="text-sm text-charcoal/65 dark:text-cream/55 mt-2 font-mono break-all">
            {this.state.error.message}
          </p>
          <Button
            type="button"
            className="mt-4"
            size="sm"
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
