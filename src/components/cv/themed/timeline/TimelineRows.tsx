import { PeriodRow } from "@/components/cv/PeriodRow";
import { TagPills } from "@/components/cv/TagPills";
import { EntryMeta } from "./EntryMeta";
import type { TimelineEntry } from "./TimelineView";

/** Compact rows: fixed period column on the left, content on the right. */
export const TimelineRows = ({ items }: { items: TimelineEntry[] }) => (
  <div>
    {items.map((e) => (
      <PeriodRow key={e.id} period={e.period} className="cv-timeline-row">
        <h3 className="text-base font-semibold text-foreground">{e.title}</h3>
        <EntryMeta subtitle={e.subtitle} location={e.location} />
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
        <TagPills tags={e.tags} />
      </PeriodRow>
    ))}
  </div>
);