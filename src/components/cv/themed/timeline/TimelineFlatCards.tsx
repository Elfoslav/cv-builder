import { CVCard } from "@/components/cv/CVCard";
import { TagPills } from "@/components/cv/TagPills";
import { EntryMeta } from "./EntryMeta";
import type { TimelineEntry } from "./TimelineView";

/** Minimal flat cards: no shadows or gradients — clean and print-friendly. */
export const TimelineFlatCards = ({ items }: { items: TimelineEntry[] }) => (
  <div className="space-y-2">
    {items.map((e) => (
      <CVCard key={e.id} tone="flat" className="cv-timeline-card cv-timeline-flat p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-foreground">{e.title}</h3>
            <EntryMeta subtitle={e.subtitle} location={e.location} />
          </div>
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {e.period}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
        <TagPills tags={e.tags} />
      </CVCard>
    ))}
  </div>
);