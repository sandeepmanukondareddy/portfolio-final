import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultData } from "@/lib/defaultData";

type SiteContent = Record<string, any>;

const SiteContentContext = createContext<SiteContent>(defaultData);

export const SiteContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(defaultData);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        // Cache-bust on deploy via version in JSON. Also avoid stale CDN caching.
        const res = await fetch(`/content/site.json?v=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load content: ${res.status}`);
        const json = await res.json();

        // Merge: prefer JSON, fallback to defaults for any missing keys
        const merged: SiteContent = { ...defaultData, ...json };
        if (!cancelled) setContent(merged);
      } catch (e) {
        // If content file missing, fallback to defaults
        console.warn("Using default content (content/site.json not loaded).", e);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => content, [content]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
};

export const useSiteContent = () => useContext(SiteContentContext);
