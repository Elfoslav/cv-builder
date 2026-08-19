import { ExternalLink, Github, Star } from "lucide-react";
import { ProjectCard } from "@/components/cv/ProjectCard";
import { TimelineItem } from "@/components/cv/TimelineItem";
import { type Project } from "@/lib/cv-types";
import { type ProjectLayout } from "@/lib/section-designs";
import { splitTags } from "@/components/cv/cv-utils";

interface ProjectsViewProps {
  projects: Project[];
  variant: ProjectLayout;
}

const StackPills = ({ stack }: { stack: string[] }) =>
  stack.length > 0 ? (
    <div className="flex flex-wrap gap-1">
      {stack.map((tech) => (
        <span
          key={tech}
          className="rounded-full border border-border bg-background/60 px-2 py-0.5 text-[10px] text-accent"
        >
          {tech}
        </span>
      ))}
    </div>
  ) : null;

const ProjectLinks = ({ project }: { project: Project }) => (
  <span className="flex items-center gap-2">
    {project.stars !== undefined && (
      <span className="flex items-center gap-1 text-[11px] text-terminal-yellow" title="GitHub stars">
        <Star className="h-3 w-3 fill-current" />
        {project.stars.toLocaleString()}
      </span>
    )}
    {project.repo && (
      <a href={project.repo} target="_blank" rel="noreferrer" aria-label="View source" className="text-muted-foreground transition-colors hover:text-primary">
        <Github className="h-3.5 w-3.5" />
      </a>
    )}
    {project.link && (
      <a href={project.link} target="_blank" rel="noreferrer" aria-label="Visit project" className="text-muted-foreground transition-colors hover:text-primary">
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    )}
  </span>
);

/** Large feature cards in a two-column grid (the default look). */
const Cards = ({ projects }: { projects: Project[] }) => (
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

/** Minimal flat cards: no shadows or gradients — low-contrast and print-friendly. */
const FlatCards = ({ projects }: { projects: Project[] }) => (
  <div className="grid gap-2 md:grid-cols-2 print-grid-2-tight">
    {projects.map((p) => (
      <div key={p.id} className="cv-project-card flex flex-col rounded-md border border-border bg-card p-3.5">
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
          <StackPills stack={splitTags(p.stack)} />
        </div>
      </div>
    ))}
  </div>
);

/** Featured cards: a colored accent bar runs down the left edge. */
const AccentCards = ({ projects }: { projects: Project[] }) => (
  <div className="grid gap-2 md:grid-cols-2 print-grid-2-tight">
    {projects.map((p) => (
      <div key={p.id} className="cv-project-card group relative flex flex-col overflow-hidden rounded-md border border-border bg-gradient-card p-3.5 pl-5 shadow-card">
        <span className="absolute inset-y-0 left-0 w-1 bg-gradient-primary" />
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
          <StackPills stack={splitTags(p.stack)} />
        </div>
      </div>
    ))}
  </div>
);

/** Full-width card rows — one project per line, corporate report style. */
const Rows = ({ projects }: { projects: Project[] }) => (
  <div className="space-y-2">
    {projects.map((p) => (
      <div key={p.id} className="cv-project-row rounded-md border border-border bg-gradient-card p-3 shadow-card transition-all hover:border-primary/40">
        <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
          <span className="flex items-center gap-2">
            {p.period && <span className="font-mono text-[10px] text-primary">{p.period}</span>}
            <ProjectLinks project={p} />
          </span>
        </div>
        <p className="mb-2 text-sm leading-snug text-muted-foreground">{p.description}</p>
        <StackPills stack={splitTags(p.stack)} />
      </div>
    ))}
  </div>
);

/** Education-style plain rows: fixed period column, border separators, no card. */
const RowsPlain = ({ projects }: { projects: Project[] }) => (
  <div>
    {projects.map((p) => (
      <div
        key={p.id}
        className="cv-project-row grid grid-cols-1 gap-1 border-b border-border py-4 last:border-0 md:grid-cols-[max-content_1fr] print:grid-cols-[max-content_1fr]"
      >
        <div className="whitespace-nowrap pt-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">{p.period}</div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
            <ProjectLinks project={p} />
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
          <div className="mt-2">
            <StackPills stack={splitTags(p.stack)} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

/** Vertical timeline with glowing dots; period sits on the line like experience. */
const Timeline = ({ projects }: { projects: Project[] }) => (
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

export const ProjectsView = ({ projects, variant }: ProjectsViewProps) => {
  if (variant === "cards-flat") return <FlatCards projects={projects} />;
  if (variant === "cards-accent") return <AccentCards projects={projects} />;
  if (variant === "rows") return <Rows projects={projects} />;
  if (variant === "rows-plain") return <RowsPlain projects={projects} />;
  if (variant === "timeline") return <Timeline projects={projects} />;
  return <Cards projects={projects} />;
};