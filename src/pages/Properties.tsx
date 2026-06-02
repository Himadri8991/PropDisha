import { useMemo, useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Search, SlidersHorizontal, MapPin, Sparkles, X,
  LayoutGrid, List, ChevronDown, TrendingUp, Building2, Check
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { properties, type Intent } from "@/data/properties";
import { useSEO } from "@/hooks/useSEO";

const cities = ["All", "Kolkata", "Howrah"] as const;
const intents: ("All" | Intent)[] = [
  "All", "Buy", "Invest", "Commercial", "Luxury", "Residential", 
  "Affordable", "Plots", "Villa", "Warehousing", "Retail", "Office Space", 
  "Senior Living", "Industrial", "Riverfront", "Resort"
];
const bhkOptions = ["Any", "1", "2", "3", "4+"] as const;
const statusOptions = ["All", "Ready to Move", "Under Construction", "New Launch", "Under Development"] as const;
const developerOptions = ["All", "Srijan", "PS Group", "Godrej Properties", "Shapoorji Pallonji", "Eden Realty", "Sureka Group", "Vinayak Group", "Alcove Realty", "Emami Realty", "DTC Group", "Primarc", "Mayfair Group", "Skyscraper", "Atri Group"] as const;

type SortKey = "relevance" | "price-asc" | "price-desc" | "bhk-asc" | "possession" | "roi";
const sortOptions: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Relevance" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "bhk-asc", label: "BHK: Ascending" },
  { key: "possession", label: "Earliest Possession" },
  { key: "roi", label: "Best ROI" },
];

type ViewMode = "grid" | "list";

const Properties = () => {
  useSEO({
    title: "Curated Luxury Addresses & Properties Collection | PropDisha",
    description: "Browse the curated collection of verified premium residential apartments, townhouses, duplexes, and riverfront properties in Kolkata & Howrah on PropDisha.",
    keywords: "propdisha collection, verified residential kolkata, buy flats kolkata, premium duplexes kolkata, riverfront apartments howrah"
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [city, setCity] = useState<(typeof cities)[number]>("All");
  const [intent, setIntent] = useState<(typeof intents)[number]>(
    (searchParams.get("intent") as any) || "All"
  );
  const [bhk, setBhk] = useState<(typeof bhkOptions)[number]>("Any");
  const [status, setStatus] = useState<(typeof statusOptions)[number]>("All");
  const [developer, setDeveloper] = useState<(typeof developerOptions)[number]>(
    (searchParams.get("developer") as any) || "All"
  );
  const [budget, setBudget] = useState(1000);
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [sortKey, setSortKey] = useState<SortKey>("relevance");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [scrollCompact, setScrollCompact] = useState(false);
  const [expandFilters, setExpandFilters] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = searchParams.get("q");
    const it = searchParams.get("intent");
    const dev = searchParams.get("developer");
    if (query !== null) setQ(query);
    if (it !== null) setIntent(it as any);
    if (dev !== null) setDeveloper(dev as any);
  }, [searchParams]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Compact filter bar when user scrolls past hero
  useEffect(() => {
    const onScroll = () => {
      const shouldCompact = window.scrollY > 320;
      setScrollCompact(shouldCompact);
      // Auto-collapse expanded filters when scrolling back up
      if (!shouldCompact) setExpandFilters(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = useMemo(() => {
    let list = properties.filter((p) => {
      if (city !== "All" && p.city !== city) return false;
      if (intent !== "All" && !p.intent.includes(intent)) return false;
      if (status !== "All" && p.status !== status) return false;
      if (developer !== "All") {
        const selectedDevLower = developer.toLowerCase().trim();
        const pDevs = p.developers 
          ? p.developers.map(d => d.toLowerCase().trim()) 
          : [p.developer?.toLowerCase().trim()].filter(Boolean);
        
        if (!pDevs.some(d => d.includes(selectedDevLower))) return false;
      }
      if (p.priceMin > budget) return false;
      if (bhk !== "Any") {
        const n = bhk === "4+" ? 4 : parseInt(bhk);
        if (bhk === "4+" ? !p.bhk.some((b) => b >= 4) : !p.bhk.includes(n)) return false;
      }
      if (q.trim()) {
        const t = q.toLowerCase().trim();
        const pDevs = p.developers 
          ? p.developers.map(d => d.toLowerCase().trim()) 
          : [p.developer?.toLowerCase().trim()].filter(Boolean);
        if (
          !p.name.toLowerCase().includes(t) &&
          !p.location.toLowerCase().includes(t) &&
          !pDevs.some(d => d.includes(t))
        )
          return false;
      }
      return true;
    });

    switch (sortKey) {
      case "price-asc": return [...list].sort((a, b) => a.priceMin - b.priceMin);
      case "price-desc": return [...list].sort((a, b) => b.priceMin - a.priceMin);
      case "bhk-asc": return [...list].sort((a, b) => (a.bhk[0] || 0) - (b.bhk[0] || 0));
      case "possession":
        return [...list].sort((a, b) => {
          const parse = (s: string) => { const [m, y] = s.split(" "); const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; return parseInt(y) * 12 + months.indexOf(m); };
          return parse(a.possession) - parse(b.possession);
        });
      case "roi":
        return [...list].sort((a, b) => {
          const getRoi = (s: string) => parseFloat(s.split("–")[1] || s);
          return getRoi(b.investment.roi) - getRoi(a.investment.roi);
        });
      default: return list;
    }
  }, [city, intent, bhk, status, developer, budget, q, sortKey]);

  const activeFiltersCount = [
    city !== "All", intent !== "All", bhk !== "Any",
    status !== "All", developer !== "All", budget < 1000
  ].filter(Boolean).length;

  const resetFilters = () => {
    setCity("All"); setIntent("All"); setBhk("Any");
    setStatus("All"); setDeveloper("All"); setBudget(1000); setQ("");
  };

  const currentSortLabel = sortOptions.find(s => s.key === sortKey)?.label || "Relevance";

  return (
    <div className="min-h-screen bg-background selection:bg-gold/30 selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-navy-deep -z-10" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gold/5 blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2 -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/3 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 -z-10" />
        <div className="container-luxe">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-gold text-[10px] tracking-[0.6em] uppercase mb-8 flex items-center gap-3">
              <div className="h-px w-8 bg-gold/50" />
              The Curated Collection
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-8xl leading-[0.95] mb-10">
              Every address <br />
              <span className="italic font-normal text-gradient-gold">tells a story.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-foreground/40 max-w-xl font-light leading-relaxed">
              A selective portfolio of residences and investment assets, verified for the few who value time and trust.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Bar — smart compact on scroll */}
      <section className="sticky top-20 z-40 py-3">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-[2rem] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] border-white/5 overflow-hidden"
          >
            {/* ── COMPACT BAR (always visible) ── */}
            <div className={`flex items-center gap-3 px-4 md:px-6 transition-all duration-300 ${scrollCompact ? "py-2.5" : "py-4 md:py-5"}`}>
              {/* Search */}
              <Search className="w-4 h-4 text-gold shrink-0" />
              <input
                value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Search project, location or developer…"
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-foreground/20 font-light min-w-0"
              />
              <AnimatePresence>
                {q && (
                  <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    onClick={() => setQ("")}
                    className="p-1 hover:text-gold transition-colors rounded-full hover:bg-white/5 shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Active filter chips — shown only in compact mode */}
              <AnimatePresence>
                {scrollCompact && activeFiltersCount > 0 && (
                  <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                    className="hidden sm:flex items-center gap-2 shrink-0">
                    {city !== "All" && <FilterChip label={city} onRemove={() => setCity("All")} />}
                    {intent !== "All" && <FilterChip label={intent} onRemove={() => setIntent("All")} />}
                    {bhk !== "Any" && <FilterChip label={`${bhk} BHK`} onRemove={() => setBhk("Any")} />}
                    {status !== "All" && <FilterChip label={status} onRemove={() => setStatus("All")} />}
                    {budget < 1000 && (
                      <FilterChip
                        label={`≤ ₹${budget < 100 ? budget + "L" : (budget/100).toFixed(1) + "Cr"}`}
                        onRemove={() => setBudget(1000)}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="h-5 w-px bg-white/10 shrink-0 hidden sm:block" />

              {/* AI badge — hidden in compact mode */}
              <AnimatePresence>
                {!scrollCompact && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="hidden md:flex items-center gap-2 text-foreground/30 shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[9px] tracking-[0.2em] uppercase">AI Search</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expand/Collapse toggle — only shown when compact */}
              <AnimatePresence>
                {scrollCompact && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setExpandFilters(v => !v)}
                    className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[9px] tracking-widest uppercase font-bold transition-all duration-300 ${
                      expandFilters || activeFiltersCount > 0
                        ? "bg-gold/10 text-gold border-gold/30"
                        : "border-white/10 text-foreground/40 hover:border-gold/30 hover:text-gold"
                    }`}
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-gold text-navy-deep text-[8px] font-black grid place-items-center">
                        {activeFiltersCount}
                      </span>
                    )}
                    <motion.div animate={{ rotate: expandFilters ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="w-3 h-3" />
                    </motion.div>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* ── FULL FILTERS (always expanded when not compact; toggle when compact) ── */}
            <AnimatePresence initial={false}>
              {(!scrollCompact || expandFilters) && (
                <motion.div
                  key="full-filters"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 md:px-6 pb-4 md:pb-5">
                    {/* Filters Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 pt-5 border-t border-white/5">
                      <FilterGroup label="City" value={city} setValue={setCity as any} options={cities as any} />
                      <FilterGroup label="Purpose" value={intent} setValue={setIntent as any} options={intents as any} />
                      <FilterGroup label="Layout" value={bhk} setValue={setBhk as any} options={bhkOptions as any} />
                      <FilterGroup label="Status" value={status} setValue={setStatus as any} options={statusOptions as any} />
                      {/* Budget slider */}
                      <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
                        <div className="flex justify-between items-end">
                          <p className="text-[9px] tracking-[0.4em] uppercase text-foreground/40 font-bold">Max Budget</p>
                          <span className="text-xs font-display text-gold">
                            ₹{budget < 100 ? `${budget} L` : `${(budget / 100).toFixed(1)} Cr`}
                          </span>
                        </div>
                        <input type="range" min={20} max={1000} step={10} value={budget}
                          onChange={(e) => setBudget(parseInt(e.target.value))}
                          className="w-full h-1 cursor-pointer" />
                      </div>
                    </div>

                    {/* Advanced filters row */}
                    <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center gap-3">
                      <div className="flex flex-wrap gap-2 flex-1">
                        <p className="text-[9px] tracking-[0.4em] uppercase text-foreground/30 font-bold self-center mr-1">Developer:</p>
                        {developerOptions.map(d => (
                          <button key={d} onClick={() => setDeveloper(d)}
                            className={`px-3 py-1 rounded-full text-[9px] tracking-wider uppercase font-bold transition-all duration-300 border ${
                              developer === d
                                ? "bg-gold/10 text-gold border-gold/40"
                                : "border-white/5 text-foreground/30 hover:border-white/20 hover:text-foreground/60"
                            }`}>
                            {d}
                          </button>
                        ))}
                      </div>
                      {activeFiltersCount > 0 && (
                        <motion.button initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                          onClick={resetFilters}
                          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-red-500/30 text-red-400 text-[9px] tracking-widest uppercase font-bold hover:bg-red-500/10 transition-all">
                          <X className="w-3 h-3" /> Reset ({activeFiltersCount})
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20">
        <div className="container-luxe">
          {/* Results Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-4">
              <motion.p key={filtered.length} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="text-sm tracking-widest text-foreground/40">
                <span className="text-foreground font-display text-3xl mr-2">{filtered.length}</span>
                PROPERTIES FOUND
              </motion.p>
              {activeFiltersCount > 0 && (
                <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-[9px] tracking-widest uppercase font-bold border border-gold/20">
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} active
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center gap-1 glass p-1 rounded-xl">
                <button onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === "grid" ? "bg-gold text-navy-deep" : "text-foreground/40 hover:text-foreground"}`}>
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === "list" ? "bg-gold text-navy-deep" : "text-foreground/40 hover:text-foreground"}`}>
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative" ref={sortRef}>
                <button onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-[10px] tracking-widest uppercase font-bold text-foreground/60 hover:text-foreground hover:border-gold/30 transition-all border border-white/5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  {currentSortLabel}
                  <motion.div animate={{ rotate: sortOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-56 glass-strong rounded-2xl overflow-hidden z-50 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.8)] border-white/5">
                      {sortOptions.map((opt) => (
                        <button key={opt.key} onClick={() => { setSortKey(opt.key); setSortOpen(false); }}
                          className={`w-full flex items-center justify-between px-5 py-3.5 text-[10px] tracking-widest uppercase font-bold transition-all hover:bg-white/5 ${sortKey === opt.key ? "text-gold" : "text-foreground/50"}`}>
                          {opt.label}
                          {sortKey === opt.key && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Cards Grid / List */}
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="py-32 text-center glass rounded-[3rem]">
                <div className="w-20 h-20 rounded-full bg-white/5 grid place-items-center mx-auto mb-8">
                  <Search className="w-8 h-8 text-foreground/20" />
                </div>
                <h3 className="text-3xl font-display mb-4">No addresses found.</h3>
                <p className="text-foreground/40 max-w-xs mx-auto mb-8">Try adjusting your filters or search terms.</p>
                <button onClick={resetFilters} className="btn-gold !px-8 !py-3 text-xs">Reset Filters</button>
              </motion.div>
            ) : viewMode === "grid" ? (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((p, i) => (
                  <motion.div layout key={p.id}
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.04, duration: 0.5 }}>
                    <Link to={`/properties/${p.slug}`}
                      className="group relative block aspect-[4/5] rounded-[2.5rem] overflow-hidden card-property">
                      <img src={p.cover} alt={p.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent" />
                      <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-700" />

                      {/* Tags */}
                      <div className="absolute top-6 left-6 flex flex-col gap-2">
                        {p.tag && (
                          <div className="px-3.5 py-1.5 rounded-full glass border-white/10 text-[9px] tracking-[0.3em] uppercase text-gold font-bold">
                            {p.tag}
                          </div>
                        )}
                        <div className="px-3.5 py-1.5 rounded-full glass border-white/10 text-[9px] tracking-[0.3em] uppercase text-foreground/60">
                          {p.city}
                        </div>
                      </div>

                      {/* ROI badge */}
                      <div className="absolute top-6 right-6">
                        <div className="px-3 py-1.5 rounded-full glass border-gold/20 text-[9px] tracking-widest uppercase text-gold/80 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {p.investment.roi} ROI
                        </div>
                      </div>

                      {/* Bottom content */}
                      <div className="absolute inset-x-0 bottom-0 p-8">
                        <h3 className="text-2xl font-display mb-1.5 transition-colors group-hover:text-gold">{p.name}</h3>
                        <div className="flex items-center gap-2 text-foreground/50 text-xs font-light mb-1">
                          <MapPin className="w-3 h-3 text-gold" />{p.location}
                        </div>
                        <p className="text-[10px] text-foreground/30 mb-5">{p.status} · {p.bhk[0] === 0 ? "Office" : `${p.bhk.join(", ")} BHK`} · {p.sizeRange}</p>
                        <div className="flex items-center justify-between pt-5 border-t border-white/5">
                          <span className="text-base font-medium text-gradient-gold">{p.priceLabel}</span>
                          <div className="w-9 h-9 rounded-full border border-white/10 grid place-items-center group-hover:bg-gold group-hover:border-gold transition-all duration-500">
                            <ArrowRight className="w-4 h-4 group-hover:text-navy-deep transition-colors" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* LIST VIEW */
              <motion.div layout className="flex flex-col gap-4">
                {filtered.map((p, i) => (
                  <motion.div layout key={p.id}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }} transition={{ delay: i * 0.03 }}>
                    <Link to={`/properties/${p.slug}`}
                      className="group flex flex-col sm:flex-row gap-0 glass rounded-[2rem] overflow-hidden hover:border-gold/30 transition-all duration-500 border border-white/5 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)]">
                      {/* Image */}
                      <div className="relative w-full sm:w-64 h-52 sm:h-auto shrink-0 overflow-hidden">
                        <img src={p.cover} alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-navy-deep/20" />
                        {p.tag && (
                          <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-[9px] tracking-widest uppercase text-gold font-bold">
                            {p.tag}
                          </div>
                        )}
                      </div>
                      {/* Content */}
                      <div className="flex flex-col justify-between p-7 flex-1 gap-4">
                        <div>
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/30 mb-1">
                                {p.developers ? p.developers.map(d => d.trim()).join(" & ") : p.developer} · {p.city}
                              </p>
                              <h3 className="text-2xl font-display group-hover:text-gold transition-colors">{p.name}</h3>
                            </div>
                            <span className="text-lg font-display text-gradient-gold whitespace-nowrap shrink-0">{p.priceLabel}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-foreground/40 text-xs mb-3">
                            <MapPin className="w-3 h-3 text-gold shrink-0" />{p.location}
                          </div>
                          <p className="text-sm text-foreground/30 font-light line-clamp-2">{p.story[0]}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
                          {[
                            p.status,
                            p.bhk[0] === 0 ? "Office Space" : `${p.bhk.join("/")} BHK`,
                            p.sizeRange,
                            `Possession: ${p.possession}`,
                            `ROI: ${p.investment.roi}`,
                          ].map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full glass text-[9px] tracking-wider uppercase text-foreground/40 font-medium">
                              {tag}
                            </span>
                          ))}
                          <div className="ml-auto w-8 h-8 rounded-full border border-white/10 grid place-items-center group-hover:bg-gold group-hover:border-gold transition-all duration-500 shrink-0">
                            <ArrowRight className="w-3.5 h-3.5 group-hover:text-navy-deep transition-colors" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No results CTA */}
          {filtered.length > 0 && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="mt-24 text-center">
              <p className="text-foreground/20 text-sm tracking-widest uppercase mb-6">Can't find what you're looking for?</p>
              <a href="https://wa.me/919331511222?text=I need help finding a property on PropDisha."
                target="_blank" rel="noopener noreferrer" className="btn-glass !px-10 !py-4 text-xs">
                Talk to Our Advisors
              </a>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FilterGroup = <T extends string>({
  label, value, setValue, options,
}: {
  label: string; value: T; setValue: (v: T) => void; options: readonly T[];
}) => (
  <div className="flex flex-col gap-3">
    <p className="text-[9px] tracking-[0.4em] uppercase text-foreground/40 font-bold">{label}</p>
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button key={o} onClick={() => setValue(o)}
          className={`px-3.5 py-1.5 rounded-full text-[9px] tracking-widest uppercase font-bold transition-all duration-400 border ${
            value === o
              ? "bg-gold text-navy-deep border-gold shadow-[0_8px_20px_-5px_hsl(var(--gold)/0.5)]"
              : "border-white/5 text-foreground/40 hover:border-gold/30 hover:text-foreground"
          }`}>
          {o}
        </button>
      ))}
    </div>
  </div>
);

// Compact active-filter pill chip
const FilterChip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <motion.span
    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold/10 border border-gold/25 text-gold text-[8px] tracking-widest uppercase font-bold whitespace-nowrap"
  >
    {label}
    <button onClick={onRemove} className="hover:bg-gold/20 rounded-full p-0.5 transition-colors">
      <X className="w-2.5 h-2.5" />
    </button>
  </motion.span>
);

export default Properties;
