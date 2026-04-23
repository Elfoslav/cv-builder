import { ExternalLink, Github, Star } from "lucide-react";

interface ProjectCardProps {
  name: string;
  period?: string;
  description: string;
  stack: string[];
  stars?: number;
  repo?: string;
  link?: string;
}

export const ProjectCard = ({ name, period, description, stack, stars, repo, link }: ProjectCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-gradient-card p-6 shadow-card transition-all hover:border-primary/50 hover:shadow-glow">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>
          {period && (
            <p className="mt-0.5 font-mono text-xs text-primary">{period}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {stars !== undefined && (
            <span className="flex items-center gap-1 text-xs text-terminal-yellow" title="GitHub stars">
              <Star className="h-3 w-3 fill-current" />
              {stars.toLocaleString()}
            </span>
          )}
          {repo && (
            <a href={repo} target="_blank" rel="noreferrer" aria-label="View source" className="text-muted-foreground transition-colors hover:text-primary">
              <Github className="h-4 w-4" />
            </a>
          )}
          {link && (
            <a href={link} target="_blank" rel="noreferrer" aria-label="Visit project" className="text-muted-foreground transition-colors hover:text-primary">
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>

      {stack.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-[11px] text-accent"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
