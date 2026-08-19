import { type LucideIcon } from "lucide-react";
import {
  Code2, Coffee, Gamepad2, Mountain, Music, Book, Camera, Bike, Plane, Dumbbell, Flower2,
} from "lucide-react";
import { type CVData } from "@/lib/cv-types";

/** Maps hobby icon names to lucide icons. */
export const ICON_MAP: Record<string, LucideIcon> = {
  Mountain, Coffee, Music, Code2, Gamepad2, Book, Camera, Bike, Plane, Dumbbell, Flower2,
};

export const splitTags = (s: string) => s.split(",").map((t) => t.trim()).filter(Boolean);

export const groupSkills = (data: CVData) =>
  data.skillGroups
    .map((g) => ({ group: g, items: data.skills.filter((s) => s.group === g.id) }))
    .filter((g) => g.items.length > 0);

export const EmptyState = ({ label }: { label: string }) => (
  <div className="rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground print:hidden">
    {label}
  </div>
);