import { CVCard } from "@/components/cv/CVCard";
import { cn } from "@/lib/utils";
import { type ListEntry } from "./types";
import { ListCardContent } from "./ListCardContent";

interface ListCardsProps {
  items: ListEntry[];
  /** Stack full-width cards vertically (experience/education); default is a 2-col grid (projects). */
  stacked?: boolean;
}

/** Gradient cards — the default card look for every list section. */
export const ListCards = ({ items, stacked = false }: ListCardsProps) => (
  <div className={cn(stacked ? "space-y-4" : "grid gap-2 md:grid-cols-2 print-grid-2-tight")}>
    {items.map((e) => {
      const withLinks = Boolean(e.links);
      return (
        <CVCard
          key={e.id}
          className={cn(
            "flex flex-col",
            withLinks
              ? "cv-project-card group p-3.5 transition-all hover:border-primary/50 hover:shadow-glow"
              : "cv-timeline-card p-4",
          )}
        >
          {withLinks && (
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          )}
          <ListCardContent entry={e} />
        </CVCard>
      );
    })}
  </div>
);