import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, ArrowRight, ChevronRight, Compass, Zap, Layers, Crosshair, Shield } from "lucide-react";
import { properties } from "@/data/properties";
import { Link } from "react-router-dom";

// Balanced representation of 9 real properties across 5+ developers mapped on a geographic grid
// Spacia (Srijan), One10 (PS Group), Quintessa (PS Group), South City Retreat (Sureka), Godrej Blue (Godrej), Urbana (Sureka), Joyville (Shapoorji), Solaris Shalimar (Eden), Solaris Serampore (Eden)
const locations = [
  { id: "1", x: 55, y: 30, sector: "North & East" }, // Spacia (Srijan) - Jessore Road
  { id: "32", x: 65, y: 40, sector: "North & East" }, // One10 (PS Group) - New Town
  { id: "33", x: 50, y: 50, sector: "North & East" }, // Quintessa (PS Group) - Kankurgachi
  { id: "50", x: 75, y: 60, sector: "North & East" }, // South City Retreat (Sureka) - Southern Bypass

  { id: "39", x: 35, y: 65, sector: "South & Central" }, // Godrej Blue (Godrej) - New Alipore
  { id: "51", x: 60, y: 70, sector: "South & Central" }, // Urbana (Sureka) - EM Bypass

  { id: "42", x: 20, y: 45, sector: "West & Howrah" }, // Joyville Western Heights (Shapoorji) - Santragachi
  { id: "45", x: 30, y: 55, sector: "West & Howrah" }, // Solaris Shalimar (Eden) - Howrah
  { id: "46", x: 25, y: 25, sector: "West & Howrah" }, // Solaris City Serampore (Eden) - Serampore
];

// Helper to classify property categories dynamically
const getPropertyCategory = (configuration?: string) => {
  if (!configuration) return "Residential";
  const lower = configuration.toLowerCase();
  if (lower.includes("retail") || lower.includes("commercial") || lower.includes("hub") || lower.includes("logistics")) return "Commercial";
  if (lower.includes("plot") || lower.includes("acres") || lower.includes("community") || lower.includes("villa")) return "Villas & Plots";
  return "Residential";
};

const SmartMap = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Interactive Filters
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const activeId = hoveredId || selectedId;
  const activeProperty = useMemo(() => {
    return properties.find((p) => p.id === activeId);
  }, [activeId]);

  // Dynamic viewBox coordinates for smooth micro-zooms on Kolkata regions
  const viewBoxes = {
    All: "0 0 900 560",
    "North & East": "400 180 440 330",
    "South & Central": "280 270 450 310",
    "West & Howrah": "80 140 380 340",
  };

  // Dynamically filter properties for pins display
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      const prop = properties.find((p) => p.id === loc.id);
      if (!prop) return false;

      // Sector filter
      const sectorMatch = selectedSector === "All" || loc.sector === selectedSector;
      
      // Category filter
      const category = getPropertyCategory(prop.configuration);
      const categoryMatch = selectedCategory === "All" || category === selectedCategory;

      return sectorMatch && categoryMatch;
    });
  }, [selectedSector, selectedCategory]);

  // Dynamic stats calculation depending on current sector filters
  const stats = useMemo(() => {
    if (selectedSector === "North & East") {
      return [
        { label: "Active Listings", value: "4", unit: "Growth Hubs" },
        { label: "Acquisition Entry", value: "₹49.9L", unit: "onwards" },
        { label: "Key Sectors", value: "New Town", unit: "& Jessore Rd" },
      ];
    } else if (selectedSector === "South & Central") {
      return [
        { label: "Active Listings", value: "2", unit: "Elite Estates" },
        { label: "Premium Entry", value: "₹2.49Cr", unit: "onwards" },
        { label: "Luxury Index", value: "Highest", unit: "Core Alipore" },
      ];
    } else if (selectedSector === "West & Howrah") {
      return [
        { label: "Active Listings", value: "3", unit: "Riverfront & Hub" },
        { label: "Township Entry", value: "₹15.0L", unit: "onwards" },
        { label: "Connectivity", value: "NH-6", unit: "& River Access" },
      ];
    } else {
      return [
        { label: "Total Collection", value: "9", unit: "Diverse Partners" },
        { label: "Investment Range", value: "₹15.0L+", unit: "To ₹6.44Cr+" },
        { label: "Top Developers", value: "5", unit: "Co-Listed" },
      ];
    }
  }, [selectedSector]);

  // Current active coordinates telemetry (Kolkata actual coordinates)
  const telemetryCoordinates = useMemo(() => {
    if (activeProperty) {
      if (activeProperty.id === "1") return { lat: "22°40'15\" N", lng: "88°27'08\" E", dev: "Srijan Group" };
      if (activeProperty.id === "32") return { lat: "22°34'50\" N", lng: "88°28'42\" E", dev: "PS Group" };
      if (activeProperty.id === "33") return { lat: "22°34'12\" N", lng: "88°23'55\" E", dev: "PS Group" };
      if (activeProperty.id === "50") return { lat: "22°30'25\" N", lng: "88°29'12\" E", dev: "Sureka Group" };
      if (activeProperty.id === "39") return { lat: "22°31'02\" N", lng: "88°20'45\" E", dev: "Godrej Prop" };
      if (activeProperty.id === "51") return { lat: "22°30'27\" N", lng: "88°24'37\" E", dev: "Sureka Group" };
      if (activeProperty.id === "42") return { lat: "22°35'11\" N", lng: "88°16'05\" E", dev: "Shapoorji Pal" };
      if (activeProperty.id === "45") return { lat: "22°33'29\" N", lng: "88°18'22\" E", dev: "Eden Realty" };
      if (activeProperty.id === "46") return { lat: "22°45'18\" N", lng: "88°20'12\" E", dev: "Eden Realty" };
    }
    return selectedSector === "North & East" 
      ? { lat: "22°36'00\" N", lng: "88°26'12\" E", dev: "SECTOR TARGET" }
      : selectedSector === "South & Central"
      ? { lat: "22°30'45\" N", lng: "88°22'30\" E", dev: "SECTOR TARGET" }
      : selectedSector === "West & Howrah"
      ? { lat: "22°35'00\" N", lng: "88°17'00\" E", dev: "SECTOR TARGET" }
      : { lat: "COORD SCANNER", lng: "SELECT TARGET", dev: "STANDBY" };
  }, [activeProperty, selectedSector]);

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-[#070709]">
      
      {/* ── Separate Noise texture overlay ── */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-30 z-0" />

      {/* ── Ambient luxury blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.05) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-40 right-1/4 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(200 60% 40% / 0.05) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full opacity-20 blur-[140px]"
          style={{ background: "radial-gradient(ellipse, hsl(var(--gold) / 0.08) 0%, transparent 60%)" }} />
      </div>

      {/* Aesthetic Top hairline divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-luxe relative z-10">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full border text-[10px] tracking-[0.25em] uppercase font-bold glass-gold text-gold animate-border-glow">
            <Compass className="w-3.5 h-3.5 animate-spin-slow text-gold" style={{ animationDuration: "15s" }} /> 
            Smart Map Engine
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] tracking-widest font-semibold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Scanner Active
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 xl:gap-20 items-stretch">

          {/* ══ LEFT Narrative Column ══ */}
          <div className="w-full lg:w-[38%] flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -24 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.05 }}
              >
                <h2 className="text-5xl md:text-6xl font-display leading-[1.08] text-white mb-5">
                  Explore our<br />
                  <span className="italic font-normal text-gradient-gold">
                    luxury grid.
                  </span>
                </h2>
                <p className="text-base leading-relaxed text-foreground/50 font-light">
                  A balanced index across Kolkata's premier developers. Compare compliant offerings from **Srijan, PS Group, Sureka, Eden, Godrej,** and **Shapoorji** dynamically across geographical sub-sectors.
                </p>
              </motion.div>

              {/* TABS: Filter By Sector */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-foreground/45">Target Sub-Sector Selection</span>
                <div className="flex p-1 rounded-xl glass border border-white/5 bg-navy-deep/45 w-full">
                  {["All", "North & East", "South & Central", "West & Howrah"].map((sector) => (
                    <button
                      key={sector}
                      onClick={() => {
                        setSelectedSector(sector);
                        setSelectedId(null);
                      }}
                      className={`flex-1 py-2 px-1 text-[9px] md:text-[10px] tracking-wider font-semibold rounded-lg transition-all duration-300 relative ${
                        selectedSector === sector
                          ? "text-navy-deep font-bold"
                          : "text-foreground/55 hover:text-white"
                      }`}
                    >
                      {selectedSector === sector && (
                        <motion.span
                          layoutId="activeSectorTab"
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-gold-soft to-gold"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}
                      <span className="relative z-10">{sector === "All" ? "All Sectors" : sector}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* TABS: Filter By Category */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-foreground/45">Property Classification</span>
                <div className="flex gap-2 flex-wrap">
                  {["All", "Residential", "Commercial", "Villas & Plots"].map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setSelectedId(null);
                        }}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border transition-all duration-300 ${
                          isSelected
                            ? "bg-gold/10 border-gold text-gold shadow-[0_0_15px_rgba(201,166,70,0.15)]"
                            : "bg-transparent border-white/5 text-foreground/40 hover:text-foreground/80 hover:border-white/10"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Dynamic Stats Row */}
            <motion.div 
              layout
              className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden glass border border-white/5"
            >
              {stats.map((s) => (
                <div 
                  key={s.label} 
                  className="flex flex-col items-center justify-center text-center p-5 bg-navy-deep/20 hover:bg-navy-soft/30 transition-all duration-300"
                >
                  <span className="text-xl font-bold font-display text-gradient-gold">{s.value}</span>
                  <span className="text-[9px] tracking-widest uppercase mt-1 leading-tight text-foreground/50 font-medium">{s.unit}</span>
                  <span className="text-[8px] tracking-[0.15em] uppercase mt-1 text-foreground/30 font-semibold">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Premium details checklist */}
            <div className="space-y-3 pt-2">
              {[
                { title: "Diverse Developer Representation", desc: "No bias. Equal index listings from major national & regional brands." },
                { title: "RERA Verified Compliance", desc: "Every address carries a validated governmental regulatory stamp." },
              ].map((f, idx) => (
                <div key={idx} className="flex gap-3.5 group">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gold/5 border border-gold/10 shrink-0 group-hover:border-gold/20 transition-all duration-300">
                    <Shield className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{f.title}</h4>
                    <p className="text-[11px] text-foreground/40 leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link 
                to="/properties"
                className="btn-gold flex items-center gap-3.5 max-w-xs group"
              >
                View Full Grid <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* ══ RIGHT Map & HUD Canvas Column ══ */}
          <div className="w-full lg:w-[62%] flex flex-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex-1 flex flex-col justify-end"
            >
              {/* Gold outer card frame shadow */}
              <div className="absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-b from-gold/15 to-transparent blur-md opacity-40 pointer-events-none" />

              <div 
                className="relative rounded-[2.5rem] overflow-hidden w-full flex-1 flex flex-col border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.85)] bg-[#090a0e]"
                style={{ minHeight: "520px" }}
              >
                
                {/* ── Hologram Vector Grid SVG Background ── */}
                <motion.svg
                  className="absolute inset-0 w-full h-full z-0"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                  initial={{ viewBox: viewBoxes.All }}
                  animate={{ viewBox: viewBoxes[selectedSector as keyof typeof viewBoxes] || viewBoxes.All }}
                  transition={{ duration: 1.2, ease: [0.25, 1, 0.35, 1] }}
                >
                  <defs>
                    {/* Architectural Matrix Grid */}
                    <pattern id="matrixGrid" width="45" height="45" patternUnits="userSpaceOnUse">
                      <path d="M 45 0 L 0 0 0 45" fill="none" stroke="hsla(220, 25%, 97%, 0.035)" strokeWidth="0.8" />
                      <circle cx="0" cy="0" r="1" fill="hsla(44, 50%, 53%, 0.12)" />
                    </pattern>

                    {/* Laser scanning gradient overlay */}
                    <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0" />
                      <stop offset="50%" stopColor="hsl(var(--gold))" stopOpacity="0.08" />
                      <stop offset="52%" stopColor="hsl(var(--gold))" stopOpacity="0.25" />
                      <stop offset="54%" stopColor="hsl(var(--gold))" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0" />
                    </linearGradient>

                    {/* Radar sweeps radial overlays */}
                    <radialGradient id="radialScan" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0.06" />
                      <stop offset="70%" stopColor="hsl(var(--gold))" stopOpacity="0.02" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Core Base Matrix Grid */}
                  <rect width="10000" height="10000" fill="url(#matrixGrid)" x="-1000" y="-1000" />
                  
                  {/* Glowing Radar Mesh overlay */}
                  <rect width="100%" height="100%" fill="url(#radialScan)" />

                  {/* Animated Continuous Laser Scanning Line */}
                  <motion.rect
                    width="100%"
                    height="60"
                    fill="url(#scanGradient)"
                    initial={{ y: -60 }}
                    animate={{ y: 560 }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Dynamic Target Coordinates Crosshair Backdrop */}
                  <g stroke="hsla(44, 50%, 53%, 0.06)" strokeWidth="0.8" fill="none">
                    <line x1="0" y1="280" x2="900" y2="280" />
                    <line x1="450" y1="0" x2="450" y2="560" />
                    {/* Ring guidelines */}
                    <circle cx="450" cy="280" r="100" />
                    <circle cx="450" cy="280" r="220" strokeDasharray="4 6" />
                    <circle cx="450" cy="280" r="350" />
                  </g>

                  {/* ── Visual Blueprint Representation of the Hooghly River ── */}
                  <path d="M 360 0 C 370 150, 420 300, 370 480 T 390 560" fill="none" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="7" strokeDasharray="6 4" />
                  <text x="350" y="90" fontSize="7" fill="rgba(56, 189, 248, 0.3)" fontFamily="monospace" letterSpacing="2.5" transform="rotate(78 350 90)">HOOGHLY RIVER</text>

                  {/* Concentric radar range lines around city clusters */}
                  {/* North & East sector guidelines */}
                  <g fill="none" stroke="hsl(var(--gold) / 0.12)" strokeWidth="0.8" strokeDasharray="3 5">
                    <ellipse cx="600" cy="400" rx="150" ry="110" />
                    <ellipse cx="600" cy="400" rx="220" ry="160" />
                  </g>

                  {/* Howrah & West sector guidelines */}
                  <g fill="none" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="0.8" strokeDasharray="3 5">
                    <ellipse cx="250" cy="380" rx="140" ry="100" />
                    <ellipse cx="250" cy="380" rx="200" ry="140" />
                  </g>

                  {/* Dynamic telemetry boundary tags in corners */}
                  <text x="30" y="45" fontSize="7" fill="hsla(220, 25%, 97%, 0.15)" fontFamily="monospace" letterSpacing="2">GRID: PD-KOLKATA-M</text>
                  <text x="30" y="525" fontSize="7" fill="hsla(220, 25%, 97%, 0.15)" fontFamily="monospace" letterSpacing="2">LAT: SUB-SECTOR SCAN</text>
                  <text x="870" y="45" fontSize="7" fill="hsla(220, 25%, 97%, 0.15)" fontFamily="monospace" letterSpacing="2" textAnchor="end">LINK: IMPARTIAL-SECURE</text>
                  <text x="870" y="525" fontSize="7" fill="hsla(220, 25%, 97%, 0.15)" fontFamily="monospace" letterSpacing="2" textAnchor="end">V: 4.2.0 // ACTIVE</text>

                  {/* Vector label overlays: Kolkata Metro Core */}
                  <g transform="translate(600, 480)">
                    <line x1="-15" y1="20" x2="15" y2="20" stroke="hsl(var(--gold) / 0.25)" strokeWidth="1" />
                    <text y="35" fontSize="9" fill="hsl(var(--gold) / 0.35)" fontFamily="sans-serif" letterSpacing="4" textAnchor="middle" fontWeight="700">METRO CORE</text>
                    <text y="47" fontSize="7" fill="hsl(var(--gold) / 0.2)" fontFamily="monospace" letterSpacing="1" textAnchor="middle">22.5726° N / 88.3639° E</text>
                  </g>

                  {/* Vector label overlays: Howrah & West */}
                  <g transform="translate(200, 240)">
                    <line x1="-15" y1="-85" x2="15" y2="-85" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" />
                    <text y="-70" fontSize="9" fill="rgba(56, 189, 248, 0.35)" fontFamily="sans-serif" letterSpacing="4" textAnchor="middle" fontWeight="700">HOWRAH ZONE</text>
                    <text y="-58" fontSize="7" fill="rgba(56, 189, 248, 0.2)" fontFamily="monospace" letterSpacing="1" textAnchor="middle">22.5850° N / 88.3185° E</text>
                  </g>
                </motion.svg>

                {/* ── Overlay Glass glare effect ── */}
                <div className="absolute inset-0 pointer-events-none z-10"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, transparent 60%)" }} />

                {/* ── Active Map Canvas Aspect ratio holder ── */}
                <div className="relative aspect-[16/10] w-full flex-1 z-20">

                  {/* ── Dynamic Pin Markers ── */}
                  <AnimatePresence>
                    {filteredLocations.map((loc, idx) => {
                      const prop = properties.find((p) => p.id === loc.id);
                      if (!prop) return null;

                      const isActive = activeId === loc.id;
                      const isWest = loc.sector === "West & Howrah";
                      const colorTheme = isWest ? "#38bdf8" : "hsl(var(--gold))";

                      return (
                        <motion.button
                          key={loc.id}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ 
                            delay: idx * 0.06, 
                            type: "spring", 
                            stiffness: 260, 
                            damping: 18 
                          }}
                          className="absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none pointer-events-auto"
                          style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                          onMouseEnter={() => setHoveredId(loc.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onClick={() => setSelectedId(selectedId === loc.id ? null : loc.id)}
                          aria-label={prop.name}
                        >
                          {/* Pulsating Sonar Rings (Continuous Aura) */}
                          <motion.span
                            className="absolute -inset-4 rounded-full pointer-events-none"
                            style={{
                              border: `1px solid ${colorTheme}`,
                              opacity: 0.15,
                            }}
                            animate={{ scale: [1, 2.2, 1], opacity: [0.15, 0.02, 0.15] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                          />

                          {/* Secondary Fast Pulse Ring on Active Hover */}
                          {isActive && (
                            <motion.span
                              className="absolute inset-0 rounded-full pointer-events-none"
                              style={{
                                border: `2.5px solid ${colorTheme}`,
                                boxShadow: `0 0 25px 8px ${colorTheme}`,
                              }}
                              initial={{ scale: 1, opacity: 0.8 }}
                              animate={{ scale: 2.8, opacity: 0 }}
                              transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                            />
                          )}

                          {/* Elegant Multi-layered Pin Icon */}
                          <motion.div
                            animate={{ 
                              scale: isActive ? 1.2 : 1, 
                              y: isActive ? -4 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 350, damping: 18 }}
                            className="relative w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300"
                            style={{
                              background: isActive 
                                ? colorTheme 
                                : "hsla(210, 45%, 8%, 0.85)",
                              border: `1.5px solid ${isActive ? "white" : colorTheme}`,
                              boxShadow: isActive 
                                ? `0 12px 24px -6px ${colorTheme}` 
                                : `0 4px 12px rgba(0,0,0,0.5)`,
                              backdropFilter: "blur(8px)",
                            }}
                          >
                            {isActive ? (
                              <Crosshair className="w-4 h-4 text-navy-deep animate-spin" style={{ animationDuration: "10s" }} />
                            ) : (
                              <div 
                                className="w-2 h-2 rounded-full" 
                                style={{
                                  background: colorTheme,
                                  boxShadow: `0 0 10px ${colorTheme}`,
                                }}
                              />
                            )}
                          </motion.div>

                          {/* Float-up dynamic price tags above pin */}
                          <AnimatePresence>
                            {(!isActive && prop.priceLabel) && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 0.8, y: 0 }}
                                className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-navy-deep/85 border border-white/5 px-2 py-0.5 rounded text-[7px] font-bold uppercase tracking-wider text-foreground/60 backdrop-blur-md pointer-events-none"
                              >
                                {prop.priceLabel.split(" ")[0]}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Hover Tooltip Label */}
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                                className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-2 rounded-xl text-[9px] tracking-[0.2em] uppercase font-bold pointer-events-none border glass-strong"
                                style={{
                                  borderColor: colorTheme,
                                  color: colorTheme,
                                  boxShadow: "0 10px 25px rgba(0,0,0,0.65)",
                                }}
                              >
                                {prop.name}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 glass-strong border-r border-b"
                                  style={{ borderColor: colorTheme }} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>

                  {/* ── Floating Premium Glassmorphic Property Preview Card ── */}
                  <AnimatePresence>
                    {activeProperty && (
                      <motion.div
                        key={activeProperty.id}
                        initial={{ opacity: 0, y: 28, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.97 }}
                        transition={{ type: "spring", damping: 24, stiffness: 260 }}
                        className="absolute bottom-6 right-6 w-[310px] md:w-[330px] z-30"
                        onMouseEnter={() => setHoveredId(activeProperty.id)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        <Link
                          to={`/properties/${activeProperty.slug}`}
                          className="block rounded-[2rem] overflow-hidden group border transition-all duration-500 glass-strong hover:border-gold/40 pointer-events-auto"
                          style={{
                            boxShadow: "0 30px 70px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.03) inset",
                          }}
                        >
                          {/* Dynamic Property Image container */}
                          <div className="relative h-44 overflow-hidden">
                            <img
                              src={activeProperty.cover}
                              alt={activeProperty.name}
                              className="w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
                            />
                            {/* Rich Dark vignette filter */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0e] via-[#090a0e]/30 to-transparent animate-fade-in" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#090a0e]/40 to-transparent" />

                            {/* Luxury tags badge */}
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1.5 rounded-full text-[8px] uppercase tracking-widest font-bold glass-strong border-gold/30 text-gold">
                                {activeProperty.tag || "Exclusive Luxury"}
                              </span>
                            </div>

                            {/* Ratings overlay */}
                            <div className="absolute top-4 right-4 flex gap-0.5 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-2.5 h-2.5 fill-gold text-gold" />
                              ))}
                            </div>

                            {/* Interactive blinking badge */}
                            <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-[7px] tracking-[0.2em] font-bold uppercase text-white/50">Direct Pricing</span>
                            </div>
                          </div>

                          {/* Body specifications */}
                          <div className="p-5.5 space-y-4 bg-gradient-to-b from-[#090a0e]/95 to-[#0b0c10]/95">
                            <div>
                              <h4 className="text-xl font-display text-white leading-tight mb-1 group-hover:text-gold transition-colors duration-300">
                                {activeProperty.name}
                              </h4>
                              <div className="flex flex-col gap-1 mt-1">
                                <p className="flex items-center gap-1.5 text-[8.5px] uppercase tracking-widest text-foreground/45">
                                  <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                                  <span className="truncate">{activeProperty.location}</span>
                                </p>
                                <span className="text-[7.5px] font-mono tracking-widest text-gold uppercase mt-0.5 bg-gold/5 px-2 py-0.5 rounded border border-gold/10 w-max">
                                  Dev: {activeProperty.developer || "Verified"}
                                </span>
                              </div>
                            </div>

                            {/* Styled Config miniature capsules */}
                            <div className="flex gap-2">
                              {[
                                { label: "Registry", val: activeProperty.rera ? "RERA Reg" : "Verified" },
                                { label: "Design", val: activeProperty.configuration?.split("·")[0]?.trim() || "Multi-family" },
                              ].map((m, idx) => (
                                <div 
                                  key={idx} 
                                  className="flex-1 rounded-xl px-3 py-2 text-center bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-300"
                                >
                                  <div className="text-[7px] uppercase tracking-widest text-foreground/30 font-semibold">{m.label}</div>
                                  <div className="text-[10px] font-semibold text-white/80 mt-0.5 truncate">{m.val}</div>
                                </div>
                              ))}
                            </div>

                            {/* Divider line */}
                            <div className="h-px bg-white/5" />

                            {/* Price labels and CTA action row */}
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-[8px] uppercase tracking-widest text-foreground/35 font-medium">Acquisition Cost</div>
                                <div className="text-xl font-bold font-display text-gradient-gold mt-0.5">
                                  {activeProperty.priceLabel}
                                </div>
                              </div>
                              
                              {/* Hover animated arrow button */}
                              <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gold/30 bg-gold/10 group-hover:bg-gold group-hover:border-white transition-all duration-300 shrink-0">
                                <ChevronRight className="w-4 h-4 text-gold group-hover:text-navy-deep transition-colors duration-300" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── HUD Telemetry Dashboard: Top-Left ── */}
                  <div className="absolute top-5 left-5 z-20 flex flex-col gap-2.5 px-4.5 py-3 rounded-2xl border glass-strong shadow-2xl pointer-events-none select-none">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full animate-ping bg-gold" />
                      <div className="w-2 h-2 rounded-full absolute bg-gold" />
                      <div>
                        <div className="text-[9.5px] uppercase tracking-[0.22em] font-bold text-white leading-none">Scanning Telemetry</div>
                        <div className="text-[7.5px] uppercase tracking-wider mt-0.5 text-foreground/40 font-mono">Radar v4.2 // Real-time Feed</div>
                      </div>
                    </div>
                    
                    {/* Active target telemetry readouts */}
                    <div className="grid grid-cols-3 gap-x-5 gap-y-1.5 pt-2 border-t border-white/5 font-mono text-[8px] tracking-wider text-foreground/50">
                      <div>
                        <div className="text-[6.5px] text-foreground/30 font-sans uppercase tracking-widest">LATITUDE</div>
                        <span className="font-semibold text-white/80">{telemetryCoordinates.lat}</span>
                      </div>
                      <div>
                        <div className="text-[6.5px] text-foreground/30 font-sans uppercase tracking-widest">LONGITUDE</div>
                        <span className="font-semibold text-white/80">{telemetryCoordinates.lng}</span>
                      </div>
                      <div>
                        <div className="text-[6.5px] text-foreground/30 font-sans uppercase tracking-widest">DEVELOPER</div>
                        <span className="font-semibold text-gold font-bold">{telemetryCoordinates.dev}</span>
                      </div>
                    </div>
                  </div>

                  {/* ── HUD Map Legend: Bottom-Left ── */}
                  <div className="absolute bottom-5 left-5 z-20 flex items-center gap-4.5 px-4 py-2.5 rounded-xl border glass bg-navy-deep/80 backdrop-blur-lg pointer-events-none select-none">
                    {[
                      { color: "hsl(var(--gold))", label: "Kolkata Metro Core" },
                      { color: "#38bdf8", label: "Howrah & West" },
                    ].map((leg) => (
                      <div key={leg.label} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: leg.color, boxShadow: `0 0 10px ${leg.color}` }} />
                        <span className="text-[8px] uppercase tracking-[0.15em] font-bold text-foreground/60">{leg.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* ── Empty Filter State Fallback ── */}
                  {filteredLocations.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-deep/60 backdrop-blur-sm z-10 p-6 text-center rounded-[2rem] pointer-events-auto">
                      <Layers className="w-8 h-8 text-gold/40 animate-bounce mb-3" />
                      <h4 className="text-lg font-display text-white mb-1">No coordinates match filters</h4>
                      <p className="text-xs text-foreground/40 max-w-xs font-light">
                        Try resetting your property category or selecting "All Sectors" to view active developments.
                      </p>
                      <button 
                        onClick={() => {
                          setSelectedSector("All");
                          setSelectedCategory("All");
                        }} 
                        className="mt-4 px-4 py-1.5 border border-gold/30 rounded-full text-[9px] uppercase tracking-widest font-bold text-gold hover:bg-gold hover:text-navy-deep transition-all duration-300 pointer-events-auto cursor-pointer"
                      >
                        Reset Map Coordinates
                      </button>
                    </div>
                  )}

                </div>{/* end aspect-ratio canvas */}
              </div>{/* end luxury card wrapper */}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartMap;