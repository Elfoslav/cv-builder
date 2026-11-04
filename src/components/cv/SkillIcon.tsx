import {
  Award, Baby, Bike, BookOpen, Brain, Briefcase, Calculator, Camera,
  Cat, ChartBar, ChefHat, Code2, Coffee, Database, Dog, Dumbbell,
  Fish, Flower2, Globe, GraduationCap, Heart, Languages, Leaf, Lightbulb,
  Megaphone, Microscope, Music, Paintbrush, Palette, PawPrint, PenLine, PenTool,
  Scissors, Settings, Shield, Smartphone, Sprout, Stethoscope, Terminal, Truck,
  Users, Utensils, Video, Wrench,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { type SkillIconName } from "@/lib/cv-types";

const icons: Record<SkillIconName, LucideIcon> = {
  Award, Baby, Bike, BookOpen, Brain, Briefcase, Calculator, Camera,
  Cat, ChartBar, ChefHat, Code2, Coffee, Database, Dog, Dumbbell,
  Fish, Flower2, Globe, GraduationCap, Heart, Languages, Leaf, Lightbulb,
  Megaphone, Microscope, Music, Paintbrush, Palette, PawPrint, PenLine, PenTool,
  Scissors, Settings, Shield, Smartphone, Sprout, Stethoscope, Terminal, Truck,
  Users, Utensils, Video, Wrench,
};

export const SkillIcon = ({ name, className }: { name?: SkillIconName; className?: string }) => {
  const Icon = name && icons[name];
  return Icon ? <Icon aria-hidden="true" className={className} /> : null;
};
