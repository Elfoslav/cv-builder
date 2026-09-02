import { Star } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { Github } from "lucide-react";
import { type ListLinks } from "./types";

/** Stars + repo + project links (used by projects inside the shared list designs). */
export const ListLinks = ({ links }: { links: ListLinks }) => (
  <span className="flex items-center gap-2">
    {links.stars !== undefined && (
      <span className="flex items-center gap-1 text-[11px] text-terminal-yellow" title="GitHub stars">
        <Star className="h-3 w-3 fill-current" />
        {links.stars.toLocaleString()}
      </span>
    )}
    {links.repo && (
      <a href={links.repo} target="_blank" rel="noreferrer" aria-label="View source" className="text-muted-foreground transition-colors hover:text-primary">
        <Github className="h-3.5 w-3.5" />
      </a>
    )}
    {links.link && (
      <a href={links.link} target="_blank" rel="noreferrer" aria-label="Visit project" className="text-muted-foreground transition-colors hover:text-primary">
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    )}
  </span>
);