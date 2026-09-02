/** Proficiency levels shown in the skills editor; each maps to a percentage. */
export const LEVELS = ["Expert", "Advanced", "Proficient", "Intermediate", "Beginner"] as const;
export type Level = (typeof LEVELS)[number];

export const percentageToLevel = (p: number): Level => {
  if (p >= 90) return "Expert";
  if (p >= 75) return "Advanced";
  if (p >= 50) return "Proficient";
  if (p >= 25) return "Intermediate";
  return "Beginner";
};

export const levelToPercentage = (l: Level): number => {
  switch (l) {
    case "Expert": return 95;
    case "Advanced": return 80;
    case "Proficient": return 60;
    case "Intermediate": return 35;
    case "Beginner": return 15;
  }
};