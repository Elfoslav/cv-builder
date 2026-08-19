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
            "rounded-full border border-border py-0.5",
            compact
              ? "bg-background/60 px-2 text-[10px] text-accent"
              : "bg-secondary/50 px-3 text-xs text-foreground",
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};