import { cn } from "@/lib/utils";
import { type CardColumns } from "@/lib/cv-types";
import { type ListEntry } from "./types";
import { ListCardContent } from "./ListCardContent";
import { ListCardGrid } from "./ListCardGrid";

interface ListGradientBorderCardsProps {
  items: ListEntry[];
  columns?: CardColumns;
}

/** Cards framed by a thin primary→accent gradient outline. */
export const ListGradientBorderCards = ({ items, columns = 1 }: ListGradientBorderCardsProps) => (
  <ListCardGrid
    items={items}
    columns={columns}
    getKey={(e) => e.id}
    render={(e: ListEntry) => (
        <div
        className={cn(
          "relative rounded-lg p-px shadow-card transition-all hover:shadow-glow",
          e.links ? "cv-project-card" : "cv-timeline-card",
        )}
      >
        {/* Soft gradient outline — opacity matched to the badge/pill/chip
            borders so the frame reads light, not heavy. */}
        <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-primary opacity-30" />
        <div className="relative h-full rounded-[calc(var(--radius)-2px)] bg-card">
          <div className={e.links ? "p-3.5" : "p-4"}>
            <ListCardContent entry={e} />
          </div>
        </div>
      </div>
    )}
  />
);