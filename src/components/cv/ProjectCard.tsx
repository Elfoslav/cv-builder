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
    <div className="group relative overflow-hidden rounded-md border border-border bg-gradient-card p-2.5 shadow-card transition-all hover:border-primary/50 hover:shadow-glow">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="mb-1.5 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-tight text-foreground">{name}</h3>
          {period && (
            <p className="mt-0.5 font-mono text-[10px] text-primary">{period}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {stars !== undefined && (
            <span className="flex items-center gap-1 text-[11px] text-terminal-yellow" title="GitHub stars">
              <Star className="h-3 w-3 fill-current" />
              {stars.toLocaleString()}
            </span>
          )}
          {repo && (
            <a href={repo} target="_blank" rel="noreferrer" aria-label="View source" className="text-muted-foreground transition-colors hover:text-primary">
              <Github className="h-3.5 w-3.5" />
            </a>
          )}
          {link && (
            <a href={link} target="_blank" rel="noreferrer" aria-label="Visit project" className="text-muted-foreground transition-colors hover:text-primary">
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      <p className="mb-2 text-xs leading-snug text-muted-foreground">{description}</p>

      {stack.length > 0 && (
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
      )}
    </div>
  );
};
