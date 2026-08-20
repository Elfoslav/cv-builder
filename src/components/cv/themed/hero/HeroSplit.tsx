import { type CVData } from "@/lib/cv-types";
import { HeroContact } from "./HeroContact";

/** Identity on the left, contact stacked in a side column. */
export const HeroSplit = ({ data }: { data: CVData }) => (
  <section className="cv-hero border-b border-border">
    <div className="container mx-auto max-w-5xl px-6 py-10 print:py-5">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,240px)] md:items-start">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground md:text-5xl">
            {data.name || "Your Name"}
          </h1>
          <p className="mt-1 text-lg font-medium text-accent md:text-xl">{data.role}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{data.bio}</p>
        </div>
        <HeroContact data={data} className="mt-6 flex flex-col gap-2.5 text-sm md:mt-0 md:border-l md:border-border md:pl-6" />
      </div>
    </div>
  </section>
);