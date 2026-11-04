import {
  Award, BookOpen, Brain, Briefcase, Calculator, ChartBar, Code2, Database,
  Globe, Languages, Lightbulb, Megaphone, Palette, PenTool, Settings, Shield,
  Smartphone, Terminal, Users, Wrench,
} from "lucide-react";
import { type SkillIconName } from "@/lib/cv-types";

const icons = {
  Award, BookOpen, Brain, Briefcase, Calculator, ChartBar, Code2, Database,
  Globe, Languages, Lightbulb, Megaphone, Palette, PenTool, Settings, Shield,
  Smartphone, Terminal, Users, Wrench,
};

export const SkillIcon = ({ name, className }: { name?: SkillIconName; className?: string }) => {
  const Icon = name && icons[name];
  return Icon ? <Icon aria-hidden="true" className={className} /> : null;
};
