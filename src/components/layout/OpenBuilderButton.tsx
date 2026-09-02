import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** The topbar "Open builder →" CTA, shared by the homepage and themes topbars. */
export function OpenBuilderButton({ className }: { className?: string }) {
  return (
    <Button asChild size="sm" className={cn("shadow-sm", className)}>
      <Link to="/resume-builder">
        Open builder
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  );
}
