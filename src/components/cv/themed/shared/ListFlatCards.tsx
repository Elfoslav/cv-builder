import { CVCard } from "@/components/cv/CVCard";
import { TagPills } from "@/components/cv/TagPills";
import { cn } from "@/lib/utils";
import { type ListEntry } from "./types";
import { ListLinks } from "./ListLinks";
import { MetaLine } from "./MetaLine";

const FlatCardItem = ({ entry }: { entry: ListEntry }) => {
  if (entry.links) {
    return (
      <>
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-base font-semibold leading-tight text-foreground">{entry.title}</h3>
            {entry.period && (
              <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{entry.period}</p>
            )}
          </div>
          <ListLinks links={entry.links} />
        </div>
        <p className="mb-2.5 text-sm leading-snug text-muted-foreground">{entry.description}</p>
        <div className="mt-auto">
          <TagPills tags={entry.tags} compact />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-foreground">{entry.title}</h3>
          <MetaLine subtitle={entry.subtitle} location={entry.location} />
        </div>
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {entry.period}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
      <TagPills tags={entry.tags} />
    </>
  );
};

interface ListFlatCardsProps {
  items: ListEntry[];
  /** Stack full-width cards vertically (experience/education); default is a 2-col grid (projects). */
  stacked?: boolean;
}

/** Flat low-contrast cards — the print-friendly card look for every list section. */
export const ListFlatCards = ({ items, stacked = false }: ListFlatCardsProps) => (
  <div className={cn(stacked ? "space-y-2" : "grid gap-2 md:grid-cols-2 print-grid-2-tight")}>
    {items.map((e) => (
      <CVCard
        key={e.id}
        tone="flat"
        className={cn(
          "flex flex-col",
          e.links ? "cv-project-card p-3.5" : "cv-timeline-card cv-timeline-flat p-4",
        )}
      >
        <FlatCardItem entry={e} />
      </CVCard>
    ))}
  </div>
);