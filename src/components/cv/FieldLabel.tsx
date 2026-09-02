import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small uppercase field label used above editor selects, e.g. "Section design". */
export const FieldLabel = ({ label, className }: { label: ReactNode; className?: string }) => (
  <div
    className={cn(
      "mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
      className,
    )}
  >
    {label}
  </div>
);