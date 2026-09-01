import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type AppTopbarProps = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  className?: string;
};

export function AppTopbar({ left, center, right, className }: AppTopbarProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70",
        scrolled ? "border-border shadow-[0_1px_0_hsl(var(--border))] shadow-sm" : "border-border",
        className
      )}
    >
      <div className="page-container grid h-14 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
        <div className="col-start-1 flex min-w-0 items-center gap-2 justify-self-start">{left}</div>
        {center && (
          <nav className="col-start-2 hidden min-w-0 items-center justify-center gap-1 lg:flex" aria-label="Primary">
            {center}
          </nav>
        )}
        <div className="col-start-3 flex min-w-0 items-center justify-end gap-2 justify-self-end">{right}</div>
      </div>
    </header>
  );
}
