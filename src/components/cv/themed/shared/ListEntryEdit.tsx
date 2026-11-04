import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type ListEntry } from "./types";

export const ListEntryEdit = ({ entry }: { entry: ListEntry }) => entry.onEdit ? (
  <div className="mb-2 flex justify-end print:hidden">
    <Button type="button" variant="outline" size="sm" className="h-8 gap-1.5" onClick={entry.onEdit} aria-label={`Edit ${entry.title || "entry"}`}>
      <Pencil className="h-3.5 w-3.5" /> Edit
    </Button>
  </div>
) : null;
