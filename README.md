# CV Builder

A client-side resume/CV builder with in-place section editing, multi-language CVs,
color themes, per-section design variants, and print/PDF export.

Everything runs in the browser: data is stored in `localStorage`, PDFs are produced
through the browser print pipeline, and no backend is required.

## Features

- **In-place editing** — every section has an *Edit* pill; opening one shows a side form
  (and expands the CV to full width so the preview keeps room). Sections can be reordered.
- **8 editable sections** — profile header (hero), about, experience, education, skills,
  projects, hobbies, and footer. Individual entries can be added/removed inline.
- **Color themes** — 8 global palettes (`indigo`, `classic`, `minimal`, `earthy`, `ocean`,
  `sunset`, `forest`, `slate`) applied via `data-theme` CSS tokens. Pure re-skin, no JS changes.
- **Per-section designs** — each section has its own layout choice (e.g. skills as
  bars/chips/dot-list, experience as timeline/cards/rows, projects as cards/rows/timeline),
  orthogonal to the color theme.
- **Multi-language CVs** — create/rename/delete language variants, optionally seeded by
  copying the active CV. Export each language to its own PDF, or all at once.
- **Export** — Print, single PDF (via "Save as PDF"), or PDF for every language.
  JSON export/import for data portability.
- **Design drafts showcase** — `/drafts` page renders each theme with its curated
  section designs.

## Tech stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 3 with `tailwindcss-animate`
- [shadcn/ui](https://ui.shadcn.com/) components on [Radix UI](https://www.radix-ui.com/)
- [React Router](https://reactrouter.com/) for `/` and `/drafts`
- [Vitest](https://vitest.dev/) + Testing Library for tests

## Getting started

Requires Node.js and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

Then open the printed URL (default `http://localhost:5173`).

## Scripts

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `pnpm dev`         | Start the dev server               |
| `pnpm build`       | Production build → `dist/`         |
| `pnpm preview`     | Preview the production build       |
| `pnpm test`        | Run vitest once                    |
| `pnpm test:watch`  | Run vitest in watch mode           |
| `pnpm lint`        | Run ESLint                         |

## How the theming works

Two orthogonal concepts:

- **Color theme** — a whole-resume palette. `src/lib/themes.ts` declares the theme ids and
  metadata; the CSS `[data-theme="…"] { --primary: … }` blocks in `src/index.css` define the
  tokens. Components style themselves from shared HSL tokens, and the wrapper element gets
  `data-theme` plus the `cv-theme` class, so swapping the attribute re-skins the resume.
- **Section design** — a per-section layout, stored on the CV data under
  `data.sectionDesigns` (`src/lib/section-designs.ts`). Each section's edit panel has a
  `DesignPicker`; the design ids (e.g. `cards-gradient`) are shared across sections.

The unified renderer is `CVShell` (`src/components/cv/editor/cv-shell.tsx`) — the editor,
the pure-print `CVPreview`, and the `/drafts` showcase all render the same markup from the
same data.

## Data model & persistence

- The store (`cv-builder-data-v2`) is a JSON object in `localStorage` with `language` + `theme` +
  `activeId`, written via `useCVData` (`src/lib/use-cv-data.ts`).
- A rolling backup key is written *before* the main key on every save, and load falls back to
  the backup, then to the legacy single-CV key.
- `migrateData` handles schema evolution (old `"cards"` design ids → `"cards-gradient"`, legacy
  skill groups → `skillGroups`), so older saved data keeps working.
- JSON export/import round-trips the active CV (`src/pages/Index.tsx`).

## PDF export

`exportElementToPDF` (`src/lib/export-pdf.ts`) renders a clean `CVPreview` of the requested
language into an off-screen DOM node, waits for layout to settle, then invokes the browser
print dialog with the CV's own print styles (`@media print` in `src/index.css`). Choose
"Save as PDF" in the dialog.