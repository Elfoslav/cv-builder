import { type TimelineLayout } from "@/lib/section-designs";
import { type ListEntry } from "@/components/cv/themed/shared/types";
import { ListCards } from "@/components/cv/themed/shared/ListCards";
import { ListFlatCards } from "@/components/cv/themed/shared/ListFlatCards";
import { ListAccentCards } from "@/components/cv/themed/shared/ListAccentCards";
import { ListRows } from "@/components/cv/themed/shared/ListRows";
import { ListTimeline } from "@/components/cv/themed/shared/ListTimeline";

interface TimelineViewProps {
  items: ListEntry[];
  variant: TimelineLayout;
}

export const TimelineView = ({ items, variant }: TimelineViewProps) => {
  if (variant === "cards-gradient") return <ListCards items={items} stacked />;
  if (variant === "cards-flat") return <ListFlatCards items={items} stacked />;
  if (variant === "cards-accent") return <ListAccentCards items={items} stacked />;
  if (variant === "rows") return <ListRows items={items} />;
  return <ListTimeline items={items} />;
};