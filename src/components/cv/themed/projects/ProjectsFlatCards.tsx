import { CVCard } from "@/components/cv/CVCard";
import { TagPills } from "@/components/cv/TagPills";
import { type Project } from "@/lib/cv-types";
import { splitTags } from "@/components/cv/cv-utils";
import { ProjectLinks } from "./ProjectLinks";

/** Minimal flat cards: no shadows or gradients — low-contrast and print-friendly. */
export const ProjectsFlatCards = ({ projects }: { projects: Project[] }) => (
  <div className="grid gap-2 md:grid-cols-2 print-grid-2-tight">
    {projects.map((p) => (
      <CVCard key={p.id} tone="flat" className="cv-project-card flex flex-col p-3.5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-base font-semibold leading-tight text-foreground">{p.name}</h3>
            {p.period && (
              <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{p.period}</p>
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