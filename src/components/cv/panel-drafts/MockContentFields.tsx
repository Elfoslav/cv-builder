import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/cv/FieldLabel";
import { Plus } from "lucide-react";

/** Static stand-in for the section's content fields (what the user actually types). */
export const MockContentFields = () => (
  <div className="space-y-3">
    <div>
      <FieldLabel label="Section title" />
      <Input className="h-9 text-sm" defaultValue="Technical Skills" />
    </div>
    <div>
      <FieldLabel label="Skill" />
      <Input className="h-9 text-sm" defaultValue="TypeScript" />
    </div>
    <div>
      <FieldLabel label="Skill" />
      <Input className="h-9 text-sm" defaultValue="React / Next.js" />
    </div>
    <div>
      <FieldLabel label="Skill" />
      <Input className="h-9 text-sm" defaultValue="PostgreSQL" />
    </div>
    <Button variant="outline" size="sm" className="h-7 w-full gap-1.5 border-dashed text-xs" type="button">
      <Plus className="h-3.5 w-3.5" /> Add skill
    </Button>
  </div>
);