import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Pencil, Trash2, Languages } from "lucide-react";
import { CVLanguage } from "@/lib/use-cv-data";
import { toast } from "@/hooks/use-toast";

interface LanguageSwitcherProps {
  languages: CVLanguage[];
  activeId: string;
  setActiveId: (id: string) => void;
  addLanguage: (name: string, copyFromActive: boolean) => void;
  renameLanguage: (id: string, name: string) => void;
  deleteLanguage: (id: string) => void;
}

export const LanguageSwitcher = ({
  languages, activeId, setActiveId,
  addLanguage, renameLanguage, deleteLanguage,
}: LanguageSwitcherProps) => {
  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [copyFromActive, setCopyFromActive] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");

  const active = languages.find((l) => l.id === activeId);

  const handleAdd = () => {
    const name = newName.trim();
    if (!name) {
      toast({ title: "Name required", description: "Please enter a language name.", variant: "destructive" });
      return;
    }
    addLanguage(name, copyFromActive);
    toast({ title: "Language added", description: `"${name}" CV created.` });
    setNewName("");
    setCopyFromActive(true);
    setAddOpen(false);
  };

  const handleRename = () => {
    const name = editName.trim();
    if (!name || !active) return;
    renameLanguage(active.id, name);
    toast({ title: "Renamed", description: `Language renamed to "${name}".` });
    setEditOpen(false);
  };

  const handleDelete = () => {
    if (!active || languages.length <= 1) return;
    const name = active.name;
    deleteLanguage(active.id);
    toast({ title: "Deleted", description: `"${name}" removed.` });
  };

  return (
    <div className="space-y-2 border-b border-border bg-card/50 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Languages className="h-3.5 w-3.5" />
          <span>Language</span>
        </div>
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            title="Rename current language"
            onClick={() => {
              if (active) {
                setEditName(active.name);
                setEditOpen(true);
              }
            }}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                title="Delete current language"
                disabled={languages.length <= 1}
              >
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete "{active?.name}"?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove this language version of your CV. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost" className="h-7 w-7" title="Add language">
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new language</DialogTitle>
                <DialogDescription>
                  Create a separate CV version for another language. All versions are saved in your browser.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-1.5">
                  <Label htmlFor="lang-name" className="text-xs">Language name</Label>
                  <Input
                    id="lang-name"
                    placeholder="e.g. Deutsch, Français, 日本語"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                    maxLength={40}
                    autoFocus
                  />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={copyFromActive}
                    onCheckedChange={(v) => setCopyFromActive(Boolean(v))}
                  />
                  <span className="text-muted-foreground">
                    Start from current "{active?.name}" CV (recommended for translations)
                  </span>
                </label>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button onClick={handleAdd}>Add language</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename language</DialogTitle>
              </DialogHeader>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRename()}
                maxLength={40}
                autoFocus
              />
              <DialogFooter>
                <Button variant="ghost" onClick={() => setEditOpen(false)}>Cancel</Button>
                <Button onClick={handleRename}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeId} onValueChange={setActiveId} className="w-full">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          {languages.map((l) => (
            <TabsTrigger
              key={l.id}
              value={l.id}
              className="h-7 rounded border border-border bg-background px-2.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              {l.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
