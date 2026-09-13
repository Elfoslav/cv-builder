import { type LucideIcon } from "lucide-react";
import {
  Code2, Coffee, Gamepad2, Mountain, Music, Book, Camera, Bike, Plane, Dumbbell, Flower2,
} from "lucide-react";
import { type CVData, type CardColumns } from "@/lib/cv-types";

/** Maps hobby icon names to lucide icons. */
export const ICON_MAP: Record<string, LucideIcon> = {
  Mountain, Coffee, Music, Code2, Gamepad2, Book, Camera, Bike, Plane, Dumbbell, Flower2,
};

export const splitTags = (s: string) => s.split(",").map((t) => t.trim()).filter(Boolean);

/** Splits an "about" block into non-empty paragraphs (blank-line separated). */
export const splitParagraphs = (about: string): string[] => about.split("\n\n").filter(Boolean);

/**
 * Container class for a card/skill grid. A single column stacks the content;
 * higher counts build a responsive CSS grid with a matching print layout.
 * `gap` lets callers tune the spacing (e.g. roomier skill-group gutters).
 */
export const cardGridClass = (
  columns: CardColumns,
  stackedClass: string,
  gap = "gap-2",
): string => {
  if (columns === 1) return stackedClass;
  // Literal class names below (not dynamic) so Tailwind emits them in CSS.
  const cols =
    columns === 2 ? "grid-cols-2"
      : columns === 3 ? "grid-cols-3"
        : columns === 4 ? "grid-cols-4"
          : columns === 5 ? "grid-cols-5"
            : "grid-cols-6";
  // A CV is a fixed-size print artifact, so a fixed (non-responsive) column
  // count renders identically in the editor canvas and the print/PDF page.
  // Responsive `md:`/`lg:` breakpoints would reflow the editor differently
  // (wide viewport) than the ~794px print page, causing text wraps to diverge.
  return `grid ${gap} ${cols} [&>*]:min-w-0`;
};

export const groupSkills = (data: CVData) =>
  data.skillGroups
    .map((g) => ({ group: g, items: data.skills.filter((s) => s.group === g.id) }))
    .filter((g) => g.items.length > 0);

export const EmptyState = ({ label }: { label: string }) => (
  <div className="rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground print:hidden">
    {label}
  </div>
);