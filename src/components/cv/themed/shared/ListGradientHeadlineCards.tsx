import { CVCard } from "@/components/cv/CVCard";
import { cn } from "@/lib/utils";
import { type CardColumns } from "@/lib/cv-types";
import { type ListEntry } from "./types";
import { ListCardContent } from "./ListCardContent";
import { ListCardGrid } from "./ListCardGrid";

interface ListGradientHeadlineCardsProps {
  items: ListEntry[];
  columns?: CardColumns;
}

/** Flat print-friendly cards whose headings are set in gradient text. */
export const ListGradientHeadlineCards = ({ items, columns = 1 }: ListGradientHeadlineCardsProps) => (
  <ListCardGrid
    items={items}
    columns={columns}
    getKey={(e) => e.id}
    render={(e: ListEntry) => (
      <CVCard
        tone="flat"
        className={cn("flex flex-col", e.links ? "cv-project-card p-3.5" : "cv-timeline-card p-4")}
      >
        <ListCardContent entry={e} titleClass="text-gradient-primary" />
      </CVCard>
    )}
  />
);