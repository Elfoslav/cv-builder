import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { FieldLabel } from "@/components/cv/FieldLabel";
import { CardColumnsPicker } from "@/components/cv/editor/CardColumnsPicker";
import { SECTION_DESIGNS, type PanelDraft } from "./usePanelDraft";
import { cn } from "@/lib/utils";

/**
 * The three design controls that today live inline with the content inputs:
 * Section design + Skill group columns + Skill columns. Rendered in whatever
 * container each draft provides.
 */
export const DesignControls = ({ draft, className }: { draft: PanelDraft; className?: string }) => (
  <div className={cn("space-y-3", className)}>
    <div>
      <FieldLabel label="Section design" />
      <Select value={draft.sectionDesign} onValueChange={draft.setSectionDesign}>
        <SelectTrigger className="h-9 text-xs" aria-label="Section design">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SECTION_DESIGNS.map((o) => (
            <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <CardColumnsPicker
      className="mb-0"
      label="Skill group columns"
      value={draft.groupColumns}
      onChange={draft.setGroupColumns}
    />
    <CardColumnsPicker
      className="mb-0"
      label="Skill columns"
      value={draft.skillColumns}
      onChange={draft.setSkillColumns}
    />
  </div>
);