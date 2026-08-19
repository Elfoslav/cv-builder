import { TagPills } from "@/components/cv/TagPills";
import { ListLinks } from "@/components/cv/themed/shared/ListLinks";
import { type Project } from "@/lib/cv-types";
import { splitTags } from "@/components/cv/cv-utils";

/** Full-width card rows — one project per line, corporate report style. */
export const ProjectsRows = ({ projects }: { projects: Project[] }) => (
  <div className="space-y-2">
    {projects.map((p) => (
      <div key={p.id} className="cv-project-row rounded-md border border-border bg-gradient-card p-3 shadow-card transition-all hover:border-primary/40">
        <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
          <span className="flex items-center gap-2">
            {p.period && <span className="font-mono text-[10px] text-primary">{p.period}</span>}
            <ListLinks links={{ stars: p.stars, repo: p.repo, link: p.link }} />
          </span>
        </div>
        <p className="mb-2 text-sm leading-snug text-muted-foreground">{p.description}</p>
        <TagPills tags={splitTags(p.stack)} compact />
      </div>
    ))}
  </div>
);