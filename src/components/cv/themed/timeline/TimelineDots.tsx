import { TimelineItem } from "@/components/cv/TimelineItem";
import type { TimelineEntry } from "./TimelineView";

/** Vertical timeline with glowing dots (the default look). */
export const TimelineDots = ({ items }: { items: TimelineEntry[] }) => (
  <div>
    {items.map((e) => (
      <TimelineItem
        key={e.id}
        period={e.period}
        title={e.title}
        subtitle={e.subtitle}
        location={e.location}
        tags={e.tags}
      >
        {e.description}
      </TimelineItem>
    ))}
  </div>
);