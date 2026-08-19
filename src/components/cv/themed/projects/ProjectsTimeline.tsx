import { TimelineItem } from "@/components/cv/TimelineItem";
import { type Project } from "@/lib/cv-types";
import { splitTags } from "@/components/cv/cv-utils";
import { ProjectLinks } from "./ProjectLinks";

/** Vertical timeline with glowing dots; period sits on the line like experience. */
export const ProjectsTimeline = ({ projects }: { projects: Project[] }) => (
  <div>
    {projects.map((p) => (
      <TimelineItem key={p.id} period={p.period ?? ""} title={p.name} tags={splitTags(p.stack)}>
        <span>
          {p.description}
          <span className="mt-2 block">
            <ProjectLinks project={p} />
          </span>
        </span>
      </TimelineItem>
    ))}
  </div>
);