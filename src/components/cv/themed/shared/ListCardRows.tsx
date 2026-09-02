import { CVCard } from "@/components/cv/CVCard";
import { TagPills } from "@/components/cv/TagPills";
import { type ListEntry } from "./types";
import { ListLinks } from "./ListLinks";
import { MetaLine } from "./MetaLine";

interface ListCardRowsProps {
  items: ListEntry[];
  /** gradient = elevated glow rows, flat = print-friendly, accent = accent bar. */
  tone?: "gradient" | "flat" | "accent";
}

/**
 * Card rows — full-width card per entry, one per line. Used by every list
 * section: projects (`cv-project-row`, compact pills + links) or
 * experience/education (`cv-timeline-row`).
 */
export const ListCardRows = ({ items, tone = "gradient" }: ListCardRowsProps) => (
  <div className="space-y-2">
    {items.map((e) => (
      <div key={e.id} className="page-gutter">
        <CVCard
          tone={tone === "flat" ? "flat" : "gradient"}
          accent={tone === "accent"}
          className={
            e.links
              ? "cv-project-row p-3 transition-all hover:border-primary/40"
              : "cv-timeline-row p-3.5"
          }
        >
          {e.links ? (
            <>
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-foreground">{e.title}</h3>
                <span className="flex items-center gap-2">
                  {e.period && <span className="font-mono text-[10px] text-primary">{e.period}</span>}
                  <ListLinks links={e.links} />
                </span>
              </div>
              <p className="mb-2 text-sm leading-snug text-muted-foreground">{e.description}</p>
              <TagPills tags={e.tags} compact />
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-tight text-foreground">{e.title}</h3>
                  <MetaLine subtitle={e.subtitle} location={e.location} />
                </div>
                <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-primary">
                  {e.period}
                </span>
              </div>
              <p className="mt-2 text-sm leading-snug text-muted-foreground">{e.description}</p>
              <TagPills tags={e.tags} />
            </>
          )}
        </CVCard>
      </div>
    ))}
  </div>
);