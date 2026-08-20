import { CVCard } from "@/components/cv/CVCard";
import { cn } from "@/lib/utils";
import { type CardColumns } from "@/lib/cv-types";
import { type ListEntry } from "./types";
import { ListCardContent } from "./ListCardContent";
import { ListCardGrid } from "./ListCardGrid";

interface ListGradientBandCardsProps {
  items: ListEntry[];
  columns?: CardColumns;
}

/** Cards topped with a gradient accent band. */
export const ListGradientBandCards = ({ items, columns = 1 }: ListGradientBandCardsProps) => (
  <ListCardGrid
    items={items}
    columns={columns}
    render={(e: ListEntry) => (
      <CVCard
        className={cn(
          "relative flex flex-col overflow-hidden",
          e.links ? "cv-project-card p-3.5 pt-4" : "cv-timeline-card p-4 pt-4",
        )}
      >
        <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-primary" />
        <ListCardContent entry={e} />
      </CVCard>
    )}
  />
);