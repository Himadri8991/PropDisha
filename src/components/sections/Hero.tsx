import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Search, Mic, Sparkles, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { properties } from "@/data/properties";

const tabs = ["Buy", "Invest", "Commercial"] as const;

const placeholders = [
  "2BHK near metro under ₹50L…",
  "Luxury apartment in New Town…",
  "Commercial space in Salt Lake…",
  "3BHK with river view…",
  "Sea-facing flat in Mumbai…",
];

const quickTags = [
  { label: "2BHK Under ₹50L", q: "2BHK", intent: "Buy" },
  { label: "Luxury", q: "luxury", intent: "Luxury" },
  { label: "Near Metro", q: "metro", intent: "Buy" },
  { label: "Invest Smart", q: "", intent: "Invest" },
];

const Hero = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Buy");
  const [phIndex, setPhIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);

  // AI suggestions based on query
  const suggestions = searchQuery.length > 0
    ? properties
        .filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.developer.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 4)
    : [];

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = searchQuery.trim();
    if (!q) {
      navigate(`/properties?intent=${activeTab}`);
      return;
    }
    navigate(`/properties?q=${encodeURIComponent(q)}&intent=${activeTab}`);
    setShowSuggestions(false);
  };

  const handleTag = (tag: typeof quickTags[0]) => {
    setActiveTab(tag.intent as any);
    navigate(`/properties?q=${encodeURIComponent(tag.q)}&intent=${tag.intent}`);
  };

  const startVoiceSearch = () => {
    // Try Web Speech API
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.lang = "en-IN";
      recog.onstart = () => toast.info("Listening…", { description: "Speak your dream property" });
      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        navigate(`/properties?q=${encodeURIComponent(transcript)}&intent=${activeTab}`);
      };
      recog.onerror = () => toast.error("Could not capture voice. Please type instead.");
      recog.start();
    } else {
      toast.info("Voice Search", {
        description: "Speak-to-search is coming to PropDisha Premium very soon.",
      });
    }
  };

  // Typewriter
  useEffect(() => {
    if (searchQuery) return;
    const target = placeholders[phIndex];
    let i = 0;
    setTypedText("");
    const t = setInterval(() => {
      i++;
      setTypedText(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(t);
        setTimeout(() => setPhIndex((p) => (p + 1) % placeholders.length), 2800);
      }
    }, 55);
    return () => clearInterval(t);
  }, [phIndex, searchQuery]);

  // Cursor glow
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      heroRef.current.style.setProperty("--mx", `${((e.clientX - left) / width) * 100}%`);
      heroRef.current.style.setProperty("--my", `${((e.clientY - top) / height) * 100}%`);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ background: "hsl(210 50% 8%)" }}
    >
      {/* Cinematic BG */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/20 via-navy-deep/55 to-navy-deep z-10" />
        {/* Animated gradient mesh */}
        <div
          className="absolute inset-0 ken-burns opacity-50"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, #162d4a 0%, #0b1c2c 60%, #060f18 100%)" }}
        />
        {/* Cursor-reactive glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(600px circle at var(--mx, 50%) var(--my, 40%), rgba(201,166,70,0.12), transparent 70%)" }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 container-luxe w-full pt-28 pb-20">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-[9px] tracking-[0.35em] uppercase text-gold mb-10 font-semibold"
          >
            <Sparkles className="w-3 h-3" />
            India's Most Premium Discovery Platform
          </motion.div>

          {/* Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-[6rem] font-display leading-[0.94] mb-10"
          >
            Find properties that<br />
            <span className="italic font-normal text-gradient-gold">feel like you.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-foreground/50 max-w-xl mb-16 leading-relaxed font-light"
          >
            Curated residences from India's finest developers.
            No brokers. No noise. Just the right address.
          </motion.p>

          {/* Search Widget */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="w-full max-w-3xl"
          >
            {/* Tabs */}
            <div className="flex justify-center mb-5">
              <div className="inline-flex glass p-1.5 rounded-full">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-7 py-2.5 text-[10px] tracking-[0.25em] uppercase font-semibold rounded-full transition-all duration-500 ${
                      activeTab === tab ? "text-navy-deep" : "text-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {activeTab === tab && (
                      <motion.span
                        layoutId="tab-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-soft to-gold"
                        style={{ originX: 0 }}
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="relative group">
              {/* Glow on hover/focus */}
              <div className="absolute -inset-px rounded-[1.25rem] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 blur-xl pointer-events-none" />

              <div className="relative glass-strong rounded-[1.25rem] flex items-center gap-3 pl-6 pr-3 py-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                <Search className="w-5 h-5 text-gold/80 shrink-0" />

                <div className="flex-1 relative min-w-0">
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="w-full bg-transparent border-none outline-none text-lg md:text-xl py-3 placeholder:text-transparent"
                    aria-label="Search properties"
                  />
                  {!searchQuery && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1">
                      <span className="text-lg md:text-xl text-foreground/30">{typedText}</span>
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="inline-block w-0.5 h-6 bg-gold/60 ml-px"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={startVoiceSearch}
                    title="Voice Search"
                    className="p-3.5 rounded-xl hover:bg-white/5 transition-colors text-foreground/40 hover:text-gold"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    type="submit"
                    className="hidden sm:flex items-center gap-2 px-8 py-3.5 rounded-xl btn-gold !rounded-xl text-xs"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full mt-3 left-0 right-0 glass-strong rounded-2xl overflow-hidden z-50 border-white/5 shadow-xl"
                  >
                    {suggestions.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onMouseDown={() => {
                          navigate(`/properties/${p.slug}`);
                          setShowSuggestions(false);
                        }}
                        className="w-full flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0"
                      >
                        <Search className="w-4 h-4 text-gold/50 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{p.name}</p>
                          <p className="text-[10px] text-foreground/40 truncate">{p.location} · {p.priceLabel}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-foreground/20" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Quick Tags */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {quickTags.map((tag) => (
                <button
                  key={tag.label}
                  onClick={() => handleTag(tag)}
                  className="px-4 py-2 rounded-full glass text-[10px] tracking-[0.2em] uppercase text-foreground/50 hover:text-gold hover:border-gold/40 border border-white/5 transition-all duration-400 font-medium"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="text-[8px] tracking-[0.6em] uppercase text-foreground/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
