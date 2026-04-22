export type SkillColor = "green" | "cyan" | "purple" | "yellow" | "pink";

export interface SkillGroup {
  id: string;
  name: string;
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;
  color: SkillColor;
  /** ID of the SkillGroup this skill belongs to */
  group: string;
}

export interface Experience {
  id: string;
  period: string;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: string;
}

export interface Education {
  id: string;
  period: string;
  title: string;
  school: string;
  location: string;
  description: string;
  tags: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string;
  stars?: number;
  repo?: string;
  link?: string;
}

export interface Hobby {
  id: string;
  label: string;
  icon: "Mountain" | "Coffee" | "Music" | "Code2" | "Gamepad2" | "Book" | "Camera" | "Bike" | "Plane" | "Dumbbell" | "Flower2";
}

export interface CVData {
  name: string;
  role: string;
  bio: string;
  about: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  skillGroups: SkillGroup[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  hobbies: Hobby[];
}

export const defaultCV: CVData = {
  name: "Alex Morgan",
  role: "Senior Full-Stack Engineer",
  bio: "I build performant, accessible web applications with a focus on developer experience. Passionate about clean code, distributed systems, and shipping products that make a difference.",
  about:
    "I'm a software engineer with 8+ years of experience designing and shipping web platforms used by millions. I love turning hard problems into elegant abstractions and mentoring engineers to do their best work.\n\nMy sweet spot is the seam between product and infrastructure — building high-leverage tools, polishing developer experience, and obsessing over the last 5% of UX that turns a good product into a great one.",
  email: "alex@morgan.dev",
  phone: "+1 (555) 234-7890",
  location: "Berlin, Germany",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  skillGroups: [
    { id: "g_lang", name: "Programming Languages" },
    { id: "g_tools", name: "Tools & Technologies" },
  ],
  skills: [
    { id: "s1", name: "TypeScript", percentage: 95, color: "cyan", group: "g_lang" },
    { id: "s2", name: "Python", percentage: 88, color: "yellow", group: "g_lang" },
    { id: "s3", name: "Go", percentage: 78, color: "green", group: "g_lang" },
    { id: "s4", name: "Rust", percentage: 65, color: "pink", group: "g_lang" },
    { id: "s5", name: "React / Next.js", percentage: 96, color: "cyan", group: "g_tools" },
    { id: "s6", name: "Node.js", percentage: 92, color: "green", group: "g_tools" },
    { id: "s7", name: "PostgreSQL", percentage: 85, color: "purple", group: "g_tools" },
    { id: "s8", name: "Docker / K8s", percentage: 80, color: "yellow", group: "g_tools" },
  ],
  experience: [
    {
      id: "e1",
      period: "2022 — Present",
      title: "Senior Software Engineer",
      company: "Vercel",
      location: "Remote",
      description:
        "Lead engineer on the build pipeline team. Reduced average build times by 42% across the platform and shipped incremental static regeneration for millions of sites. Mentored 5 junior engineers.",
      tags: "Next.js, Edge Runtime, TypeScript, Turborepo",
    },
    {
      id: "e2",
      period: "2019 — 2022",
      title: "Full-Stack Engineer",
      company: "Stripe",
      location: "Berlin",
      description:
        "Built developer-facing tooling for the Stripe Dashboard, including the API logs viewer used by 200k+ developers. Owned end-to-end the redesign of the webhook delivery system.",
      tags: "Ruby, React, GraphQL, PostgreSQL",
    },
  ],
  education: [
    {
      id: "ed1",
      period: "2013 — 2017",
      title: "B.Sc. Computer Science",
      school: "Technical University of Munich",
      location: "Munich, Germany",
      description:
        "Graduated with honors (1.3 GPA). Thesis on distributed consensus algorithms. Teaching assistant for Data Structures and Algorithms.",
      tags: "Distributed Systems, Algorithms, Compilers",
    },
  ],
  projects: [
    {
      id: "p1",
      name: "orbit-cli",
      description:
        "A blazing-fast TypeScript monorepo task runner written in Rust. Drop-in replacement for turbo with smarter caching.",
      stack: "Rust, Node.js, Tokio",
      stars: 3400,
      repo: "https://github.com",
    },
    {
      id: "p2",
      name: "kanban-zero",
      description:
        "Local-first project management app with end-to-end encryption and CRDT-based real-time sync.",
      stack: "TypeScript, Yjs, IndexedDB",
      stars: 1820,
      repo: "https://github.com",
      link: "https://example.com",
    },
  ],
  hobbies: [
    { id: "h1", label: "Mountain biking", icon: "Mountain" },
    { id: "h2", label: "Specialty coffee", icon: "Coffee" },
    { id: "h3", label: "Synthwave", icon: "Music" },
    { id: "h4", label: "Open source", icon: "Code2" },
    { id: "h5", label: "Indie games", icon: "Gamepad2" },
  ],
};

export const HOBBY_ICONS: Hobby["icon"][] = [
  "Mountain", "Coffee", "Music", "Code2", "Gamepad2", "Book", "Camera", "Bike", "Plane", "Dumbbell", "Flower2",
];

export const SKILL_COLORS: SkillColor[] = ["green", "cyan", "purple", "yellow", "pink"];
