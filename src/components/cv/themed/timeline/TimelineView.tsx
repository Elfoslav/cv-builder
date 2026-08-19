import { type ListLayout } from "@/lib/section-designs";
import { type CardColumns } from "@/lib/cv-types";
import { type ListEntry } from "@/components/cv/themed/shared/types";
import { ListCards } from "@/components/cv/themed/shared/ListCards";
import { ListFlatCards } from "@/components/cv/themed/shared/ListFlatCards";
import { ListAccentCards } from "@/components/cv/themed/shared/ListAccentCards";
import { ListRows } from "@/components/cv/themed/shared/ListRows";
import { ListCardRows } from "@/components/cv/themed/shared/ListCardRows";
import { ListTimeline } from "@/components/cv/themed/shared/ListTimeline";

interface TimelineViewProps {
  items: ListEntry[];
  variant: ListLayout;
  /** Columns for the card designs; 1 = stacked. Ignored by rows/timeline. */
  columns?: CardColumns;
}

export const TimelineView = ({ items, variant, columns = 1 }: TimelineViewProps) => {
  if (variant === "cards-gradient") return <ListCards items={items} columns={columns} />;
  if (variant === "cards-flat") return <ListFlatCards items={items} columns={columns} />;
  if (variant === "cards-accent") return <ListAccentCards items={items} columns={columns} />;
  if (variant === "rows") return <ListRows items={items} />;
  if (variant === "rows-gradient") return <ListCardRows items={items} />;
  if (variant === "rows-flat") return <ListCardRows items={items} tone="flat" />;
  if (variant === "rows-accent") return <ListCardRows items={items} tone="accent" />;
  return <ListTimeline items={items} />;
};