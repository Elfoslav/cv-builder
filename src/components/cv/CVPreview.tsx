import { Fragment } from "react";
import { CVData } from "@/lib/cv-types";
import { CVShell } from "@/components/cv/editor/cv-shell";

interface CVPreviewProps {
  data: CVData;
  onDownload?: () => void;
}

/**
 * Clean render used for printing and PDF export. Renders the exact same
 * CVShell markup as the on-screen editor — so skills, projects, hobbies and
 * the footer keep the same layout as on the page — but hides empty sections
 * and carries no editing affordances.
 */
export const CVPreview = ({ data, onDownload }: CVPreviewProps) => (
  <CVShell
    data={data}
    onDownload={onDownload}
    hideEmpty
    wrap={(meta, content) => <Fragment key={meta.key}>{content}</Fragment>}
  />
);
