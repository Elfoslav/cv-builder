import { CVCard } from "@/components/cv/CVCard";
import { cn } from "@/lib/utils";
import { type CardColumns } from "@/lib/cv-types";
import { type ListEntry } from "./types";
import { ListCardContent } from "./ListCardContent";
import { ListCardGrid } from "./ListCardGrid";

interface ListGradientCornerCardsProps {
  items: ListEntry[];
  columns?: CardColumns;
}

/** Cards with a soft gradient glow rising from one corner. */
export const ListGradientCornerCards = ({ items, columns = 1 }: ListGradientCornerCardsProps) => (
  <ListCardGrid
    items={items}
    columns={columns}
    render={(e: ListEntry) => (
      <CVCard
        className={cn(
          "relative flex flex-col overflow-hidden",
          e.links ? "cv-project-card p-3.5" : "cv-timeline-card p-4",
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rotate-45 bg-gradient-primary/20 blur-sm"
        />
        <ListCardContent entry={e} />
      </CVCard>
    )}
  />
);