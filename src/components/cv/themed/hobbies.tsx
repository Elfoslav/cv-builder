import { Check } from "lucide-react";
import { type Hobby } from "@/lib/cv-types";
import { type HobbyLayout } from "@/lib/section-designs";
import { ICON_MAP } from "@/components/cv/cv-utils";

interface HobbiesViewProps {
  hobbies: Hobby[];
  variant: HobbyLayout;
}

/** Big rounded icon cards in a row (the default look). */
const Cards = ({ hobbies }: { hobbies: Hobby[] }) => (
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

/** Compact horizontal tiles with an icon badge — flat and print-friendly. */
const FlatCards = ({ hobbies }: { hobbies: Hobby[] }) => (
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

/** Icon cards with a gradient underline accent. */
const AccentCards = ({ hobbies }: { hobbies: Hobby[] }) => (
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

/** Icon + label pills, wrapped to multiple lines. */
const Pills = ({ hobbies }: { hobbies: Hobby[] }) => (
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

/** Checkbox-style list, two columns. */
const Checks = ({ hobbies }: { hobbies: Hobby[] }) => (
  <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 print-grid-2">
    {hobbies.map((hb) => (
      <li
        key={hb.id}
        className="cv-hobby-check flex items-center gap-2.5 text-sm text-foreground"
      >
        <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
        {hb.label}
      </li>
    ))}
  </ul>
);

export const HobbiesView = ({ hobbies, variant }: HobbiesViewProps) => {
  if (variant === "cards-flat") return <FlatCards hobbies={hobbies} />;
  if (variant === "cards-accent") return <AccentCards hobbies={hobbies} />;
  if (variant === "pills") return <Pills hobbies={hobbies} />;
  if (variant === "checks") return <Checks hobbies={hobbies} />;
  return <Cards hobbies={hobbies} />;
};