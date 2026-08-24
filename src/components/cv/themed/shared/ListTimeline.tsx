import { TimelineItem } from "@/components/cv/TimelineItem";
import { type ListEntry } from "./types";
import { ListLinks } from "./ListLinks";

/** Vertical timeline with glowing dots — used by experience/education and the projects `timeline` variant. */
export const ListTimeline = ({ items }: { items: ListEntry[] }) => (
  <div>
    {items.map((e, i) => (
      <div key={e.id} className="page-gutter">
        <TimelineItem
          period={e.period ?? ""}
          title={e.title}
          subtitle={e.subtitle}
          location={e.location}
          tags={e.tags}
          links={e.links && <ListLinks links={e.links} />}
          isLast={i === items.length - 1}
        >
          {e.description}
        </TimelineItem>
      </div>
    ))}
  </div>
);