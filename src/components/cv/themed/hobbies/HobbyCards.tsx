import { type Hobby } from "@/lib/cv-types";
import { ICON_MAP } from "@/components/cv/cv-utils";

/** Big rounded icon cards in a row (the default look). */
export const HobbyCards = ({ hobbies }: { hobbies: Hobby[] }) => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-5 print-grid-5">
    {hobbies.map((hb) => {
      const Icon = ICON_MAP[hb.icon] ?? ICON_MAP.Code2;
      return (
        <div
          key={hb.id}
          className="cv-hobby-card group flex flex-col items-center gap-3 rounded-lg border border-border bg-gradient-card p-5 text-center"
        >
          <Icon className="h-7 w-7 text-primary" />
          <span className="text-xs text-muted-foreground">{hb.label}</span>
        </div>
      );
    })}
  </div>
);