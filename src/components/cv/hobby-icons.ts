import {
  Award, Baby, Bike, BookOpen, Brain, Briefcase, Calculator, Camera,
  Cat, ChartBar, ChefHat, Code2, Coffee, Database, Dog, Dumbbell,
  Fish, Flower2, Globe, GraduationCap, Heart, Languages, Leaf, Lightbulb,
  Megaphone, Microscope, Music, Paintbrush, Palette, PawPrint, PenLine, PenTool,
  Scissors, Settings, Shield, Smartphone, Sprout, Stethoscope, Terminal, Truck,
  Users, Utensils, Video, Wrench, Mountain, Gamepad2, Book, Plane,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { type Hobby } from "@/lib/cv-types";

export const ICON_MAP: Record<Exclude<Hobby["icon"], "none">, LucideIcon> = {
  Award, Baby, Bike, BookOpen, Brain, Briefcase, Calculator, Camera,
  Cat, ChartBar, ChefHat, Code2, Coffee, Database, Dog, Dumbbell,
  Fish, Flower2, Globe, GraduationCap, Heart, Languages, Leaf, Lightbulb,
  Megaphone, Microscope, Music, Paintbrush, Palette, PawPrint, PenLine, PenTool,
  Scissors, Settings, Shield, Smartphone, Sprout, Stethoscope, Terminal, Truck,
  Users, Utensils, Video, Wrench, Mountain, Gamepad2, Book, Plane,
};

