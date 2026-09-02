import { type Hobby } from "@/lib/cv-types";
import { ICON_MAP } from "@/components/cv/cv-utils";
import { cn } from "@/lib/utils";

interface HobbyCardContentProps {
  hobby: Hobby;
  /** Horizontal icon-badge + label layout (flat / accent tiles) instead of stacked. */
  horizontal?: boolean;
  /** Extra classes for the label, e.g. gradient-text headings. */
  labelClass?: string;
}

/**
 * Icon + label body shared by every hobby card variant. The card chrome
 * (border, band, accent bar) is applied by the parent variant.
 */
export const HobbyCardContent = ({ hobby, horizontal = false, labelClass }: HobbyCardContentProps) => {
  const Icon = ICON_MAP[hobby.icon] ?? ICON_MAP.Code2;
  if (horizontal) {
    return (
      <span className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <span className={cn("min-w-0 break-words text-sm text-foreground", labelClass)}>{hobby.label}</span>
      </span>
    );
  }
  return (
    <span className="flex flex-col items-center gap-3 text-center">
      <Icon className="h-7 w-7 text-primary" />
      <span className={cn("break-words text-xs text-muted-foreground", labelClass)}>{hobby.label}</span>
    </span>
  );
};