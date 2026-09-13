import { Fragment } from "react";
import { CVData } from "@/lib/cv-types";
import { CVShell } from "@/components/cv/editor/cv-shell";
import { DEFAULT_THEME, type ThemeId } from "@/lib/themes";

interface CVPreviewProps {
  data: CVData;
  /** Global color theme applied via `data-theme` tokens. */
  theme?: ThemeId;
}

/**
 * Clean render used for printing and PDF export. Renders the exact same
 * CVShell markup as the on-screen editor — so skills, projects, hobbies and
 * the footer keep the same layout as on the page — but hides empty sections
 * and carries no editing affordances.
 */
export const CVPreview = ({ data, theme = DEFAULT_THEME }: CVPreviewProps) => (
  <div data-theme={theme} className="cv-theme">
    <CVShell
      data={data}
      hideEmpty
      wrap={(meta, content) => <Fragment key={meta.key}>{content}</Fragment>}
    />
  </div>
);