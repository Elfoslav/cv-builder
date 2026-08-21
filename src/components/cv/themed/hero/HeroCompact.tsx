import { type CVData } from "@/lib/cv-types";
import { HeroContact } from "./HeroContact";

/** Name and contact on one line, bio underneath — tight spacing. */
export const HeroCompact = ({ data }: { data: CVData }) => (
  <section className="cv-hero border-b border-border">
    <div className="mx-auto max-w-[703px] px-6 py-8 print:py-5">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {data.name || "Your Name"}
          </h1>
          <p className="mt-0.5 text-base font-medium text-accent">{data.role}</p>
        </div>
        <HeroContact data={data} className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm" />
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{data.bio}</p>
    </div>
  </section>
);