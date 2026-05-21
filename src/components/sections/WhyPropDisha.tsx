import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, BanknoteIcon, BrainCircuit, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";

const usps = [
  {
    icon: ShieldCheck,
    title: "Verified Premium Listings",
    desc: "Every property manually audited. Zero fake listings. RERA registered.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "hover:border-emerald-400/30",
  },
  {
    icon: BanknoteIcon,
    title: "No Spam. No Brokers.",
    desc: "Talk directly to the developer's team. Your number stays completely private.",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "hover:border-sky-400/30",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Recommendations",
    desc: "Our system learns your taste and surfaces addresses you'll actually love.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "hover:border-purple-400/30",
  },
  {
    icon: TrendingUp,
    title: "High ROI Projects Only",
    desc: "Data-backed selection. Only projects with strong appreciation potential.",
    color: "text-gold",
    bg: "bg-gold/10",
    border: "hover:border-gold/30",
  },
];

const WhyPropDisha = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 to-background" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 blur-[150px] rounded-full -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-luxe relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="text-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-semibold flex items-center gap-3">
              <span className="h-px w-8 bg-gold/50" />
              Our Promise
            </motion.p>
            <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display leading-[1.05] mb-8">
              The standard<br />
              <span className="italic font-normal text-gradient-gold">you deserve.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-lg text-foreground/50 font-light max-w-md leading-relaxed mb-10">
              PropDisha was built to fix the trust deficit in India's real estate market. We don't list everything — we list what matters.
            </motion.p>

            {/* Checklist */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="space-y-4 mb-12">
              {["Zero brokerage, direct developer access", "100% RERA registered properties", "PropDisha AI investment analysis", "Concierge support 7 days a week"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span className="text-sm text-foreground/60 font-light">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.4 }}>
              <Link to="/properties" className="btn-gold flex items-center gap-3 w-max !px-8">
                Explore the Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right: USP cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {usps.map((usp, i) => (
              <motion.div key={usp.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`group glass rounded-[1.75rem] p-7 border border-white/5 ${usp.border} transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]`}>
                <div className={`w-12 h-12 rounded-xl ${usp.bg} grid place-items-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <usp.icon className={`w-5 h-5 ${usp.color}`} />
                </div>
                <h3 className="text-base font-display leading-snug mb-2">{usp.title}</h3>
                <p className="text-sm text-foreground/40 font-light leading-relaxed">{usp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPropDisha;
