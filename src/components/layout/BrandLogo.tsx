import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/app";

/**
 * The app's home link for topbars: the "CR" gradient badge plus the app name.
 * Shared across every topbar (homepage, themes, builder) so the mark stays
 * identical. Props cover the small per-page differences:
 * - `nameClass`  — responsive visibility of the full name (default sm+).
 * - `shortName`  — optional compact label shown where the full name is hidden.
 * - `beta`       — show the "Beta" chip (homepage).
 */
export function BrandLogo({
  className,
  title,
  nameClass = "hidden sm:inline",
  shortName,
  beta = false,
}: {
  className?: string;
  title?: string;
  nameClass?: string;
  shortName?: string;
  beta?: boolean;
}) {
  return (
    <Link to="/" title={title} className={cn("flex shrink-0 items-center gap-2 font-semibold", className)}>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-primary text-[11px] font-bold tracking-tight text-primary-foreground shadow-sm">
        CR
      </span>
      <span className={cn("whitespace-nowrap text-sm font-semibold", nameClass)}>{APP_NAME}</span>
      {shortName && <span className="text-sm font-semibold sm:hidden">{shortName}</span>}
      {beta && (
        <span className="hidden rounded-full border bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:inline-flex">
          Beta
        </span>
      )}
    </Link>
  );
}
