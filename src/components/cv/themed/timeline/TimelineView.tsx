import { type TimelineLayout } from "@/lib/section-designs";
import { TimelineDots } from "./TimelineDots";
import { TimelineCards } from "./TimelineCards";
import { TimelineFlatCards } from "./TimelineFlatCards";
import { TimelineAccentCards } from "./TimelineAccentCards";
import { TimelineRows } from "./TimelineRows";

export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  location?: string;
  description: string;
  tags: string[];
}

interface TimelineViewProps {
  items: TimelineEntry[];
  variant: TimelineLayout;
}

export const TimelineView = ({ items, variant }: TimelineViewProps) => {
  if (variant === "cards-gradient") return <TimelineCards items={items} />;
  if (variant === "cards-flat") return <TimelineFlatCards items={items} />;
  if (variant === "cards-accent") return <TimelineAccentCards items={items} />;
  if (variant === "rows") return <TimelineRows items={items} />;
  return <TimelineDots items={items} />;
};