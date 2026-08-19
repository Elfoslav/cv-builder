import { TimelineItem } from "@/components/cv/TimelineItem";
import { type TimelineLayout } from "@/lib/section-designs";

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

const TagPills = ({ tags }: { tags: string[] }) =>
  tags.length > 0 ? (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-border bg-secondary/50 px-3 py-0.5 text-xs text-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  ) : null;

/** Vertical timeline with glowing dots (the default look). */
const Timeline = ({ items }: { items: TimelineEntry[] }) => (
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

/** Each entry sits in its own warm card — no connecting line (the default card look). */
const Cards = ({ items }: { items: TimelineEntry[] }) => (
  <div className="space-y-4">
    {items.map((e) => (
      <div key={e.id} className="cv-timeline-card rounded-md border border-border bg-gradient-card p-4 shadow-card">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">{e.period}</div>
        <h3 className="mt-1.5 text-lg font-semibold text-foreground">{e.title}</h3>
        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-accent">{e.subtitle}</span>
          {e.location && (
            <>
              <span>·</span>
              <span>{e.location}</span>
            </>
          )}
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
        <TagPills tags={e.tags} />
      </div>
    ))}
  </div>
);

/** Minimal flat cards: no shadows or gradients — clean and print-friendly. */
const FlatCards = ({ items }: { items: TimelineEntry[] }) => (
  <div className="space-y-2">
    {items.map((e) => (
      <div key={e.id} className="cv-timeline-card cv-timeline-flat rounded-md border border-border bg-card p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-foreground">{e.title}</h3>
            <div className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-accent">{e.subtitle}</span>
              {e.location && (
                <>
                  <span>·</span>
                  <span>{e.location}</span>
                </>
              )}
            </div>
          </div>
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {e.period}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
        <TagPills tags={e.tags} />
      </div>
    ))}
  </div>
);

/** Accent cards: a colored gradient bar runs down the left edge. */
const AccentCards = ({ items }: { items: TimelineEntry[] }) => (
  <div className="space-y-3">
    {items.map((e) => (
      <div key={e.id} className="cv-timeline-card relative overflow-hidden rounded-md border border-border bg-gradient-card p-4 pl-5 shadow-card">
        <span className="absolute inset-y-0 left-0 w-1 bg-gradient-primary" />
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">{e.period}</div>
        <h3 className="mt-1.5 text-lg font-semibold text-foreground">{e.title}</h3>
        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-accent">{e.subtitle}</span>
          {e.location && (
            <>
              <span>·</span>
              <span>{e.location}</span>
            </>
          )}
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
        <TagPills tags={e.tags} />
      </div>
    ))}
  </div>
);

/** Compact rows: fixed period column on the left, content on the right. */
const Rows = ({ items }: { items: TimelineEntry[] }) => (
  <div>
    {items.map((e) => (
      <div
        key={e.id}
        className="cv-timeline-row grid grid-cols-1 gap-1 border-b border-border py-4 last:border-0 md:grid-cols-[max-content_1fr] print:grid-cols-[max-content_1fr]"
      >
        <div className="whitespace-nowrap pt-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">{e.period}</div>
        <div>
          <h3 className="text-base font-semibold text-foreground">{e.title}</h3>
          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-accent">{e.subtitle}</span>
            {e.location && (
              <>
                <span>·</span>
                <span>{e.location}</span>
              </>
            )}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
          <TagPills tags={e.tags} />
        </div>
      </div>
    ))}
  </div>
);

export const TimelineView = ({ items, variant }: TimelineViewProps) => {
  if (variant === "cards-gradient") return <Cards items={items} />;
  if (variant === "cards-flat") return <FlatCards items={items} />;
  if (variant === "cards-accent") return <AccentCards items={items} />;
  if (variant === "rows") return <Rows items={items} />;
  return <Timeline items={items} />;
};