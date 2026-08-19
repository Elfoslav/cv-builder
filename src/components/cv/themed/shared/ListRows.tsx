import { TagPills } from "@/components/cv/TagPills";
import { cn } from "@/lib/utils";
import { type ListEntry } from "./types";
import { ListLinks } from "./ListLinks";
import { MetaLine } from "./MetaLine";

/** Bordered rows with the period above the title — used by experience/education
 * (`cv-timeline-row`) and projects `rows-plain` (`cv-project-row`: compact pills + links). */
export const ListRows = ({ items }: { items: ListEntry[] }) => (
  <div>
    {items.map((e) => (
      <div
        key={e.id}
        className={cn(
          "border-b border-border py-4 last:border-0",
          e.compact ? "cv-project-row" : "cv-timeline-row",
        )}
      >
        <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">{e.period}</div>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-foreground">{e.title}</h3>
          {e.links && <ListLinks links={e.links} />}
        </div>
        {(e.subtitle || e.location) && <MetaLine subtitle={e.subtitle} location={e.location} />}
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
        <TagPills tags={e.tags} compact={e.compact} />
      </div>
    ))}
  </div>
);