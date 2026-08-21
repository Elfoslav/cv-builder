import { CVCard } from "@/components/cv/CVCard";
import { cn } from "@/lib/utils";
import { type CardColumns } from "@/lib/cv-types";
import { cardGridClass } from "@/components/cv/cv-utils";
import { type ListEntry } from "./types";
import { ListCardContent } from "./ListCardContent";

interface ListAccentCardsProps {
  items: ListEntry[];
  /** Number of columns for the card grid; 1 stacks the cards. */
  columns?: CardColumns;
}

/** Cards with a colored gradient accent bar along the left edge. */
export const ListAccentCards = ({ items, columns = 1 }: ListAccentCardsProps) => (
  <div className={cardGridClass(columns, "space-y-3")}>
    {items.map((e) => (
      <div key={e.id} className="page-gutter">
        <CVCard
          accent
          className={cn("flex flex-col", e.links ? "cv-project-card p-3.5" : "cv-timeline-card p-4")}
        >
          <ListCardContent entry={e} />
        </CVCard>
      </div>
    ))}
  </div>
);