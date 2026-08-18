import { useState } from "react";
import { CVData, defaultCV } from "@/lib/cv-types";
import { useCVActions } from "@/components/cv/editor/use-cv-actions";

export { useCVActions };
export type { CVActions, ListKey, SectionKey } from "@/components/cv/editor/use-cv-actions";
export { blankItem, ITEM_LABEL } from "@/components/cv/editor/use-cv-actions";

export const useDraftData = () => {
  const [data, setData] = useState<CVData>(() => JSON.parse(JSON.stringify(defaultCV)));
  const helpers = useCVActions(setData);
  const reset = () => setData(JSON.parse(JSON.stringify(defaultCV)));
  return { data, helpers, reset };
};
