import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, SlidersHorizontal, MapPin, Sparkles, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { properties, type Intent } from "@/data/properties";

const cities = ["All", "Kolkata", "Mumbai"] as const;
const intents: ("All" | Intent)[] = ["All", "Buy", "Invest", "Commercial", "Luxury"];
const bhkOptions = ["Any", "1", "2", "3", "4+"] as const;

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [city, setCity] = useState<(typeof cities)[number]>("All");
  const [intent, setIntent] = useState<(typeof intents)[number]>(
    (searchParams.get("intent") as any) || "All"
  );
  const [bhk, setBhk] = useState<(typeof bhkOptions)[number]>("Any");
  const [budget, setBudget] = useState(1000); // in lakhs
  const [q, setQ] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const query = searchParams.get("q");
    const it = searchParams.get("intent");
    if (query !== null) setQ(query);
    if (it !== null) setIntent(it as any);
  }, [searchParams]);

  const filtered = useMemo(
    () =>
      properties.filter((p) => {
        if (city !== "All" && p.city !== city) return false;
        if (intent !== "All" && !p.intent.includes(intent)) return false;
        if (p.priceMin > budget) return false;
        if (bhk !== "Any") {
          const n = bhk === "4+" ? 4 : parseInt(bhk);
          if (bhk === "4+" ? !p.bhk.some((b) => b >= 4) : !p.bhk.includes(n)) return false;
        }
        if (q.trim()) {
          const t = q.toLowerCase();
          if (
            !p.name.toLowerCase().includes(t) &&
            !p.location.toLowerCase().includes(t) &&
            !p.developer.toLowerCase().includes(t)
          )
            return false;
        }
        return true;
      }),
    [city, intent, bhk, budget, q],
  );

  return (
    <div className="min-h-screen bg-background selection:bg-gold/30 selection:text-white">
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-navy-deep -z-10" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2 -z-10" />
        
        <div className="container-luxe">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold text-[10px] tracking-[0.6em] uppercase mb-8"
            >
              The Curated Collection
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-8xl leading-[0.95] mb-10"
            >
              Every address <br />
              <span className="italic font-normal text-gradient-gold">tells a story.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-foreground/40 max-w-xl font-light leading-relaxed"
            >
              A selective portfolio of residences and investment assets, verified for the few who value time and trust.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Advanced Filter Bar */}
      <section className="sticky top-24 z-40 py-6">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-[2rem] p-4 md:p-6 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] border-white/5"
          >
            <div className="flex flex-col gap-6">
              {/* Search Strip */}
              <div className="flex items-center gap-6 px-4">
                <Search className="w-5 h-5 text-gold shrink-0" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search project, location or developer…"
                  className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-foreground/20 font-light"
                />
                {q && (
                  <button onClick={() => setQ("")} className="p-2 hover:text-gold transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                )}
                <div className="h-6 w-px bg-white/10 hidden md:block" />
                <div className="hidden md:flex items-center gap-2 text-foreground/40">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] tracking-[0.2em] uppercase">AI Search</span>
                </div>
              </div>

              {/* Pills Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6 border-t border-white/5">
                <FilterGroup label="City" value={city} setValue={setCity as any} options={cities as any} />
                <FilterGroup label="Purpose" value={intent} setValue={setIntent as any} options={intents as any} />
                <FilterGroup label="Layout" value={bhk} setValue={setBhk as any} options={bhkOptions as any} />
                
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-end">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 font-bold">Max Investment</p>
                    <span className="text-sm font-display text-gold">
                      ₹{budget < 100 ? `${budget} L` : `${(budget / 100).toFixed(2)} Cr`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={1000}
                    step={10}
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    className="w-full accent-gold h-1 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-20">
        <div className="container-luxe">
          <div className="flex items-end justify-between mb-12">
            <p className="text-sm tracking-widest text-foreground/40">
              <span className="text-foreground font-display text-2xl mr-2">{filtered.length}</span> 
              RESULTS MATCHED
            </p>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-foreground/20 font-bold">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Relevance
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-32 text-center glass rounded-[3rem]"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 grid place-items-center mx-auto mb-8">
                  <Search className="w-8 h-8 text-foreground/20" />
                </div>
                <h3 className="text-3xl font-display mb-4">No addresses found.</h3>
                <p className="text-foreground/40 max-w-xs mx-auto">Try adjusting your filters or search terms for better results.</p>
              </motion.div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {filtered.map((p, i) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={p.id}
                  >
                    <Link
                      to={`/properties/${p.slug}`}
                      className="group relative block aspect-[4/5] rounded-[2.5rem] overflow-hidden"
                    >
                      <img
                        src={p.cover}
                        alt={p.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-700" />

                      {/* Tags */}
                      <div className="absolute top-6 left-6 flex flex-col gap-2">
                        {p.tag && (
                          <div className="px-4 py-1.5 rounded-full glass border-white/10 text-[9px] tracking-[0.3em] uppercase text-gold font-bold">
                            {p.tag}
                          </div>
                        )}
                        <div className="px-4 py-1.5 rounded-full glass border-white/10 text-[9px] tracking-[0.3em] uppercase text-foreground/60">
                          {p.city}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="absolute inset-x-0 bottom-0 p-10">
                        <div className="flex flex-col gap-4">
                          <div>
                            <h3 className="text-3xl font-display mb-2 transition-colors group-hover:text-gold">{p.name}</h3>
                            <div className="flex items-center gap-2 text-foreground/50 text-xs font-light tracking-wide">
                              <MapPin className="w-3.5 h-3.5 text-gold" />
                              {p.location}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <span className="text-lg font-medium text-gradient-gold">{p.priceLabel}</span>
                            <div className="w-10 h-10 rounded-full border border-white/10 grid place-items-center group-hover:bg-gold group-hover:border-gold transition-all duration-500">
                              <ArrowRight className="w-5 h-5 group-hover:text-navy-deep transition-colors" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FilterGroup = <T extends string>({
  label,
  value,
  setValue,
  options,
}: {
  label: string;
  value: T;
  setValue: (v: T) => void;
  options: readonly T[];
}) => (
  <div className="flex flex-col gap-4">
    <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 font-bold">{label}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => setValue(o)}
          className={`px-4 py-2 rounded-full text-[10px] tracking-widest uppercase font-bold transition-all duration-500 border ${
            value === o
              ? "bg-gold text-navy-deep border-gold shadow-[0_10px_20px_-5px_hsl(var(--gold)/0.4)]"
              : "border-white/5 text-foreground/40 hover:border-gold/30 hover:text-foreground"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  </div>
);

export default Properties;
