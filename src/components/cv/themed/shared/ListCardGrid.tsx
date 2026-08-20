import { Fragment, type ReactNode } from "react";
import { type CardColumns } from "@/lib/cv-types";
import { cardGridClass } from "@/components/cv/cv-utils";
import { type ListEntry } from "./types";

interface ListCardGridProps {
  items: ListEntry[];
  /** Number of columns for the card grid; 1 stacks the cards. */
  columns?: CardColumns;
  /** Renders the card element for a single entry. */
  render: (entry: ListEntry) => ReactNode;
}

/**
 * Responsive card grid shared by every gradient/flat/accent card variant.
 * Callers provide only the per-entry card markup.
 */
export const ListCardGrid = ({ items, columns = 1, render }: ListCardGridProps) => (
  <div className={cardGridClass(columns, "space-y-3")}>
    {items.map((e) => (
      <Fragment key={e.id}>{render(e)}</Fragment>
    ))}
  </div>
);