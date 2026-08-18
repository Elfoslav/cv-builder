import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Check, Plus, Pencil, Trash2 } from "lucide-react";
import { type LangDraft } from "./useLangDraft";

interface LangMenuContentProps {
  m: LangDraft;
}

/** Shared dropdown body: switch language, then add / rename / delete actions. */
export const LangMenuContent = ({ m }: LangMenuContentProps) => (
  <>
    <DropdownMenuLabel className="text-xs text-muted-foreground">Language</DropdownMenuLabel>
    {m.languages.map((l) => (
      <DropdownMenuItem key={l.id} onSelect={() => m.setActiveId(l.id)}>
        <span className="flex-1 truncate">{l.name}</span>
        {l.id === m.activeId && <Check className="h-3.5 w-3.5 text-primary" />}
      </DropdownMenuItem>
    ))}
    <DropdownMenuSeparator />
    <DropdownMenuItem onSelect={m.requestAdd}>
      <Plus className="mr-2 h-3.5 w-3.5" /> Add language…
    </DropdownMenuItem>
    <DropdownMenuItem onSelect={m.requestRename}>
      <Pencil className="mr-2 h-3.5 w-3.5" /> Rename…
    </DropdownMenuItem>
    <DropdownMenuItem
      onSelect={m.requestDelete}
      disabled={!m.canDelete}
      className="text-destructive focus:text-destructive"
    >
      <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete…
    </DropdownMenuItem>
  </>
);

/** Shared add / rename / delete dialogs used by every draft. */
export const LangDialogs = ({ m }: LangMenuContentProps) => (
  <>
    <Dialog open={m.addOpen} onOpenChange={m.setAddOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add language</DialogTitle>
          <DialogDescription>Create a separate CV version in another language.</DialogDescription>
        </DialogHeader>
        <Input
          value={m.newName}
          onChange={(e) => m.setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && m.add(m.newName)}
          placeholder="e.g. Deutsch, Français, 日本語"
          maxLength={40}
          autoFocus
        />
        <DialogFooter>
          <Button variant="ghost" onClick={() => m.setAddOpen(false)}>Cancel</Button>
          <Button onClick={() => m.add(m.newName)}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog open={m.renameOpen} onOpenChange={m.setRenameOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename language</DialogTitle>
        </DialogHeader>
        <Input
          value={m.editName}
          onChange={(e) => m.setEditName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && m.rename(m.editName)}
          maxLength={40}
          autoFocus
        />
        <DialogFooter>
          <Button variant="ghost" onClick={() => m.setRenameOpen(false)}>Cancel</Button>
          <Button onClick={() => m.rename(m.editName)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <AlertDialog open={m.deleteOpen} onOpenChange={m.setDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this language?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently removes this language version of your CV. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={m.del}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
);
