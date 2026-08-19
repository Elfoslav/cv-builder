import { PeriodRow } from "@/components/cv/PeriodRow";
import { TagPills } from "@/components/cv/TagPills";
import { type Project } from "@/lib/cv-types";
import { splitTags } from "@/components/cv/cv-utils";
import { ProjectLinks } from "./ProjectLinks";

/** Education-style plain rows: fixed period column, border separators, no card. */
export const ProjectsRowsPlain = ({ projects }: { projects: Project[] }) => (
  <div>
    {projects.map((p) => (
      <PeriodRow key={p.id} period={p.period} className="cv-project-row">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
          <ProjectLinks project={p} />
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
        <div className="mt-2">
          <TagPills tags={splitTags(p.stack)} compact />
        </div>
      </PeriodRow>
    ))}
  </div>
);