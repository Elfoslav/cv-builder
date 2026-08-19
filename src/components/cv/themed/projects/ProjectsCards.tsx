import { ProjectCard } from "@/components/cv/ProjectCard";
import { type Project } from "@/lib/cv-types";
import { splitTags } from "@/components/cv/cv-utils";

/** Large feature cards in a two-column grid (the default look). */
export const ProjectsCards = ({ projects }: { projects: Project[] }) => (
  <div className="grid gap-2 md:grid-cols-2 print-grid-2-tight">
    {projects.map((p) => (
      <ProjectCard
        key={p.id}
        name={p.name}
        period={p.period}
        description={p.description}
        stack={splitTags(p.stack)}
        stars={p.stars}
        repo={p.repo}
        link={p.link}
      />
    ))}
  </div>
);