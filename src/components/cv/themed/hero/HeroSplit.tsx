import { type CVData } from "@/lib/cv-types";
import { HeroContact } from "./HeroContact";

/** Identity on the left, contact stacked in a side column. */
export const HeroSplit = ({ data }: { data: CVData }) => (
  <section className="cv-hero border-b border-border">
    <div className="py-10 print:py-5">
      <div className="grid gap-8 grid-cols-[minmax(0,1fr)_minmax(0,240px)] items-start">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground">
            {data.name || "Your Name"}
          </h1>
          <p className="mt-1 text-lg font-medium text-accent">{data.role}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{data.bio}</p>
        </div>
        <HeroContact data={data} className="mt-0 flex flex-col gap-2.5 border-l border-border pl-6 text-sm" />
      </div>
    </div>
  </section>
);