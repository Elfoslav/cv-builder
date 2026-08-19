import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Grid container that makes all PeriodRow children share identical column tracks —
 * the date column auto-sizes to the widest date across the whole list. */
export const PeriodList = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-[max-content_1fr] print:grid-cols-[max-content_1fr]", className)}>
    {children}
  </div>
);

interface PeriodRowProps {
  period: string;
  children: ReactNode;
  className?: string;
}

/** A bordered row with a date column on the left. Must be a direct child of PeriodList:
 * on wide screens it uses `subgrid` so the date track is shared across every row. */
export const PeriodRow = ({ period, children, className }: PeriodRowProps) => (
  <div
    className={cn(
      "grid grid-cols-1 gap-1 border-b border-border py-4 last:border-0",
      "md:col-span-2 md:grid-cols-subgrid md:gap-x-1 md:gap-y-0",
      "print:col-span-2 print:grid-cols-subgrid print:gap-x-1 print:gap-y-0",
      className,
    )}
  >
    <div className="whitespace-nowrap pt-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">{period}</div>
    <div className="min-w-0">{children}</div>
  </div>
);