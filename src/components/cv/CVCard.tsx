import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CVCardProps {
  children: ReactNode;
  /** flat = low-contrast print-friendly surface; otherwise gradient + shadow. */
  tone?: "gradient" | "flat";
  /** Adds a gradient accent bar along the left edge. */
  accent?: boolean;
  className?: string;
}

export const CVCard = ({ children, tone = "gradient", accent = false, className }: CVCardProps) => (
  <div
    className={cn(
      "rounded-md border border-border",
      tone === "flat" ? "bg-card" : "bg-gradient-card shadow-card",
      accent && "relative overflow-hidden pl-5",
      className,
    )}
  >
    {accent && <span className="absolute inset-y-0 left-0 w-1 bg-gradient-primary" />}
    {children}
  </div>
);