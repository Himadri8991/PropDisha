import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, HelpCircle, MessageCircle, Book, Home, FileText, Phone, ChevronDown, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { Link } from "react-router-dom";

const categories = [
  { label: "Getting Started", icon: Home, count: 6 },
  { label: "Properties", icon: Book, count: 8 },
  { label: "RERA & Legal", icon: FileText, count: 5 },
  { label: "Payments", icon: HelpCircle, count: 4 },
  { label: "Account", icon: HelpCircle, count: 3 },
];

const faqs = [
  {
    category: "Getting Started",
    q: "How is PropDisha different from MagicBricks or 99acres?",
    a: "PropDisha curates less than 1% of all available properties. We only list what our team has physically visited, legally verified, and editorially approved. No spam. No fake listings. No hidden fees.",
  },
  {
    category: "Getting Started",
    q: "Is PropDisha completely free for buyers?",
    a: "Yes. PropDisha charges zero brokerage from buyers. We earn referral fees from developers — only after a successful transaction. Your savings are our success.",
  },
  {
    category: "Getting Started",
    q: "How do I schedule a site visit?",
    a: "Simply send us a WhatsApp message or submit a contact form for any property. Your dedicated advisor will arrange a private, curated visit at a time of your choosing.",
  },
  {
    category: "Properties",
    q: "How are properties selected for PropDisha?",
    a: "Every property goes through our 12-point verification: RERA check, developer background verification, physical site inspection, pricing benchmark analysis, legal title verification, and editorial review.",
  },
  {
    category: "Properties",
    q: "Can I negotiate the price?",
    a: "Our advisors are experienced negotiators. We regularly secure pre-launch pricing, floor discounts, and flexible payment plans for our clients — benefits individual buyers rarely access alone.",
  },
  {
    category: "Properties",
    q: "What does 'Possession' date mean?",
    a: "Possession date is the developer's committed date for handing over the property to the buyer. Under RERA, delays beyond this date entitle the buyer to a refund with interest.",
  },
  {
    category: "RERA & Legal",
    q: "What is RERA and why does it matter?",
    a: "RERA (Real Estate Regulation and Development Act, 2016) is India's primary real estate regulation law. It mandates developer accountability, project registration, and transparency. All projects on PropDisha are RERA-registered.",
  },
  {
    category: "RERA & Legal",
    q: "Does PropDisha provide legal assistance?",
    a: "Our advisors can guide you through the documentation process and refer you to trusted RERA-certified lawyers in Kolkata and Howrah. Legal review is recommended for all purchases.",
  },
  {
    category: "Payments",
    q: "What payment plans are typically available?",
    a: "Most developers offer construction-linked plans, down payment plans, and subvention schemes. PropDisha advisors will present all available options and help you choose the most tax-efficient plan.",
  },
  {
    category: "Payments",
    q: "Can PropDisha help with home loans?",
    a: "Yes. We have partnerships with leading banks and NBFCs and can facilitate pre-approved home loan offers for our clients, often at preferential interest rates.",
  },
];

const Help = () => {
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered = faqs.filter(f => {
    if (activeCat !== "All" && f.category !== activeCat) return false;
    if (q && !f.q.toLowerCase().includes(q.toLowerCase()) && !f.a.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-navy-deep -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[180px] rounded-full" />
        </div>
        <div className="container-luxe text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-gold text-[10px] tracking-[0.6em] uppercase mb-8 flex items-center gap-3 justify-center">
            <div className="h-px w-8 bg-gold/50" />Help Centre
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-7xl leading-[0.95] mb-8">
            How can we<br /><span className="italic font-normal text-gradient-gold">help you?</span>
          </motion.h1>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass-strong rounded-2xl flex items-center gap-4 px-6 py-4 mt-10">
            <Search className="w-5 h-5 text-gold shrink-0" />
            <input value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search for help…"
              className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-foreground/20 font-light" />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-y border-white/5">
        <div className="container-luxe">
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => setActiveCat("All")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] tracking-widest uppercase font-bold transition-all duration-300 ${activeCat === "All" ? "bg-gold text-navy-deep border-gold" : "border-white/10 text-foreground/40 hover:border-gold/30"}`}>
              All Topics
            </button>
            {categories.map(c => (
              <button key={c.label} onClick={() => setActiveCat(c.label)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] tracking-widest uppercase font-bold transition-all duration-300 ${activeCat === c.label ? "bg-gold text-navy-deep border-gold" : "border-white/10 text-foreground/40 hover:border-gold/30"}`}>
                <c.icon className="w-3 h-3" />{c.label}
                <span className="opacity-50">({c.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container-luxe max-w-3xl mx-auto">
          <div className="mb-10">
            <p className="text-sm text-foreground/40">
              <span className="font-display text-3xl text-foreground">{filtered.length}</span> results
            </p>
          </div>

          <div className="space-y-3">
            {filtered.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }} className="glass rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-white/3 transition-colors gap-4">
                  <div>
                    <span className="text-[9px] tracking-[0.3em] uppercase text-gold/60 font-bold block mb-1">{f.category}</span>
                    <span className="text-sm font-medium">{f.q}</span>
                  </div>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-4 h-4 text-foreground/40 shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="px-8 pb-6 text-sm text-foreground/40 font-light leading-relaxed border-t border-white/5 pt-4">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 text-center glass rounded-[3rem]">
              <HelpCircle className="w-12 h-12 text-foreground/20 mx-auto mb-6" />
              <h3 className="font-display text-3xl mb-3">No results found.</h3>
              <p className="text-foreground/30 mb-8">Can't find what you're looking for? Talk to us directly.</p>
              <a href="https://wa.me/919331511222" target="_blank" rel="noopener noreferrer" className="btn-gold">WhatsApp Us</a>
            </motion.div>
          )}
        </div>
      </section>

      {/* Still need help */}
      <section className="py-24 border-t border-white/5">
        <div className="container-luxe">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MessageCircle, title: "WhatsApp Us", desc: "Get an answer in under 15 minutes.", href: "https://wa.me/919331511222", label: "Chat Now", external: true },
              { icon: Phone, title: "Call Us", desc: "Speak directly to an advisor.", href: "tel:+919331511222", label: "Call Now", external: false },
              { icon: HelpCircle, title: "Contact Form", desc: "Prefer email? We respond in 2 hours.", href: "/contact", label: "Get in Touch", external: false },
            ].map(c => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} className="glass-strong rounded-[2.5rem] p-10 text-center hover:border-gold/20 transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 grid place-items-center mx-auto mb-6">
                  <c.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-display text-xl mb-2">{c.title}</h3>
                <p className="text-sm text-foreground/40 font-light mb-8">{c.desc}</p>
                {c.external ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="btn-gold !px-8 !py-3 text-xs">{c.label}</a>
                ) : c.href.startsWith("/") ? (
                  <Link to={c.href} className="btn-glass !px-8 !py-3 text-xs">{c.label}</Link>
                ) : (
                  <a href={c.href} className="btn-glass !px-8 !py-3 text-xs">{c.label}</a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Help;
