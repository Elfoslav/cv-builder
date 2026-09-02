import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}
interface State {
  error: Error | null;
}

/**
 * App-level error boundary. Without one, any render error blanks the whole
 * page. This shows a recoverable fallback and reassures the user their data is
 * safe in the browser (it lives in localStorage, untouched by a render crash).
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[app] Uncaught render error:", error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-card">
          <h1 className="text-xl font-bold tracking-tight">Something went wrong</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The page hit an unexpected error. Your CV is saved in this browser and hasn&apos;t been lost — reloading usually
            fixes it.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={() => window.location.reload()}>Reload page</Button>
            <Button variant="outline" onClick={() => this.setState({ error: null })}>
              Try again
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
