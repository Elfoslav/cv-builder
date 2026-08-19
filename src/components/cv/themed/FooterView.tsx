import { type FooterLayout } from "@/lib/section-designs";

interface FooterViewProps {
  thanks: string;
  copyright: string;
  variant: FooterLayout;
}

/** Thanks left, copyright right (centered on small screens — the default). */
const Split = ({ thanks, copyright }: { thanks: string; copyright: string }) => (
  <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground md:flex-row md:text-left print:flex-row print:text-left">
    <div>{thanks}</div>
    <div>{copyright}</div>
  </div>
);

/** Both lines centered and stacked. */
const Centered = ({ thanks, copyright }: { thanks: string; copyright: string }) => (
  <div className="flex flex-col items-center gap-1 text-center text-xs text-muted-foreground">
    <div>{thanks}</div>
    <div>{copyright}</div>
  </div>
);

export const FooterView = ({ thanks, copyright, variant }: FooterViewProps) => (
  <footer className="border-t border-border pt-10">
    {variant === "center"
      ? <Centered thanks={thanks} copyright={copyright} />
      : <Split thanks={thanks} copyright={copyright} />}
  </footer>
);