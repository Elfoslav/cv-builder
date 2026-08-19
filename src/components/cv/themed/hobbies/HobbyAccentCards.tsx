import { type Hobby } from "@/lib/cv-types";
import { ICON_MAP } from "@/components/cv/cv-utils";

/** Icon cards with a gradient underline accent. */
export const HobbyAccentCards = ({ hobbies }: { hobbies: Hobby[] }) => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-5 print-grid-5">
    {hobbies.map((hb) => {
      const Icon = ICON_MAP[hb.icon] ?? ICON_MAP.Code2;
      return (
        <div
          key={hb.id}
          className="cv-hobby-card group flex flex-col items-center gap-2 rounded-lg border border-border bg-gradient-card p-5 pb-4 text-center"
        >
          <Icon className="h-7 w-7 text-primary" />
          <span className="text-xs text-muted-foreground">{hb.label}</span>
          <span className="mt-1 h-1 w-8 rounded-full bg-gradient-primary" />
        </div>
      );
    })}
  </div>
);