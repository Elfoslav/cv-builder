import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AppTopbarProps = {
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
};

export function AppTopbar({ left, right, className }: AppTopbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className="page-container flex h-14 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2">{left}</div>
        <div className="flex shrink-0 items-center gap-2">{right}</div>
      </div>
    </header>
  );
}
