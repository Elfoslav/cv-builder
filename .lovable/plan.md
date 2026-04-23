

## Fix data persistence + remove Reset button

### Problem
You're reporting that fields like phone, address, social links, experience, education, projects, and hobbies don't persist after a reload. After reviewing `src/lib/use-cv-data.ts`, `src/components/cv/CVEditor.tsx`, and `src/pages/Index.tsx`, the save flow looks correct in theory (every edit calls `setData` → `setStore` → a `useEffect` writes to `localStorage`), but there are real issues that can cause silent data loss:

1. **Silent failures.** The `useEffect` that writes to `localStorage` swallows all errors with an empty `catch {}`. If a write ever throws (quota exceeded, private mode, sandboxed iframe), the user has no idea.
2. **Initial-mount overwrite risk.** `useState(() => loadStore())` reads from storage, then the `useEffect` writes the same value back on mount. If `loadStore` ever returns the default CV (e.g., because `JSON.parse` threw silently on slightly-malformed legacy data), the effect immediately overwrites the real saved data with defaults — a one-way data loss.
3. **`migrateData` spread.** `{ ...defaultCV, ...parsed }` replaces the entire `data` object on every load. It works for present fields, but if any rare edge case yields `parsed = {}`, all user data is replaced by defaults and then re-saved.
4. **Reset button is dangerous.** The toolbar has a Reset icon next to Import/Export with no confirmation — one accidental click wipes the active language CV.

### Fix

**`src/lib/use-cv-data.ts`** — make persistence robust and observable
- Track a `loaded` ref so the save effect does **not** run until after the first successful load. This eliminates the initial-mount round-trip that can overwrite valid storage with defaults.
- Replace the silent `catch {}` blocks with `console.error` calls so any storage failure is visible in the console.
- In `migrateData`, only fill in missing top-level fields (per-key fallback) instead of a blanket `{ ...defaultCV, ...parsed }` spread. User values — including empty strings — are preserved verbatim.
- If `JSON.parse` fails for the v2 store, do **not** silently fall back to defaults; log the raw value and keep whatever can be salvaged. As a safety net, also keep a rolling backup key (`cv-builder-data-v2.bak`) written before each save so a corrupted main key can be recovered.

**`src/components/cv/CVEditor.tsx`** — remove the Reset button
- Remove the `RotateCcw` icon button and its `reset()` handler from the toolbar.
- Remove the now-unused `RotateCcw` import and the `reset` prop from `CVEditorProps`.
- Keep Export and Import JSON (those are explicit, safe actions).

**`src/pages/Index.tsx`** — stop passing `reset`
- Remove `reset` from the `useCVData()` destructure usage in the editor and from the `<CVEditor />` props.
- The `reset` function in the hook can stay (unused) or be removed; I'll remove it to keep the API clean.

### Verification after the fix
After deploying, I'll guide you through a quick check:
1. Open the app, edit phone/email/an experience entry.
2. Open DevTools → Application → Local Storage → look for `cv-builder-data-v2`. Confirm your edits are present in the JSON.
3. Hard-reload. Confirm fields are still populated.
4. If anything is still lost, the console will now show the exact storage error (quota, security, etc.), and we'll address it from there.

### Files touched
- `src/lib/use-cv-data.ts` — robust load/save, per-key migration, backup key, no-op until loaded, surface errors
- `src/components/cv/CVEditor.tsx` — remove Reset button + unused import + unused prop
- `src/pages/Index.tsx` — stop passing `reset` to the editor

