import { type Hobby } from "@/lib/cv-types";
import { ICON_MAP } from "@/components/cv/cv-utils";

/** Icon + label pills, wrapped to multiple lines. */
export const HobbyPills = ({ hobbies }: { hobbies: Hobby[] }) => (
  <div className="flex flex-wrap gap-2.5">
    {hobbies.map((hb) => {
      const Icon = ICON_MAP[hb.icon] ?? ICON_MAP.Code2;
      return (
        <span
          key={hb.id}
          className="cv-hobby-pill flex min-w-0 items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm text-foreground"
        >
          <Icon className="h-4 w-4 shrink-0 text-primary" />
          <span className="min-w-0 break-words">{hb.label}</span>
        </span>
      );
    })}
  </div>
);