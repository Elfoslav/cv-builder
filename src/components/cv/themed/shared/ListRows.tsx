import { PeriodList, PeriodRow } from "@/components/cv/PeriodRow";
import { TagPills } from "@/components/cv/TagPills";
import { type ListEntry } from "./types";
import { ListLinks } from "./ListLinks";
import { MetaLine } from "./MetaLine";

/** Bordered rows with a shared date column — used by experience/education (`.cv-timeline-row`)
 * and projects `rows-plain` (`.cv-project-row`, compact pills, links). */
export const ListRows = ({ items }: { items: ListEntry[] }) => (
  <PeriodList>
    {items.map((e) => (
      <PeriodRow
        key={e.id}
        period={e.period ?? ""}
        className={e.compact ? "cv-project-row" : "cv-timeline-row"}
      >
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-foreground">{e.title}</h3>
          {e.links && <ListLinks links={e.links} />}
        </div>
        {(e.subtitle || e.location) && <MetaLine subtitle={e.subtitle} location={e.location} />}
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
        <TagPills tags={e.tags} compact={e.compact} />
      </PeriodRow>
    ))}
  </PeriodList>
);