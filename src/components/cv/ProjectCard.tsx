import { ExternalLink, Github, Star } from "lucide-react";

interface ProjectCardProps {
  name: string;
  description: string;
  stack: string[];
  stars?: number;
  repo?: string;
  link?: string;
}

export const ProjectCard = ({ name, description, stack, stars, repo, link }: ProjectCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-gradient-card p-6 shadow-card transition-all hover:border-primary/50 hover:shadow-glow">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">/</span>
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        </div>
        <div className="flex items-center gap-2">
          {stars !== undefined && (
            <span className="flex items-center gap-1 font-mono text-xs text-terminal-yellow">
              <Star className="h-3 w-3 fill-current" />
              {stars}
            </span>
          )}
          {repo && (
            <a href={repo} target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-primary">
              <Github className="h-4 w-4" />
            </a>
          )}
          {link && (
            <a href={link} target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-primary">
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>

      <div className="flex flex-wrap gap-1.5">
        {stack.map((tech) => (
          <span
            key={tech}
            className="rounded border border-border bg-background/60 px-2 py-0.5 font-mono text-[11px] text-accent"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
