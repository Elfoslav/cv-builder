import { cn } from "@/lib/utils";

interface BioTextProps {
  bio: string;
  className?: string;
}

/**
 * Renders the short bio with preserved line breaks.
 * Mirrors the about section's handling of new lines (`\n` → `<br>`,
 * `\n\n` → new paragraph) via CSS `whitespace-pre-line`, so
 * single and double line breaks entered in the textarea are visible
 * in the CV preview and print/PDF.
 */
export const BioText = ({ bio, className }: BioTextProps) => (
  <p className={cn("whitespace-pre-line break-words", className)}>{bio}</p>
);
