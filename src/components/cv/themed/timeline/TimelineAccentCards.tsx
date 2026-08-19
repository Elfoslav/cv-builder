import { CVCard } from "@/components/cv/CVCard";
import { TagPills } from "@/components/cv/TagPills";
import { EntryMeta } from "./EntryMeta";
import type { TimelineEntry } from "./TimelineView";

/** Accent cards: a colored gradient bar runs down the left edge. */
export const TimelineAccentCards = ({ items }: { items: TimelineEntry[] }) => (
  <div className="space-y-3">
    {items.map((e) => (
      <CVCard key={e.id} accent className="cv-timeline-card p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">{e.period}</div>
        <h3 className="mt-1.5 text-lg font-semibold text-foreground">{e.title}</h3>
        <EntryMeta subtitle={e.subtitle} location={e.location} />
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
        <TagPills tags={e.tags} />
      </CVCard>
    ))}
  </div>
);