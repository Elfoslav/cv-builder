import { CVCard } from "@/components/cv/CVCard";
import { cn } from "@/lib/utils";
import { type ListEntry } from "./types";
import { ListCardContent } from "./ListCardContent";

interface ListAccentCardsProps {
  items: ListEntry[];
  /** Stack full-width cards vertically (experience/education); default is a 2-col grid (projects). */
  stacked?: boolean;
}

/** Cards with a colored gradient accent bar along the left edge. */
export const ListAccentCards = ({ items, stacked = false }: ListAccentCardsProps) => (
  <div className={cn(stacked ? "space-y-3" : "grid gap-2 md:grid-cols-2 print-grid-2-tight")}>
    {items.map((e) => (
      <CVCard
        key={e.id}
        accent
        className={cn("flex flex-col", e.links ? "cv-project-card p-3.5" : "cv-timeline-card p-4")}
      >
        <ListCardContent entry={e} />
      </CVCard>
    ))}
  </div>
);