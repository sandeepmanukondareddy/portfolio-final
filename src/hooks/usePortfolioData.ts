import { useCallback } from "react";
import { useSiteContent } from "@/context/SiteContentContext";

export function usePortfolioData<T = any>(section: string): [T, (data: T) => void] {
  const content = useSiteContent();
  const data = (content?.[section] ?? null) as T;

  // Read-only in this build (content is edited via /admin and redeployed)
  const updateData = useCallback((_newData: T) => {
    console.warn(
      `[usePortfolioData] "${section}" is read-only at runtime. Edit content via /admin (Git-based CMS) and redeploy.`
    );
  }, [section]);

  return [data, updateData];
}
