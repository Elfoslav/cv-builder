import { type Hobby } from "@/lib/cv-types";
import { ICON_MAP } from "@/components/cv/cv-utils";

/** Compact horizontal tiles with an icon badge — flat and print-friendly. */
export const HobbyFlatCards = ({ hobbies }: { hobbies: Hobby[] }) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 print-grid-2">
    {hobbies.map((hb) => {
      const Icon = ICON_MAP[hb.icon] ?? ICON_MAP.Code2;
      return (
        <div
          key={hb.id}
          className="cv-hobby-card cv-hobby-tile flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2.5"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-primary">
            <Icon className="h-4 w-4" />
          </span>
          <span className="text-sm text-foreground">{hb.label}</span>
        </div>
      );
    })}
  </div>
);