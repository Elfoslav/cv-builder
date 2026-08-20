import { CVCard } from "@/components/cv/CVCard";
import { cn } from "@/lib/utils";
import { type CardColumns } from "@/lib/cv-types";
import { type ListEntry } from "./types";
import { ListCardContent } from "./ListCardContent";
import { ListCardGrid } from "./ListCardGrid";

interface ListGradientSoftCardsProps {
  items: ListEntry[];
  columns?: CardColumns;
}

/** Soft gradient cards — the default card look for every list section. */
export const ListGradientSoftCards = ({ items, columns = 1 }: ListGradientSoftCardsProps) => (
  <ListCardGrid
    items={items}
    columns={columns}
    render={(e: ListEntry) => (
      <CVCard
        tone="gradient"
        className={cn(
          "flex flex-col rounded-lg transition-all hover:shadow-card",
          e.links ? "cv-project-card p-3.5" : "cv-timeline-card p-4",
        )}
      >
        <ListCardContent entry={e} />
      </CVCard>
    )}
  />
);