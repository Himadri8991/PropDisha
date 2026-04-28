import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Navigation, Star, ArrowRight, ChevronRight } from "lucide-react";
import { properties } from "@/data/properties";
import { Link } from "react-router-dom";
import { useState } from "react";

const SmartMap = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();
  const activeProperty = properties.find((p) => p.id === (hoveredId || selectedId));

  // Kolkata-inspired layout positions
  const locations = [
    { id: "1", x: 28, y: 38, city: "Kolkata" },
    { id: "3", x: 68, y: 28, city: "Kolkata" },
    { id: "5", x: 48, y: 62, city: "Kolkata" },
    { id: "2", x: 18, y: 75, city: "Kolkata" },
    { id: "4", x: 75, y: 55, city: "Mumbai" },
    { id: "6", x: 82, y: 72, city: "Mumbai" },
  ];

  return (
    <section className="py-32 bg-navy-deep relative overflow-hidden">
      <div className="container-luxe">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Map */}
          <div className="w-full lg:w-2/3">
            <div className="relative aspect-[4/3] md:aspect-video rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)]" style={{ background: "#060f18" }}>
              {/* Grid lines */}
              <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(201,166,70,0.06)" strokeWidth="0.5" />
                  </pattern>
                  <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(201,166,70,0.12)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#mapGrid)" />
                <rect width="100%" height="100%" fill="url(#centerGlow)" />
                {/* Stylized road lines */}
                <path d="M 0 180 Q 250 160 500 200 Q 650 220 800 180" stroke="rgba(201,166,70,0.08)" strokeWidth="6" fill="none" strokeLinecap="round" />
                <path d="M 200 0 Q 220 250 180 500" stroke="rgba(201,166,70,0.06)" strokeWidth="4" fill="none" />
                <path d="M 550 0 Q 570 250 530 500" stroke="rgba(201,166,70,0.06)" strokeWidth="4" fill="none" />
                <path d="M 0 350 Q 400 330 800 360" stroke="rgba(201,166,70,0.05)" strokeWidth="3" fill="none" />
              </svg>

              {/* Location Markers */}
              {locations.map((loc) => {
                const prop = properties.find((p) => p.id === loc.id);
                const isActive = hoveredId === loc.id || selectedId === loc.id;
                return (
                  <button
                    key={loc.id}
                    className="absolute z-20 group"
                    style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: "translate(-50%, -50%)" }}
                    onMouseEnter={() => setHoveredId(loc.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedId(selectedId === loc.id ? null : loc.id)}
                    aria-label={prop?.name}
                  >
                    {/* Ping ring */}
                    <span className="absolute inset-0 rounded-full bg-gold/20 animate-ping" style={{ animationDuration: "2s" }} />
                    {/* Marker */}
                    <motion.div
                      animate={{ scale: isActive ? 1.3 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`relative w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-lg ${
                        isActive
                          ? "bg-gold border-gold text-navy-deep shadow-[0_0_20px_hsl(44_50%_53%/0.6)]"
                          : "bg-navy-deep/80 border-gold/50 text-gold backdrop-blur-sm"
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </motion.div>

                    {/* City label */}
                    <div className={`absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded glass text-[9px] tracking-widest uppercase font-bold transition-all duration-300 ${isActive ? 'opacity-100 text-gold' : 'opacity-0'}`}>
                      {prop?.name}
                    </div>
                  </button>
                );
              })}

              {/* Property Preview Card */}
              {activeProperty && (
                <motion.div
                  key={activeProperty.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute bottom-6 right-6 z-30 w-64"
                >
                  <Link
                    to={`/properties/${activeProperty.slug}`}
                    className="block glass-strong rounded-2xl overflow-hidden border-gold/20 hover:border-gold/40 transition-all duration-300"
                  >
                    <div className="relative h-28 overflow-hidden">
                      <img src={activeProperty.cover} alt={activeProperty.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-transparent" />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1.5">
                        <h4 className="font-display text-base leading-tight">{activeProperty.name}</h4>
                        <Star className="w-3.5 h-3.5 text-gold fill-gold shrink-0 mt-0.5" />
                      </div>
                      <p className="text-[9px] tracking-widest uppercase text-foreground/40 flex items-center gap-1 mb-3">
                        <MapPin className="w-2.5 h-2.5" /> {activeProperty.location}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gradient-gold">{activeProperty.priceLabel}</span>
                        <div className="w-7 h-7 rounded-full bg-gold/10 grid place-items-center group-hover:bg-gold transition-all">
                          <ChevronRight className="w-4 h-4 text-gold" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Top badge */}
              <div className="absolute top-6 left-6 z-10 glass px-4 py-2 rounded-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[9px] tracking-[0.3em] uppercase text-foreground/60 font-medium">Live Discovery</span>
              </div>

              {/* City legend */}
              <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <span className="text-[9px] tracking-widest uppercase text-foreground/40">Kolkata</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold/50" />
                  <span className="text-[9px] tracking-widest uppercase text-foreground/40">Mumbai</span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="w-full lg:w-1/3">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-semibold"
            >
              Proximity Intelligence
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display leading-[1.1] mb-8"
            >
              Find your city's<br />
              <span className="italic font-normal text-gradient-gold">best addresses.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-base text-foreground/40 font-light leading-relaxed mb-10"
            >
              Hover over any marker to instantly see property details. Click to lock the preview and explore further.
            </motion.p>

            <div className="space-y-4 mb-12">
              {[
                { label: "Kolkata Properties", count: "4 Active" },
                { label: "Mumbai Properties", count: "2 Active" },
                { label: "Avg. ROI", count: "14–18%" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-xs tracking-widest uppercase text-foreground/40">{stat.label}</span>
                  <span className="text-sm font-semibold text-gold">{stat.count}</span>
                </div>
              ))}
            </div>

            <Link to="/properties" className="btn-glass flex items-center gap-3 w-full justify-center">
              Explore All Locations
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartMap;
