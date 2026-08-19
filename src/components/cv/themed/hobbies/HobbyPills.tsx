import { type Hobby } from "@/lib/cv-types";
import { ICON_MAP } from "@/components/cv/cv-utils";

/** Icon + label pills, wrapped to multiple lines. */
export const HobbyPills = ({ hobbies }: { hobbies: Hobby[] }) => (
  <div className="flex flex-wrap gap-2">
    {hobbies.map((hb) => {
      const Icon = ICON_MAP[hb.icon] ?? ICON_MAP.Code2;
      return (
        <span
          key={hb.id}
          className="cv-hobby-pill flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-foreground"
        >
          <Icon className="h-3.5 w-3.5 text-primary" />
          {hb.label}
        </span>
      );
    })}
  </div>
);