import { TimelineItem } from "@/components/cv/TimelineItem";
import { type ListEntry } from "./types";
import { ListLinks } from "./ListLinks";

/** Vertical timeline with glowing dots — used by experience/education and the projects `timeline` variant. */
export const ListTimeline = ({ items }: { items: ListEntry[] }) => (
  <div>
    {items.map((e) => (
      <TimelineItem
        key={e.id}
        period={e.period ?? ""}
        title={e.title}
        subtitle={e.subtitle}
        location={e.location}
        tags={e.tags}
      >
        <span>
          {e.description}
          {e.links && (
            <span className="mt-2 block">
              <ListLinks links={e.links} />
            </span>
          )}
        </span>
      </TimelineItem>
    ))}
  </div>
);