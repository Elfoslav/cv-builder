import { type ListLayout } from "@/lib/section-designs";
import { type CardColumns } from "@/lib/cv-types";
import { type ListEntry } from "@/components/cv/themed/shared/types";
import { ListGradientSoftCards } from "@/components/cv/themed/shared/ListGradientSoftCards";
import { ListGradientBorderCards } from "@/components/cv/themed/shared/ListGradientBorderCards";
import { ListGradientBandCards } from "@/components/cv/themed/shared/ListGradientBandCards";
import { ListGradientHeadlineCards } from "@/components/cv/themed/shared/ListGradientHeadlineCards";
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
  if (variant === "cards-gradient-soft") return <ListGradientSoftCards items={items} columns={columns} />;
  if (variant === "cards-gradient-border") return <ListGradientBorderCards items={items} columns={columns} />;
  if (variant === "cards-gradient-band") return <ListGradientBandCards items={items} columns={columns} />;
  if (variant === "cards-gradient-headline") return <ListGradientHeadlineCards items={items} columns={columns} />;
  if (variant === "cards-flat") return <ListFlatCards items={items} columns={columns} />;
  if (variant === "cards-accent") return <ListAccentCards items={items} columns={columns} />;
  if (variant === "rows") return <ListRows items={items} />;
  if (variant === "rows-gradient") return <ListCardRows items={items} />;
  if (variant === "rows-flat") return <ListCardRows items={items} tone="flat" />;
  if (variant === "rows-accent") return <ListCardRows items={items} tone="accent" />;
  return <ListTimeline items={items} />;
};