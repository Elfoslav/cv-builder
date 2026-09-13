import { type FooterLayout } from "@/lib/section-designs";
import { FooterSplit } from "./FooterSplit";
import { FooterCentered } from "./FooterCentered";

interface FooterViewProps {
  thanks: string;
  copyright: string;
  variant: FooterLayout;
}

export const FooterView = ({ thanks, copyright, variant }: FooterViewProps) => (
  <footer className="border-t border-border pt-10">
    {variant === "center"
      ? <FooterCentered thanks={thanks} copyright={copyright} />
      : <FooterSplit thanks={thanks} copyright={copyright} />}
  </footer>
);