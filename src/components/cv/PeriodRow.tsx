import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PeriodRowProps {
  period: string;
  children: ReactNode;
  className?: string;
}

/** Two-column row with a fixed-width period column on the left (for print-safe alignment). */
export const PeriodRow = ({ period, children, className }: PeriodRowProps) => (
  <div
    className={cn(
      "grid grid-cols-1 gap-1 border-b border-border py-4 last:border-0 md:grid-cols-[8rem_1fr] print:grid-cols-[8rem_1fr]",
      className,
    )}
  >
    <div className="pt-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">{period}</div>
    <div>{children}</div>
  </div>
);