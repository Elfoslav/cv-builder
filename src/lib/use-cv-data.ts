import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CVData, defaultCV } from "./cv-types";

const STORAGE_KEY = "cv-builder-data-v1";

export const useCVData = (): {
  data: CVData;
  setData: Dispatch<SetStateAction<CVData>>;
  reset: () => void;
} => {
  const [data, setData] = useState<CVData>(() => {
    if (typeof window === "undefined") return defaultCV;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultCV;
      const parsed = JSON.parse(raw) as Partial<CVData>;
      return { ...defaultCV, ...parsed };
    } catch {
      return defaultCV;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore quota errors
    }
  }, [data]);

  const reset = () => setData(defaultCV);

  return { data, setData, reset };
};
