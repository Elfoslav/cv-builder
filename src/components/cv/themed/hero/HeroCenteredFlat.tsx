import { type CVData } from "@/lib/cv-types";
import { HeroContact } from "./HeroContact";

/** Plain centered header — no gradient backdrop, contact in a row below. */
export const HeroCenteredFlat = ({ data }: { data: CVData }) => (
  <section className="cv-hero border-b border-border">
    <div className="mx-auto max-w-[703px] px-6 py-12 print:py-6">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground md:text-5xl">
          {data.name || "Your Name"}
        </h1>
        <p className="mt-1.5 text-lg font-medium text-accent md:text-xl">{data.role}</p>
        <div aria-hidden className="mt-4 h-px w-16 bg-border" />
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{data.bio}</p>
        <HeroContact data={data} className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm" />
      </div>
    </div>
  </section>
);