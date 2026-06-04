import { createContext, useContext, useEffect, useState } from "react";
import {
  defaultSiteContent,
  defaultTrackStatusItems,
} from "../data/defaultContent";
import {
  createContactMessage,
  createTrackingApplication,
  fetchSiteContent,
  fetchTrackingItems,
  replaceTrackingItems,
  resetSiteContent,
  resetTrackingItems,
  saveSiteContent,
} from "../services/siteContent";

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(defaultSiteContent);
  const [trackingItems, setTrackingItems] = useState(defaultTrackStatusItems);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setError("");
        const [nextContent, nextTrackingItems] = await Promise.all([
          fetchSiteContent(),
          fetchTrackingItems(),
        ]);

        if (!active) {
          return;
        }

        setContent(nextContent);
        setTrackingItems(nextTrackingItems);
      } catch (loadError) {
        if (!active) {
          return;
        }

        setError(loadError.message || "Failed to load site data from Supabase.");
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  async function refreshTrackingItems() {
    const items = await fetchTrackingItems();
    setTrackingItems(items);
    return items;
  }

  async function saveAdminState(nextState) {
    setError("");

    const nextContent = {
      siteMeta: nextState.siteMeta,
      navItems: nextState.navItems,
      heroSlides: nextState.heroSlides,
      quickStats: nextState.quickStats,
      services: nextState.services,
      newsItems: nextState.newsItems,
      aboutSections: nextState.aboutSections,
    };

    const [savedContent, savedTrackingItems] = await Promise.all([
      saveSiteContent(nextContent),
      replaceTrackingItems(nextState.trackStatusItems),
    ]);

    setContent(savedContent);
    setTrackingItems(savedTrackingItems);

    return {
      content: savedContent,
      trackingItems: savedTrackingItems,
    };
  }

  async function resetAdminState() {
    setError("");

    const [resetContent, resetTracking] = await Promise.all([
      resetSiteContent(),
      resetTrackingItems(),
    ]);

    setContent(resetContent);
    setTrackingItems(resetTracking);

    return {
      content: resetContent,
      trackingItems: resetTracking,
    };
  }

  async function submitTrackingApplication(application) {
    setError("");
    const created = await createTrackingApplication(application);
    setTrackingItems((current) => [created, ...current.filter((item) => item.id !== created.id)]);
    return created;
  }

  async function submitContactMessage(message) {
    setError("");
    await createContactMessage(message);
  }

  return (
    <SiteContentContext.Provider
      value={{
        ...content,
        trackingItems,
        isLoading,
        error,
        refreshTrackingItems,
        saveAdminState,
        resetAdminState,
        submitTrackingApplication,
        submitContactMessage,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error("useSiteContent must be used inside SiteContentProvider.");
  }

  return context;
}
