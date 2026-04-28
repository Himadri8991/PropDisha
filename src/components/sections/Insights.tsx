import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Map, BarChart3, ExternalLink } from "lucide-react";

const insights = [
  {
    title: "Price Trends",
    metric: "+12.4%",
    metricSub: "YoY Growth",
    desc: "Kolkata real estate is appreciating faster than Mumbai in the mid-segment.",
    icon: TrendingUp,
    accent: "text-emerald-400",
    bg: "from-emerald-500/5",
    bar: 78,
    tag: "Kolkata",
  },
  {
    title: "Best Under ₹50L",
    metric: "₹38–50L",
    metricSub: "Sweet Spot",
    desc: "Baruipur, Madhyamgram and Bally are topping buyer lists in the affordable premium bracket.",
    icon: Map,
    accent: "text-blue-400",
    bg: "from-blue-500/5",
    bar: 85,
    tag: "Hot Zone",
  },
  {
    title: "Investor Zones",
    metric: "9.2%",
    metricSub: "Rental Yield",
    desc: "Salt Lake Sector V continues to dominate commercial investment with Grade-A demand.",
    icon: BarChart3,
    accent: "text-gold",
    bg: "from-gold/5",
    bar: 92,
    tag: "Commercial",
  },
];

const Insights = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Section label */}
      <div className="container-luxe mb-20">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold text-[10px] tracking-[0.5em] uppercase mb-5 font-semibold"
            >
              Market Intelligence
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display"
            >
              Quiet data. <span className="italic font-normal text-gradient-gold">Bold outcomes.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-foreground/35 max-w-xs text-right hidden md:block font-light leading-relaxed"
          >
            We track thousands of data points so you don't have to.
          </motion.p>
        </div>
      </div>

      <div className="container-luxe">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {insights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`glass rounded-[2.5rem] p-10 flex flex-col gap-8 bg-gradient-to-br ${item.bg} to-transparent border-white/5 transition-all duration-700 cursor-default ${
                hovered === i ? "border-gold/20 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]" : ""
              }`}
            >
              {/* Icon + tag */}
              <div className="flex items-center justify-between">
                <div className={`w-13 h-13 rounded-2xl glass grid place-items-center w-12 h-12 transition-all duration-500 ${hovered === i ? "scale-110 rotate-3" : ""}`}>
                  <item.icon className={`w-5 h-5 ${item.accent}`} />
                </div>
                <span className={`text-[9px] tracking-[0.3em] uppercase font-bold px-3 py-1 rounded-full glass ${item.accent}`}>
                  {item.tag}
                </span>
              </div>

              {/* Metric */}
              <div>
                <p className={`text-5xl font-display mb-1 ${item.accent}`}>{item.metric}</p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 font-medium">{item.metricSub}</p>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.bar}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-gold-deep to-gold"
                  />
                </div>
                <p className="text-[9px] tracking-widest uppercase text-foreground/25 mt-2">{item.bar}% confidence index</p>
              </div>

              {/* Description */}
              <p className="text-sm text-foreground/50 font-light leading-relaxed border-t border-white/5 pt-6">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[10px] tracking-widest uppercase text-foreground/20 mt-12">
          Data sourced from PropDisha internal transactions & market research · Updated April 2026
        </p>
      </div>

      {/* Glow decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gold/3 blur-[200px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Insights;
