# Project conventions

## Component organization

- Every section design variant is its own re-usable component: one file per variant under
  `src/components/cv/themed/<section>/`, exported and named after the variant
  (e.g. `TimelineRows.tsx`, `ProjectsFlatCards.tsx`, `HobbyPills.tsx`).
- A `<Section>View` switcher component (e.g. `TimelineView.tsx`) picks the variant per design id
  and is the only component other modules import.
- All repeated building blocks must be extracted into separate re-usable components — never
  copy markup between files. Shared pieces live in `src/components/cv/`
  (e.g. `CVCard`, `TagPills`, `ListLinks`); repeated helpers live in `cv-utils`.
- Prefer `cn(...)` (clsx + tailwind-merge) when composing class names.

## Architecture

- React 18 + TypeScript + Vite; shadcn/ui on Radix; Tailwind CSS.
- `CVShell` (`src/components/cv/editor/cv-shell.tsx`) is the single CV renderer — the editor,
  the print/PDF `CVPreview`, and the `/drafts` showcase all share it.
- Color themes (`data-theme` CSS tokens) and per-section designs (`data.sectionDesigns`) are
  orthogonal. Theme ids live in `src/lib/themes.ts`, design ids in `src/lib/section-designs.ts`.
- CV data is persisted to `localStorage` via `useCVData` (`src/lib/use-cv-data.ts`).

## Layout

- All page topbars and page-level content share one horizontal container: the `.page-container`
  utility (`mx-auto w-full max-w-7xl px-4`, defined in `src/index.css`). Every page topbar's inner
  wrapper must use `page-container` so the builder, landing, and `/drafts` topbars line up at the
  same width. Wrap page content in `page-container` too (add `print:px-0` on the editor body so print
  stays full-bleed). Do not hardcode a different `max-w-*` for a topbar.
- The builder's scroll container (`overflow-y-auto`) must stay full-width — only its **inner**
  content wrapper should be `page-container`. Putting `page-container` on the scroll element itself
  caps and centers the box, which pushes the scrollbar away from the viewport's right edge.

## Verification

```bash
pnpm test        # vitest
npx tsc --noEmit # type check
pnpm lint        # eslint
pnpm build       # vite build
```