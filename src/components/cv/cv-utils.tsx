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
  const cols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";
  const print = columns === 3 ? "print-grid-3-tight" : "print-grid-2-tight";
  return `grid ${gap} ${cols} ${print}`;
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