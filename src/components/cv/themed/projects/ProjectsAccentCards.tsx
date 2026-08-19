import { CVCard } from "@/components/cv/CVCard";
import { TagPills } from "@/components/cv/TagPills";
import { type Project } from "@/lib/cv-types";
import { splitTags } from "@/components/cv/cv-utils";
import { ProjectLinks } from "./ProjectLinks";

/** Featured cards: a colored accent bar runs down the left edge. */
export const ProjectsAccentCards = ({ projects }: { projects: Project[] }) => (
  <div className="grid gap-2 md:grid-cols-2 print-grid-2-tight">
    {projects.map((p) => (
      <CVCard key={p.id} accent className="cv-project-card flex flex-col p-3.5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-base font-semibold leading-tight text-foreground">{p.name}</h3>
            {p.period && (
              <p className="mt-0.5 inline-block rounded-full border border-border bg-background/50 px-2 py-0.5 font-mono text-[10px] text-primary">
                {p.period}
              </p>
            )}
          </div>
          <ProjectLinks project={p} />
        </div>
        <p className="mb-2.5 text-sm leading-snug text-muted-foreground">{p.description}</p>
        <div className="mt-auto">
          <TagPills tags={splitTags(p.stack)} compact />
        </div>
      </CVCard>
    ))}
  </div>
);