import { motion } from "framer-motion";
import { ShieldCheck, BanknoteIcon, BrainCircuit, TrendingUp, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const usps = [
  {
    icon: ShieldCheck,
    title: "Verified Premium Listings",
    desc: "Every property manually audited. Zero fake listings.",
    color: "text-emerald-400",
  },
  {
    icon: BanknoteIcon,
    title: "No Spam. No Brokers.",
    desc: "Talk directly to the developer's team. Your number stays private.",
    color: "text-blue-400",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Recommendations",
    desc: "Our system learns your taste and surfaces addresses you'll actually love.",
    color: "text-purple-400",
  },
  {
    icon: TrendingUp,
    title: "High ROI Projects Only",
    desc: "Data-backed selection. Only projects with strong appreciation potential.",
    color: "text-gold",
  },
];

const WhyPropDisha = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container-luxe">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-semibold"
            >
              Our Promise
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display leading-[1.05] mb-10"
            >
              The standard<br />
              <span className="italic font-normal text-gradient-gold">you deserve.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-lg text-foreground/40 font-light max-w-md leading-relaxed mb-12"
            >
              PropDisha was built to fix the trust deficit in India's real estate market. We don't list everything — we list what matters.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/properties"
                className="btn-glass flex items-center gap-4 w-max"
              >
                Explore the Collection
                <div className="w-8 h-px bg-gold/50" />
              </Link>
            </motion.div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {usps.map((usp, i) => (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group glass rounded-[1.75rem] p-8 border-white/5 hover:border-gold/20 transition-all duration-700"
              >
                <div className="w-12 h-12 rounded-xl glass grid place-items-center mb-6 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
                  <usp.icon className={`w-5 h-5 ${usp.color}`} />
                </div>
                <div className="flex items-start gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" />
                  <h3 className="text-base font-display leading-snug">{usp.title}</h3>
                </div>
                <p className="text-sm text-foreground/35 font-light leading-relaxed pl-6">{usp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Border bottom */}
      <div className="absolute bottom-0 left-0 w-full hairline opacity-30" />
    </section>
  );
};

export default WhyPropDisha;
