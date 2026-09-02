import { TagPills } from "@/components/cv/TagPills";
import { cn } from "@/lib/utils";
import { type ListEntry } from "./types";
import { ListLinks } from "./ListLinks";
import { MetaLine } from "./MetaLine";

interface ListCardContentProps {
  entry: ListEntry;
  /** Optional override for the heading class, e.g. a gradient-text design. */
  titleClass?: string;
}

/**
 * Card body shared by the gradient and accent card designs.
 *
 * With `links` (projects) the header carries the name, period chip and links,
 * and tag pills are compact; without (experience/education) the period is a
 * header line and the subtitle/location meta line is shown.
 */
export const ListCardContent = ({ entry, titleClass }: ListCardContentProps) => {
  if (entry.links) {
    return (
      <>
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className={cn("text-base font-semibold leading-tight text-foreground", titleClass)}>{entry.title}</h3>
            {entry.period && (
              <p className="mt-0.5 inline-block rounded-full border border-primary/25 bg-primary/[0.06] px-2 py-0.5 font-mono text-[10px] text-primary">
                {entry.period}
              </p>
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
      <div className="text-xs font-semibold uppercase tracking-wider text-primary">{entry.period}</div>
      <h3 className={cn("mt-1.5 text-lg font-semibold text-foreground", titleClass)}>{entry.title}</h3>
      <MetaLine subtitle={entry.subtitle} location={entry.location} />
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
      <TagPills tags={entry.tags} />
    </>
  );
};