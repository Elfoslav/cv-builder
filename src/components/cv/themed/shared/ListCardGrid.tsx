import { Fragment, type ReactNode } from "react";
import { type CardColumns } from "@/lib/cv-types";
import { cardGridClass } from "@/components/cv/cv-utils";

interface ListCardGridProps<T> {
  items: readonly T[];
  /** Extracts a stable key from an item (used as the grid cell key). */
  getKey: (item: T) => string;
  /** Number of columns for the card grid; 1 stacks the cards. */
  columns?: CardColumns;
  /** Class for the grid when it collapses to a single column. */
  stackedClass?: string;
  /** Renders the card element for a single item. */
  render: (item: T) => ReactNode;
}

/**
 * Responsive card grid shared by every card variant (list sections and
 * hobbies). Callers provide only the per-item card markup.
 * Grid items have `break-inside: avoid` via their classes; the
 * `.page-gutter` wrapper (with negative margin compensation) is NOT used here
 * because it breaks grid row spacing (negative margins are included in
 * grid track sizing). Grid items rely on `break-inside: avoid` from their
 * component classes and accept flush positioning on page breaks.
 */
export const ListCardGrid = <T,>({
  items, getKey, columns = 1, stackedClass = "space-y-3", render,
}: ListCardGridProps<T>) => (
  <div className={cardGridClass(columns, stackedClass)}>
    {items.map((item) => (
      <Fragment key={getKey(item)}>{render(item)}</Fragment>
    ))}
  </div>
);