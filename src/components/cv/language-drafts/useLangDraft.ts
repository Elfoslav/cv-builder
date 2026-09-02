import { useState } from "react";
import { toast } from "sonner";

/** Case-insensitive, whitespace-trimmed match used to block duplicate names. */
export const sameName = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

export interface MockLang {
  id: string;
  name: string;
}

export interface DraftLangProps {
  languages: MockLang[];
  activeId: string;
  setActiveId: (id: string) => void;
  addLanguage: (name: string, copyFromActive: boolean) => void;
  renameLanguage: (id: string, name: string) => void;
  deleteLanguage: (id: string) => void;
}

export interface LangDraft {
  languages: MockLang[];
  activeId: string;
  setActiveId: (id: string) => void;
  add: (name: string, copyFromActiveOverride?: boolean) => void;
  rename: (name: string) => void;
  del: () => void;
  canDelete: boolean;
  addOpen: boolean;
  setAddOpen: (open: boolean) => void;
  newName: string;
  setNewName: (name: string) => void;
  copyFromActive: boolean;
  setCopyFromActive: (v: boolean) => void;
  renameOpen: boolean;
  setRenameOpen: (open: boolean) => void;
  editName: string;
  setEditName: (name: string) => void;
  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  requestAdd: () => void;
  requestRename: () => void;
  requestDelete: () => void;
}

export type { LangDraft };

const INITIAL: MockLang[] = [
  { id: "en", name: "English" },
  { id: "de", name: "Deutsch" },
  { id: "fr", name: "Français" },
  { id: "ja", name: "日本語" },
];

let counter = 0;
const uid = () => `lang-${++counter}-${Math.random().toString(36).slice(2, 6)}`;

/**
 * Normalizes the real topbar props (languages/activeId/add/rename/delete)
 * into the shared action + dialog-state object every draft consumes.
 * Mirrors `useLangDraft`'s shape, so a draft works identically with mock
 * data on /drafts and with live data in the Index topbar.
 */
export const useDraftActions = (p: DraftLangProps): LangDraft => {
  const [addOpen, setAddOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [editName, setEditName] = useState("");
  const [copyFromActive, setCopyFromActive] = useState(true);

  const active = p.languages.find((l) => l.id === p.activeId);
  const canDelete = p.languages.length > 1;

  const add = (name: string, copyOverride?: boolean) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (p.languages.some((l) => sameName(l.name, trimmed))) {
      toast.error(`A language named "${trimmed}" already exists.`);
      return;
    }
    const shouldCopy = copyOverride ?? copyFromActive;
    p.addLanguage(trimmed, shouldCopy);
    setNewName("");
    setAddOpen(false);
    toast.success(`Added "${trimmed}" — you can now translate this version.`);
  };

  const rename = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed || !active) return;
    if (trimmed === active.name) {
      setRenameOpen(false);
      return;
    }
    if (p.languages.some((l) => l.id !== active.id && sameName(l.name, trimmed))) {
      toast.error(`A language named "${trimmed}" already exists.`);
      return;
    }
    p.renameLanguage(active.id, trimmed);
    setRenameOpen(false);
    toast.success(`Renamed to "${trimmed}".`);
  };

  const del = () => {
    if (!canDelete || !active) return;
    p.deleteLanguage(active.id);
    setDeleteOpen(false);
  };

  const requestAdd = () => {
    setNewName("");
    setCopyFromActive(true);
    setAddOpen(true);
  };

  const requestRename = () => {
    setEditName(active?.name ?? "");
    setRenameOpen(true);
  };

  const requestDelete = () => setDeleteOpen(true);

  return {
    languages: p.languages,
    activeId: p.activeId,
    setActiveId: p.setActiveId,
    add, rename, del, canDelete,
    addOpen, setAddOpen, newName, setNewName,
    copyFromActive, setCopyFromActive,
    renameOpen, setRenameOpen, editName, setEditName,
    deleteOpen, setDeleteOpen,
    requestAdd, requestRename, requestDelete,
  };
};

/**
 * State + actions shared by every language-switcher draft (mock data).
 */
export const useLangDraft = () => {
  const [languages, setLanguages] = useState<MockLang[]>(INITIAL);
  const [activeId, setActiveId] = useState(INITIAL[0].id);

  const addLanguage = (_name: string, _copy?: boolean) =>
    setLanguages((ls) => [...ls, { id: uid(), name: _name }]);
  const renameLanguage = (id: string, name: string) =>
    setLanguages((ls) => ls.map((l) => (l.id === id ? { ...l, name } : l)));
  const deleteLanguage = (id: string) => {
    setLanguages((ls) => {
      const next = ls.filter((l) => l.id !== id);
      if (next.length < ls.length) {
        setActiveId((prev) => (prev === id ? next[0].id : prev));
      }
      return next;
    });
  };

  return useDraftActions({
    languages, activeId, setActiveId,
    addLanguage, renameLanguage, deleteLanguage,
  });
};

/** Adapts a `useLangDraft()` result into the real-props shape. */
export const toDraftProps = (m: LangDraft): DraftLangProps => ({
  languages: m.languages,
  activeId: m.activeId,
  setActiveId: m.setActiveId,
  addLanguage: (name, copy) => m.add(name, copy),
  renameLanguage: (id, name) => m.rename(name),
  deleteLanguage: () => m.del(),
});
