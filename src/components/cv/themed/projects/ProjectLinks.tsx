import { Github, Star } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { type Project } from "@/lib/cv-types";

export const ProjectLinks = ({ project }: { project: Project }) => (
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