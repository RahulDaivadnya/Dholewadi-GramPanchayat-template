import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Settings,
  Menu,
  Image,
  TrendingUp,
  Briefcase,
  Newspaper,
  BookOpen,
  ClipboardList,
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  Clock,
  Coins,
  Globe,
  PlusCircle,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Search
} from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";

function AdminPanel() {
  const navigate = useNavigate();
  const {
    siteMeta: loadedSiteMeta,
    navItems: loadedNavItems,
    heroSlides: loadedHeroSlides,
    quickStats: loadedQuickStats,
    services: loadedServices,
    newsItems: loadedNewsItems,
    aboutSections: loadedAboutSections,
    trackingItems: loadedTrackingItems,
    isLoading,
    error,
    saveAdminState,
    resetAdminState,
  } = useSiteContent();
  const [activeTab, setActiveTab] = useState("identity");
  const [showSavedNotification, setShowSavedNotification] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const [siteMeta, setSiteMeta] = useState(loadedSiteMeta);
  const [navItems, setNavItems] = useState(loadedNavItems);
  const [heroSlides, setHeroSlides] = useState(loadedHeroSlides);
  const [quickStats, setQuickStats] = useState(loadedQuickStats);
  const [services, setServices] = useState(loadedServices);
  const [newsItems, setNewsItems] = useState(loadedNewsItems);
  const [aboutSections, setAboutSections] = useState(loadedAboutSections);
  const [trackStatusItems, setTrackStatusItems] = useState(loadedTrackingItems);

  useEffect(() => {
    setSiteMeta(loadedSiteMeta);
    setNavItems(loadedNavItems);
    setHeroSlides(loadedHeroSlides);
    setQuickStats(loadedQuickStats);
    setServices(loadedServices);
    setNewsItems(loadedNewsItems);
    setAboutSections(loadedAboutSections);
    setTrackStatusItems(loadedTrackingItems);
  }, [
    loadedSiteMeta,
    loadedNavItems,
    loadedHeroSlides,
    loadedQuickStats,
    loadedServices,
    loadedNewsItems,
    loadedAboutSections,
    loadedTrackingItems,
  ]);

  // UX states for Civic Services tab
  const [expandedServiceId, setExpandedServiceId] = useState(null);
  const [serviceSearchQuery, setServiceSearchQuery] = useState("");

  // Tabs Configuration
  const tabs = [
    { id: "identity", label: "Site Identity", icon: Settings, description: "Manage Gram Panchayat name, contacts, and address" },
    { id: "navigation", label: "Navigation Links", icon: Globe, description: "Edit header navigation labels and paths" },
    { id: "hero", label: "Hero Banner", icon: Image, description: "Configure home page slideshow images and titles" },
    { id: "stats", label: "Quick Statistics", icon: TrendingUp, description: "Manage population and responsive stats counters" },
    { id: "services", label: "Civic Services", icon: Briefcase, description: "Add/edit certificates, tax forms, process steps" },
    { id: "news", label: "News & Notices", icon: Newspaper, description: "Publish and update village announcements" },
    { id: "about", label: "About Page", icon: BookOpen, description: "Write village overview and objectives" },
    { id: "tracking", label: "Track Status Data", icon: ClipboardList, description: "Pre-populate application track status database" },
  ];

  // Actions
  const handleSaveAll = async () => {
    setSaveError("");
    setIsSaving(true);

    try {
      await saveAdminState({
        siteMeta,
        navItems,
        heroSlides,
        quickStats,
        services,
        newsItems,
        aboutSections,
        trackStatusItems,
      });

      setShowSavedNotification(true);
      setTimeout(() => {
        setShowSavedNotification(false);
      }, 1500);
    } catch (saveAllError) {
      setSaveError(saveAllError.message || "Failed to save data to Supabase.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    setSaveError("");
    setIsResetting(true);

    try {
      await resetAdminState();
      setShowResetConfirm(false);
    } catch (resetError) {
      setSaveError(resetError.message || "Failed to reset Supabase data.");
    } finally {
      setIsResetting(false);
    }
  };

  // Helper change handlers
  const handleMetaChange = (field, val) => {
    setSiteMeta((prev) => ({ ...prev, [field]: val }));
  };

  const updateNavItem = (index, field, val) => {
    const updated = [...navItems];
    updated[index][field] = val;
    setNavItems(updated);
  };

  const addNavItem = () => {
    setNavItems([...navItems, { label: "New Link", path: "/new-route" }]);
  };

  const deleteNavItem = (index) => {
    setNavItems(navItems.filter((_, i) => i !== index));
  };

  const updateHeroSlide = (index, field, val) => {
    const updated = [...heroSlides];
    updated[index][field] = val;
    setHeroSlides(updated);
  };

  const addHeroSlide = () => {
    const nextId = heroSlides.length ? Math.max(...heroSlides.map(s => s.id)) + 1 : 1;
    setHeroSlides([
      ...heroSlides,
      {
        id: nextId,
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
        title: "New Banner Slide Title",
        subtitle: "Enter description text for this banner slide."
      }
    ]);
  };

  const deleteHeroSlide = (index) => {
    setHeroSlides(heroSlides.filter((_, i) => i !== index));
  };

  const updateStatItem = (index, field, val) => {
    const updated = [...quickStats];
    updated[index][field] = val;
    setQuickStats(updated);
  };

  // Service list dynamic modifiers
  const updateServiceField = (index, field, val) => {
    const updated = [...services];
    updated[index][field] = val;
    setServices(updated);
  };

  const deleteService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const addService = () => {
    const nextId = services.length ? Math.max(...services.map(s => s.id)) + 1 : 1;
    setServices([
      ...services,
      {
        id: nextId,
        slug: `new-service-${nextId}`,
        name: "New Custom Service",
        category: "Certificates",
        description: "Short descriptive summary of the service.",
        fullDescription: "Long form detailed description of this service and who should apply.",
        processingTime: "5 working days",
        fee: "Rs. 20",
        isOnline: true,
        eligibility: ["Applicant criteria item"],
        documents: [{ name: "Document Title", description: "Details of document" }],
        process: [{ title: "Step 1 Title", description: "Step 1 details" }]
      }
    ]);
    setExpandedServiceId(nextId);
  };


  // News list dynamic modifiers
  const updateNewsField = (index, field, val) => {
    const updated = [...newsItems];
    updated[index][field] = val;
    setNewsItems(updated);
  };

  const addNewsItem = () => {
    const nextId = newsItems.length ? Math.max(...newsItems.map(n => n.id)) + 1 : 1;
    setNewsItems([
      ...newsItems,
      {
        id: nextId,
        title: "Upcoming Community Notice",
        summary: "Enter a brief summary of the village announcement here.",
        publishedAt: new Date().toISOString().split("T")[0],
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80"
      }
    ]);
  };

  const deleteNewsItem = (index) => {
    setNewsItems(newsItems.filter((_, i) => i !== index));
  };

  // About page sections modifiers
  const updateAboutSection = (index, field, val) => {
    const updated = [...aboutSections];
    updated[index][field] = val;
    setAboutSections(updated);
  };

  const addAboutSection = () => {
    setAboutSections([...aboutSections, { title: "New Section Title", body: "Description of the section contents goes here." }]);
  };

  const deleteAboutSection = (index) => {
    setAboutSections(aboutSections.filter((_, i) => i !== index));
  };

  // Track status items modifiers
  const updateTrackItem = (index, field, val) => {
    const updated = [...trackStatusItems];
    updated[index][field] = val;
    setTrackStatusItems(updated);
  };

  const addTrackItem = () => {
    setTrackStatusItems([
      ...trackStatusItems,
      {
        id: `GP-${Math.floor(1000 + Math.random() * 9000)}`,
        mobile: "9876543210",
        service: "Birth Certificate",
        status: "pending",
        remarks: "Application received and under review"
      }
    ]);
  };

  const deleteTrackItem = (index) => {
    setTrackStatusItems(trackStatusItems.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-8">
      {/* Top Banner Status Messages */}
      {showSavedNotification && (
        <div className="fixed inset-x-4 top-4 z-50 mx-auto max-w-md rounded-2xl bg-teal-600 p-4 text-white shadow-xl flex items-center gap-3 animate-bounce">
          <CheckCircle className="h-6 w-6 shrink-0" />
          <div>
            <div className="font-bold">Settings Saved Successfully!</div>
            <div className="text-xs text-teal-100">Refreshing application data...</div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Overlay */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">Reset to Defaults?</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              This will overwrite your Supabase content with the default template data. This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isResetting}
                className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
                onClick={handleResetDefaults}
              >
                {isResetting ? "Resetting..." : "Yes, Reset All"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container-shell">
        {/* Breadcrumb Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-semibold">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-1 hover:text-teal-600 transition"
              >
                <ArrowLeft className="h-4 w-4" /> Home
              </button>
              <span>/</span>
              <span className="text-teal-600">Admin Control Panel</span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Settings className="h-8 w-8 text-teal-600" />
              Gram Panchayat Admin Portal
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Configure and modify your Gram Panchayat website details. Changes are now saved in Supabase.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowResetConfirm(true)}
              disabled={isSaving || isResetting}
              className="inline-flex items-center gap-2 rounded-2xl bg-white border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-rose-50 hover:text-rose-600"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Defaults
            </button>
            <button
              onClick={handleSaveAll}
              disabled={isSaving || isResetting}
              className="inline-flex items-center gap-2 rounded-2xl bg-teal-700 px-6 py-3 text-sm font-bold text-white shadow-md shadow-teal-700/10 transition hover:bg-teal-800 hover:shadow-lg"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save All Changes"}
            </button>
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {error}
          </div>
        ) : null}

        {saveError ? (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {saveError}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
            Loading Supabase content...
          </div>
        ) : null}

        {/* Dashboard Layout */}
        {!isLoading ? (
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Left Sidebar Navigation */}
          <aside className="space-y-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Data Categories
              </div>
              <nav className="mt-2 space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-bold transition-all ${active
                          ? "bg-teal-50 text-teal-800 border-l-4 border-teal-600 pl-2.5"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                    >
                      <Icon className={`h-5 w-5 ${active ? "text-teal-700" : "text-slate-400"}`} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="rounded-2xl bg-gradient-to-tr from-teal-700 to-cyan-800 p-4 text-white shadow-soft">
              <Info className="h-6 w-6 text-amber-400" />
              <h4 className="mt-2 text-sm font-bold">Template Mode</h4>
              <p className="mt-1 text-xs leading-relaxed text-teal-100">
                You can add or remove elements. When saving, the site will reload and show your local customisations instantly!
              </p>
            </div>
          </aside>

          {/* Form Editing Workspace */}
          <main className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
            {/* Tab Header Info */}
            <div className="border-b border-slate-100 pb-5 mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {tabs.find((t) => t.id === activeTab)?.description}
              </p>
            </div>

            {/* TAB CONTENT: SITE IDENTITY */}
            {activeTab === "identity" && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Gram Panchayat Title
                    </label>
                    <input
                      type="text"
                      value={siteMeta.name}
                      onChange={(e) => handleMetaChange("name", e.target.value)}
                      placeholder="e.g., Gram Panchayat Name"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                    />
                    <span className="text-xs text-slate-400 mt-1 block">
                      e.g., *Gram Panchayat Name* or *Dholewadi Gram Panchayat*
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Village Name
                    </label>
                    <input
                      type="text"
                      value={siteMeta.villageName}
                      onChange={(e) => handleMetaChange("villageName", e.target.value)}
                      placeholder="e.g., Dholewadi"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                    />
                    <span className="text-xs text-slate-400 mt-1 block">
                      e.g., *Dholewadi*
                    </span>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Helpline Number
                    </label>
                    <input
                      type="text"
                      value={siteMeta.phone}
                      onChange={(e) => handleMetaChange("phone", e.target.value)}
                      placeholder="e.g., +91 93733 56931"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                    />
                    <span className="text-xs text-slate-400 mt-1 block">
                      e.g., *+91 93733 56931*
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={siteMeta.email}
                      onChange={(e) => handleMetaChange("email", e.target.value)}
                      placeholder="e.g., gpdholewadi415408@gmail.com"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                    />
                    <span className="text-xs text-slate-400 mt-1 block">
                      e.g., *gpdholewadi415408@gmail.com*
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Office / Village Address
                  </label>
                  <textarea
                    rows={3}
                    value={siteMeta.address}
                    onChange={(e) => handleMetaChange("address", e.target.value)}
                    placeholder="e.g., Tal. Shirala, Dist. Sangli, Maharashtra 415408"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition resize-none"
                  />
                  <span className="text-xs text-slate-400 mt-1 block">
                    e.g., *Tal. Shirala, Dist. Sangli, Maharashtra 415408*
                  </span>
                </div>
              </div>
            )}

            {/* TAB CONTENT: NAVIGATION LINKS */}
            {activeTab === "navigation" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-500">Navigation Nodes</span>
                  <button
                    onClick={addNavItem}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-3 py-2 rounded-lg hover:bg-teal-100 transition"
                  >
                    <Plus className="h-4 w-4" /> Add Nav Item
                  </button>
                </div>

                <div className="space-y-3">
                  {navItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 items-center border border-slate-200 p-4 rounded-xl bg-slate-50/50 shadow-sm"
                    >
                      <div className="grid grid-cols-2 gap-4 flex-1">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                            Link Label (e.g., Home)
                          </label>
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) => updateNavItem(idx, "label", e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                            Route Path (e.g., /services)
                          </label>
                          <input
                            type="text"
                            value={item.path}
                            onChange={(e) => updateNavItem(idx, "path", e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => deleteNavItem(idx)}
                        disabled={navItems.length <= 1}
                        className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 disabled:opacity-30 disabled:hover:bg-transparent transition mt-4"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: HERO BANNER */}
            {activeTab === "hero" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-500">Slides Count: {heroSlides.length}</span>
                  <button
                    onClick={addHeroSlide}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-3 py-2 rounded-lg hover:bg-teal-100 transition"
                  >
                    <Plus className="h-4 w-4" /> Add Slide
                  </button>
                </div>

                <div className="space-y-6">
                  {heroSlides.map((slide, idx) => (
                    <div
                      key={slide.id || idx}
                      className="border border-slate-200 rounded-2xl bg-slate-50/30 p-5 space-y-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <span className="font-bold text-teal-800 text-sm">Slide #{slide.id || idx + 1}</span>
                        <button
                          onClick={() => deleteHeroSlide(idx)}
                          disabled={heroSlides.length <= 1}
                          className="text-xs text-rose-600 bg-rose-50 hover:bg-rose-100 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 disabled:opacity-30 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove Slide
                        </button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="md:col-span-1">
                          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                            Preview Image
                          </label>
                          <div className="aspect-video w-full rounded-xl border border-slate-200 overflow-hidden bg-slate-100 relative">
                            {slide.image ? (
                              <img
                                src={slide.image}
                                alt="Slide Preview"
                                className="h-full w-full object-cover"
                                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80" }}
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">
                                No Image
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="md:col-span-2 space-y-3">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                              Image URL
                            </label>
                            <input
                              type="text"
                              value={slide.image}
                              onChange={(e) => updateHeroSlide(idx, "image", e.target.value)}
                              placeholder="e.g., https://images.unsplash.com/photo-1500530855697-b586d89ba3ee..."
                              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
                            />
                            <span className="text-[10px] text-slate-400 mt-0.5 block">
                              Unsplash image URL or local link
                            </span>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                              Banner Slide Title
                            </label>
                            <input
                              type="text"
                              value={slide.title}
                              onChange={(e) => updateHeroSlide(idx, "title", e.target.value)}
                              placeholder="e.g., Aapale Gav, Aapali Gram Panchayat"
                              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                              Sub-title / Caption text
                            </label>
                            <input
                              type="text"
                              value={slide.subtitle}
                              onChange={(e) => updateHeroSlide(idx, "subtitle", e.target.value)}
                              placeholder="e.g., A reusable Gram Panchayat website starter..."
                              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: QUICK STATS */}
            {activeTab === "stats" && (
              <div className="grid gap-6 sm:grid-cols-2">
                {quickStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 p-4 rounded-2xl bg-slate-50/50 space-y-4 shadow-sm"
                  >
                    <div className="font-bold text-teal-800 text-sm">Stat #{idx + 1}</div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                        Stat Label (e.g., Population)
                      </label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => updateStatItem(idx, "label", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                        Stat Value (e.g., 965+ / 7 Days)
                      </label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => updateStatItem(idx, "value", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: SERVICES */}
            {activeTab === "services" && (() => {
              const filteredServices = services.filter(srv => 
                (srv.name || "").toLowerCase().includes(serviceSearchQuery.toLowerCase()) || 
                (srv.category || "").toLowerCase().includes(serviceSearchQuery.toLowerCase())
              );
              return (
                <div className="space-y-6">
                  {/* Search and Add section */}
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search services by name or category..."
                        value={serviceSearchQuery}
                        onChange={(e) => setServiceSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition bg-white"
                      />
                      {serviceSearchQuery && (
                        <button
                          onClick={() => setServiceSearchQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-semibold text-slate-500">
                        Showing {filteredServices.length} of {services.length} services
                      </span>
                      <button
                        onClick={addService}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-4 py-2.5 rounded-xl hover:bg-teal-100 transition shadow-sm"
                      >
                        <Plus className="h-4 w-4" /> Add Service
                      </button>
                    </div>
                  </div>

                  {/* Services Accordion List */}
                  <div className="space-y-4">
                    {filteredServices.length === 0 ? (
                      <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-sm text-slate-500 font-medium">No services found matching your query.</p>
                      </div>
                    ) : (
                      filteredServices.map((srv) => {
                        const originalIdx = services.findIndex(s => s.id === srv.id);
                        const isExpanded = expandedServiceId === srv.id;
                        return (
                          <div
                            key={srv.id || originalIdx}
                            className={`border rounded-2xl transition-all shadow-sm ${
                              isExpanded 
                                ? "border-teal-300 bg-white ring-4 ring-teal-50/50" 
                                : "border-slate-200 bg-slate-50/30 hover:bg-slate-50/70"
                            }`}
                          >
                            {/* Accordion Header */}
                            <div 
                              onClick={() => setExpandedServiceId(isExpanded ? null : srv.id)}
                              className="flex items-center justify-between p-4 cursor-pointer select-none"
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-xs font-bold text-teal-700">
                                  #{originalIdx + 1}
                                </span>
                                <div className="truncate">
                                  <h3 className="font-bold text-slate-900 text-sm md:text-base leading-tight">
                                    {srv.name || "Unnamed Service"}
                                  </h3>
                                  <div className="flex gap-2 items-center mt-1">
                                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                                      {srv.category || "No Category"}
                                    </span>
                                    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                      srv.isOnline 
                                        ? "bg-emerald-50 text-emerald-700" 
                                        : "bg-amber-50 text-amber-700"
                                    }`}>
                                      {srv.isOnline ? "Online" : "Offline"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 ml-4 shrink-0">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteService(originalIdx);
                                  }}
                                  disabled={services.length <= 1}
                                  className="text-xs text-rose-600 bg-rose-50 hover:bg-rose-100 font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 disabled:opacity-30 transition"
                                >
                                  <Trash2 className="h-3.5 w-3.5" /> 
                                  <span className="hidden sm:inline">Remove</span>
                                </button>
                                <div className="text-slate-400 p-1">
                                  {isExpanded ? (
                                    <ChevronUp className="h-5 w-5 text-teal-600" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5" />
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Accordion Content Panel */}
                            {isExpanded && (
                              <div className="border-t border-slate-100 p-5 md:p-6 space-y-6">
                                {/* General details grid */}
                                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                  <div>
                                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                                      Service Name
                                    </label>
                                    <input
                                      type="text"
                                      value={srv.name}
                                      onChange={(e) => updateServiceField(originalIdx, "name", e.target.value)}
                                      placeholder="e.g., Birth Certificate"
                                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                                      URL Slug (Identifier)
                                    </label>
                                    <input
                                      type="text"
                                      value={srv.slug}
                                      onChange={(e) => updateServiceField(originalIdx, "slug", e.target.value)}
                                      placeholder="e.g., birth-certificate"
                                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                                      Category Title
                                    </label>
                                    <input
                                      type="text"
                                      value={srv.category}
                                      onChange={(e) => updateServiceField(originalIdx, "category", e.target.value)}
                                      placeholder="e.g., Certificates"
                                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                                      Processing Time
                                    </label>
                                    <input
                                      type="text"
                                      value={srv.processingTime}
                                      onChange={(e) => updateServiceField(originalIdx, "processingTime", e.target.value)}
                                      placeholder="e.g., 7 working days"
                                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                                      Application Fees
                                    </label>
                                    <input
                                      type="text"
                                      value={srv.fee}
                                      onChange={(e) => updateServiceField(originalIdx, "fee", e.target.value)}
                                      placeholder="e.g., Rs. 20"
                                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none"
                                    />
                                  </div>

                                  <div className="flex items-center gap-2 mt-6">
                                    <input
                                      type="checkbox"
                                      id={`online-${originalIdx}`}
                                      checked={srv.isOnline}
                                      onChange={(e) => updateServiceField(originalIdx, "isOnline", e.target.checked)}
                                      className="h-4.5 w-4.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                    />
                                    <label htmlFor={`online-${originalIdx}`} className="text-xs font-bold text-slate-700 select-none">
                                      Available Online
                                    </label>
                                  </div>
                                </div>

                                {/* Descriptions */}
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                                      Short Summary Description
                                    </label>
                                    <input
                                      type="text"
                                      value={srv.description}
                                      onChange={(e) => updateServiceField(originalIdx, "description", e.target.value)}
                                      placeholder="e.g., Apply for an official birth registration certificate."
                                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                                      Full / Details Description
                                    </label>
                                    <textarea
                                      rows={3}
                                      value={srv.fullDescription}
                                      onChange={(e) => updateServiceField(originalIdx, "fullDescription", e.target.value)}
                                      placeholder="e.g., Detailed description of documents, criteria, and processes..."
                                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white resize-none focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none"
                                    />
                                  </div>
                                </div>

                                {/* NESTED: Eligibility Rules */}
                                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                  <div className="flex justify-between items-center">
                                    <label className="block text-[10px] font-bold uppercase text-slate-500">
                                      Eligibility Rules ({srv.eligibility?.length || 0})
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = [...services];
                                        if (!updated[originalIdx].eligibility) updated[originalIdx].eligibility = [];
                                        updated[originalIdx].eligibility.push("New eligibility rule");
                                        setServices(updated);
                                      }}
                                      className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 bg-teal-100/50 hover:bg-teal-100 border border-teal-200/50 px-2.5 py-1 rounded-md transition"
                                    >
                                      <Plus className="h-3 w-3" /> Add Rule
                                    </button>
                                  </div>
                                  <div className="space-y-2">
                                    {srv.eligibility?.map((elig, eligIdx) => (
                                      <div key={eligIdx} className="flex gap-2 items-center">
                                        <input
                                          type="text"
                                          value={elig}
                                          onChange={(e) => {
                                            const updated = [...services];
                                            updated[originalIdx].eligibility[eligIdx] = e.target.value;
                                            setServices(updated);
                                          }}
                                          placeholder="e.g., Applicant or guardian can apply"
                                          className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm bg-white"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = [...services];
                                            updated[originalIdx].eligibility = updated[originalIdx].eligibility.filter((_, i) => i !== eligIdx);
                                            setServices(updated);
                                          }}
                                          className="text-rose-500 p-1.5 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* NESTED: Required Documents */}
                                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                  <div className="flex justify-between items-center">
                                    <label className="block text-[10px] font-bold uppercase text-slate-500">
                                      Required Documents ({srv.documents?.length || 0})
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = [...services];
                                        if (!updated[originalIdx].documents) updated[originalIdx].documents = [];
                                        updated[originalIdx].documents.push({ name: "New Document", description: "Details of document" });
                                        setServices(updated);
                                      }}
                                      className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 bg-teal-100/50 hover:bg-teal-100 border border-teal-200/50 px-2.5 py-1 rounded-md transition"
                                    >
                                      <Plus className="h-3 w-3" /> Add Document
                                    </button>
                                  </div>
                                  <div className="space-y-2">
                                    {srv.documents?.map((doc, docIdx) => (
                                      <div key={docIdx} className="flex gap-2 items-center border border-slate-200/60 p-3 rounded-lg bg-white shadow-sm">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                                          <input
                                            type="text"
                                            value={doc.name}
                                            onChange={(e) => {
                                              const updated = [...services];
                                              updated[originalIdx].documents[docIdx].name = e.target.value;
                                              setServices(updated);
                                            }}
                                            placeholder="Document Name (e.g., Applicant ID)"
                                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs bg-slate-50/50 focus:bg-white transition"
                                          />
                                          <input
                                            type="text"
                                            value={doc.description}
                                            onChange={(e) => {
                                              const updated = [...services];
                                              updated[originalIdx].documents[docIdx].description = e.target.value;
                                              setServices(updated);
                                            }}
                                            placeholder="Document Description (e.g., Aadhaar card copy)"
                                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs bg-slate-50/50 focus:bg-white transition"
                                          />
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = [...services];
                                            updated[originalIdx].documents = updated[originalIdx].documents.filter((_, i) => i !== docIdx);
                                            setServices(updated);
                                          }}
                                          className="text-rose-500 p-1.5 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* NESTED: Process Steps */}
                                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                  <div className="flex justify-between items-center">
                                    <label className="block text-[10px] font-bold uppercase text-slate-500">
                                      Service Process Steps ({srv.process?.length || 0})
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = [...services];
                                        if (!updated[originalIdx].process) updated[originalIdx].process = [];
                                        updated[originalIdx].process.push({ title: "New Step", description: "Detailed description of action." });
                                        setServices(updated);
                                      }}
                                      className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 bg-teal-100/50 hover:bg-teal-100 border border-teal-200/50 px-2.5 py-1 rounded-md transition"
                                    >
                                      <Plus className="h-3 w-3" /> Add Step
                                    </button>
                                  </div>
                                  <div className="space-y-2">
                                    {srv.process?.map((step, stepIdx) => (
                                      <div key={stepIdx} className="flex gap-2 items-center border border-slate-200/60 p-3 rounded-lg bg-white shadow-sm">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                                          <input
                                            type="text"
                                            value={step.title}
                                            onChange={(e) => {
                                              const updated = [...services];
                                              updated[originalIdx].process[stepIdx].title = e.target.value;
                                              setServices(updated);
                                            }}
                                            placeholder="Step Title (e.g., Fill application)"
                                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs bg-slate-50/50 focus:bg-white transition"
                                          />
                                          <input
                                            type="text"
                                            value={step.description}
                                            onChange={(e) => {
                                              const updated = [...services];
                                              updated[originalIdx].process[stepIdx].description = e.target.value;
                                              setServices(updated);
                                            }}
                                            placeholder="Step Description (e.g., Collect details and attach proof)"
                                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs bg-slate-50/50 focus:bg-white transition"
                                          />
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = [...services];
                                            updated[originalIdx].process = updated[originalIdx].process.filter((_, i) => i !== stepIdx);
                                            setServices(updated);
                                          }}
                                          className="text-rose-500 p-1.5 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })()}

            {/* TAB CONTENT: NEWS & NOTICES */}
            {activeTab === "news" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-500">Notices Count: {newsItems.length}</span>
                  <button
                    onClick={addNewsItem}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-3 py-2 rounded-lg hover:bg-teal-100 transition"
                  >
                    <Plus className="h-4 w-4" /> Add Notice
                  </button>
                </div>

                <div className="space-y-6">
                  {newsItems.map((news, idx) => (
                    <div
                      key={news.id || idx}
                      className="border border-slate-200 rounded-2xl bg-slate-50/30 p-5 space-y-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <span className="font-bold text-teal-800 text-sm">Notice #{news.id || idx + 1}</span>
                        <button
                          onClick={() => deleteNewsItem(idx)}
                          disabled={newsItems.length <= 1}
                          className="text-xs text-rose-600 bg-rose-50 hover:bg-rose-100 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 disabled:opacity-30 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove Notice
                        </button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="md:col-span-1">
                          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                            Notice Preview
                          </label>
                          <div className="aspect-video w-full rounded-xl border border-slate-200 overflow-hidden bg-slate-100 relative">
                            {news.image ? (
                              <img
                                src={news.image}
                                alt="Notice Preview"
                                className="h-full w-full object-cover"
                                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80" }}
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">
                                No Image
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="md:col-span-2 space-y-3">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                              Notice Title
                            </label>
                            <input
                              type="text"
                              value={news.title}
                              onChange={(e) => updateNewsField(idx, "title", e.target.value)}
                              placeholder="e.g., Village sanitation drive scheduled for next Sunday"
                              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                              Publish Date
                            </label>
                            <input
                              type="date"
                              value={news.publishedAt}
                              onChange={(e) => updateNewsField(idx, "publishedAt", e.target.value)}
                              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                              Image URL
                            </label>
                            <input
                              type="text"
                              value={news.image}
                              onChange={(e) => updateNewsField(idx, "image", e.target.value)}
                              placeholder="e.g., https://images.unsplash.com/photo-1488521787991-ed7bbaae773c..."
                              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                          Notice Summary Content
                        </label>
                        <textarea
                          rows={3}
                          value={news.summary}
                          onChange={(e) => updateNewsField(idx, "summary", e.target.value)}
                          placeholder="e.g., This sample update shows how a Gram Panchayat notice list can be rendered..."
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: ABOUT SECTIONS */}
            {activeTab === "about" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-500">About Blocks: {aboutSections.length}</span>
                  <button
                    onClick={addAboutSection}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-3 py-2 rounded-lg hover:bg-teal-100 transition"
                  >
                    <Plus className="h-4 w-4" /> Add Section
                  </button>
                </div>

                <div className="space-y-4">
                  {aboutSections.map((sect, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 p-5 rounded-2xl bg-slate-50/30 space-y-4 relative shadow-sm"
                    >
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <span className="font-bold text-teal-800 text-sm">Section #{idx + 1}</span>
                        <button
                          onClick={() => deleteAboutSection(idx)}
                          disabled={aboutSections.length <= 1}
                          className="text-rose-500 p-1.5 hover:bg-rose-50 rounded"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                          Section Title
                        </label>
                        <input
                          type="text"
                          value={sect.title}
                          onChange={(e) => updateAboutSection(idx, "title", e.target.value)}
                          placeholder="e.g., Village Overview"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                          Section Description Body
                        </label>
                        <textarea
                          rows={4}
                          value={sect.body}
                          onChange={(e) => updateAboutSection(idx, "body", e.target.value)}
                          placeholder="e.g., Dholewadi is represented here as a reusable Gram Panchayat..."
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: TRACK STATUS DATA */}
            {activeTab === "tracking" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-500">Trackable Applications: {trackStatusItems.length}</span>
                  <button
                    onClick={addTrackItem}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-3 py-2 rounded-lg hover:bg-teal-100 transition"
                  >
                    <Plus className="h-4 w-4" /> Add Record
                  </button>
                </div>

                <div className="space-y-4">
                  {trackStatusItems.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="border border-slate-200 p-5 rounded-2xl bg-slate-50/50 grid gap-4 sm:grid-cols-2 md:grid-cols-3 relative shadow-sm"
                    >
                      <button
                        onClick={() => deleteTrackItem(idx)}
                        disabled={trackStatusItems.length <= 1}
                        className="absolute top-4 right-4 text-rose-500 p-1.5 hover:bg-rose-50 rounded disabled:opacity-30"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                          Application ID
                        </label>
                        <input
                          type="text"
                          value={item.id}
                          onChange={(e) => updateTrackItem(idx, "id", e.target.value)}
                          placeholder="e.g., GP-1021"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white font-mono"
                        />
                        <span className="text-[10px] text-slate-400 mt-0.5 block">
                          Format: *GP-XXXX*
                        </span>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                          Registered Mobile
                        </label>
                        <input
                          type="text"
                          value={item.mobile}
                          onChange={(e) => updateTrackItem(idx, "mobile", e.target.value)}
                          placeholder="e.g., 9876543210"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
                        />
                        <span className="text-[10px] text-slate-400 mt-0.5 block">
                          Used to authenticate queries
                        </span>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                          Civic Service Applied
                        </label>
                        <input
                          type="text"
                          value={item.service}
                          onChange={(e) => updateTrackItem(idx, "service", e.target.value)}
                          placeholder="e.g., Birth Certificate"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                          Application Status
                        </label>
                        <select
                          value={item.status}
                          onChange={(e) => updateTrackItem(idx, "status", e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white font-bold"
                        >
                          <option value="approved">Approved</option>
                          <option value="pending">Pending</option>
                          <option value="needs-info">Needs Info</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                          Status Remarks / Action
                        </label>
                        <input
                          type="text"
                          value={item.remarks}
                          onChange={(e) => updateTrackItem(idx, "remarks", e.target.value)}
                          placeholder="e.g., Certificate ready for download"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AdminPanel;
