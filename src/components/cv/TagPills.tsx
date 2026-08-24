import { cn } from "@/lib/utils";

interface TagPillsProps {
  tags: string[];
  /** Compact pills for tight layouts (projects): smaller text, no top margin. */
  compact?: boolean;
}

export const TagPills = ({ tags, compact = false }: TagPillsProps) => {
  if (tags.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap", compact ? "gap-1" : "mt-4 gap-2")}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={cn(
            "rounded-full border border-primary py-0.5 bg-primary/5 text-primary",
            compact
              ? "px-2 text-[10px]"
              : "px-3 text-xs",
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};