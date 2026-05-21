import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, TrendingUp, Building2, Home, LineChart, BookOpen, ArrowRight, Clock, User, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { Link } from "react-router-dom";

const categories = ["All", "Market Intel", "Investment", "Lifestyle", "Policy", "Area Guide"] as const;
type Category = (typeof categories)[number];

const articles = [
  {
    id: 1, slug: "new-town-kolkata-2025",
    title: "New Town Kolkata: Why It's Becoming India's Most Investable Address",
    excerpt: "From ₹4,000/sq.ft to ₹12,000/sq.ft in a decade — the New Town story is far from over.",
    category: "Investment", author: "Arjun Mehta", date: "Apr 28, 2025", readTime: "6 min",
    tag: "Trending", icon: TrendingUp,
  },
  {
    id: 2, slug: "alipore-micro-market-report",
    title: "Alipore Luxury: The Micro-Market Report 2025",
    excerpt: "Burdwan Road to Penn Road — we mapped every legacy mansion, new-age skyscraper, and pricing trend.",
    category: "Area Guide", author: "Priya Sharma", date: "Apr 22, 2025", readTime: "8 min",
    tag: "Exclusive", icon: Building2,
  },
  {
    id: 3, slug: "rera-first-time-buyers",
    title: "RERA for First-Time Buyers: The Complete Decoded Guide",
    excerpt: "Stop being confused by RERA certificates. Here's exactly what to look for, what to skip, and what's a red flag.",
    category: "Policy", author: "Rohit Das", date: "Apr 17, 2025", readTime: "10 min",
    tag: "Must Read", icon: BookOpen,
  },
  {
    id: 4, slug: "roi-calculator-luxury",
    title: "Luxury vs. Mid-Segment: Which Actually Gives Better ROI?",
    excerpt: "We ran the numbers on 200+ transactions over 5 years. The answer will surprise you.",
    category: "Investment", author: "Ananya Bose", date: "Apr 12, 2025", readTime: "7 min",
    tag: "Data", icon: LineChart,
  },
  {
    id: 5, slug: "howrah-riverfront-lifestyle",
    title: "Riverfront Living: An Honest Review of Ganges-Facing Homes",
    excerpt: "We spent a week at the sampling deck of Solaris Shalimar and Sampriti. Here's the unfiltered truth about the twin city's riverfront upgrade.",
    category: "Lifestyle", author: "Ananya Bose", date: "Apr 8, 2025", readTime: "5 min",
    tag: "Lifestyle", icon: Home,
  },
  {
    id: 6, slug: "kolkata-salt-lake-commercial",
    title: "Salt Lake Sector V: India's Quiet IT Powerhouse",
    excerpt: "Grade-A commercial real estate in Kolkata is delivering 7.8% rental yields. Here's why.",
    category: "Market Intel", author: "Arjun Mehta", date: "Apr 3, 2025", readTime: "9 min",
    tag: "Commercial", icon: Building2,
  },
];

const Insights = () => {
  const [cat, setCat] = useState<Category>("All");
  const [q, setQ] = useState("");

  const filtered = articles.filter(a => {
    if (cat !== "All" && a.category !== cat) return false;
    if (q && !a.title.toLowerCase().includes(q.toLowerCase()) && !a.excerpt.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-navy-deep -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[180px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>
        <div className="container-luxe">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-gold text-[10px] tracking-[0.6em] uppercase mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-gold/50" />Market Intelligence
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-8xl leading-[0.95] mb-8">
            Know before<br /><span className="italic font-normal text-gradient-gold">you buy.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-lg text-foreground/40 max-w-lg font-light leading-relaxed">
            Curated intelligence on India's most important real estate markets. Research-grade, jargon-free, actionable.
          </motion.p>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="sticky top-20 z-40 py-4">
        <div className="container-luxe">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-[2rem] p-4 md:p-6 border-white/5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-4 px-2 mb-5">
              <Search className="w-5 h-5 text-gold shrink-0" />
              <input value={q} onChange={e => setQ(e.target.value)}
                placeholder="Search articles, topics, areas…"
                className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-foreground/20 font-light" />
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              {categories.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-4 py-1.5 rounded-full text-[9px] tracking-widest uppercase font-bold border transition-all duration-300 ${cat === c ? "bg-gold text-navy-deep border-gold" : "border-white/5 text-foreground/40 hover:border-gold/30"}`}>
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container-luxe">
          <div className="mb-8">
            <motion.p key={filtered.length} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="text-sm tracking-widest text-foreground/40">
              <span className="text-foreground font-display text-3xl mr-2">{filtered.length}</span>ARTICLES
            </motion.p>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((a, i) => (
                <motion.div layout key={a.id}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}>
                  <div className="group glass rounded-[2.5rem] overflow-hidden hover:border-gold/20 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8)] border border-white/5 h-full flex flex-col">
                    {/* Card top */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-navy-soft to-navy-deep">
                      <div className="absolute inset-0 bg-gold/3 group-hover:bg-gold/8 transition-colors duration-700" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <a.icon className="w-16 h-16 text-gold/10 group-hover:text-gold/20 transition-colors duration-700" />
                      </div>
                      <div className="absolute top-6 left-6 flex gap-2">
                        <span className="px-3 py-1 rounded-full glass text-[9px] tracking-widest uppercase text-gold font-bold border border-gold/20">{a.tag}</span>
                        <span className="px-3 py-1 rounded-full glass text-[9px] tracking-widest uppercase text-foreground/50 border border-white/5">{a.category}</span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-[9px] tracking-[0.2em] uppercase text-foreground/30 mb-5">
                        <span className="flex items-center gap-1"><User className="w-3 h-3" />{a.author}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.readTime} read</span>
                        <span>{a.date}</span>
                      </div>
                      <h3 className="font-display text-xl leading-tight mb-4 group-hover:text-gold transition-colors">{a.title}</h3>
                      <p className="text-sm text-foreground/40 font-light leading-relaxed mb-8 flex-1">{a.excerpt}</p>
                      <div className="flex items-center gap-2 text-gold/60 group-hover:text-gold transition-colors text-xs tracking-widest uppercase font-bold">
                        Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 text-center glass rounded-[3rem]">
              <Search className="w-12 h-12 text-foreground/20 mx-auto mb-6" />
              <h3 className="font-display text-3xl mb-3">No articles found.</h3>
              <p className="text-foreground/30 mb-8">Try a different search or category.</p>
              <button onClick={() => { setQ(""); setCat("All"); }} className="btn-gold">Reset</button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="container-luxe max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-strong rounded-[3rem] p-16">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 grid place-items-center mx-auto mb-8">
              <Tag className="w-8 h-8 text-gold" />
            </div>
            <h2 className="font-display text-4xl mb-4">Stay Ahead of the Market</h2>
            <p className="text-foreground/40 font-light mb-10 leading-relaxed">
              Get curated market intelligence delivered to your inbox — no spam, just signal.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm placeholder:text-foreground/20 outline-none focus:border-gold/40 transition-colors" />
              <button className="btn-gold !px-8 whitespace-nowrap">Subscribe</button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Insights;
