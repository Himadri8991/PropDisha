import { motion } from "framer-motion";
import { TrendingUp, Map, BarChart3, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const insights = [
  {
    title: "Price Trends",
    metric: "+12.4%",
    metricSub: "YoY Growth in Kolkata",
    desc: "Kolkata real estate is appreciating faster than other tier-1 markets in the mid-segment. Madhyamgram leads.",
    icon: TrendingUp,
    accent: "text-emerald-400",
    iconBg: "bg-emerald-400/10",
    border: "hover:border-emerald-400/30",
    bar: 78,
    barColor: "from-emerald-500 to-emerald-300",
    tag: "Kolkata",
    tagColor: "text-emerald-400",
  },
  {
    title: "Best Under ₹50L",
    metric: "₹38–50L",
    metricSub: "Sweet Spot Budget Range",
    desc: "Baruipur, Madhyamgram and Bally are topping buyer lists in the affordable premium bracket.",
    icon: Map,
    accent: "text-sky-400",
    iconBg: "bg-sky-400/10",
    border: "hover:border-sky-400/30",
    bar: 85,
    barColor: "from-sky-500 to-sky-300",
    tag: "Hot Zone",
    tagColor: "text-sky-400",
  },
  {
    title: "Investor Zones",
    metric: "9.2%",
    metricSub: "Rental Yield Salt Lake",
    desc: "Salt Lake Sector V continues to dominate commercial investment with Grade-A demand and 98% occupancy.",
    icon: BarChart3,
    accent: "text-gold",
    iconBg: "bg-gold/10",
    border: "hover:border-gold/30",
    bar: 92,
    barColor: "from-gold-deep to-gold-soft",
    tag: "Commercial",
    tagColor: "text-gold",
  },
];

const Insights = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-32 relative overflow-hidden" id="insights">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-navy-deep/50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-luxe relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div>
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-gold text-[10px] tracking-[0.5em] uppercase mb-5 font-semibold flex items-center gap-3">
              <span className="h-px w-8 bg-gold/50" /> Market Intelligence
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display">
              Quiet data. <span className="italic font-normal text-gradient-gold">Bold outcomes.</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-sm text-foreground/40 max-w-xs text-right hidden md:block font-light leading-relaxed">
            We track thousands of data points so you don't have to.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {insights.map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`glass rounded-[2.5rem] p-10 flex flex-col gap-7 border border-white/5 ${item.border} transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.6)] cursor-default`}>
              
              {/* Top row */}
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl ${item.iconBg} grid place-items-center transition-all duration-500 ${hovered === i ? "scale-110 rotate-3" : ""}`}>
                  <item.icon className={`w-5 h-5 ${item.accent}`} />
                </div>
                <span className={`text-[9px] tracking-[0.3em] uppercase font-bold px-3 py-1 rounded-full glass ${item.tagColor}`}>
                  {item.tag}
                </span>
              </div>

              {/* Metric */}
              <div>
                <p className={`text-5xl font-display mb-1 ${item.accent}`}>{item.metric}</p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 font-medium">{item.metricSub}</p>
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-[9px] tracking-widest uppercase text-foreground/30 mb-2">
                  <span>Confidence Index</span>
                  <span className={item.accent}>{item.bar}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.bar}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${item.barColor}`} />
                </div>
              </div>

              {/* Desc */}
              <p className="text-sm text-foreground/50 font-light leading-relaxed border-t border-white/5 pt-5">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-14 p-8 glass rounded-[2rem] border-white/5">
          <div>
            <p className="text-sm font-display mb-1">Want deeper market analysis?</p>
            <p className="text-xs text-foreground/40">Our advisors provide custom investment reports for serious buyers.</p>
          </div>
          <a href="https://wa.me/919331511222?text=I want a custom market analysis from PropDisha."
            target="_blank" rel="noopener noreferrer"
            className="btn-gold flex items-center gap-2 !px-8 !py-3 text-xs shrink-0">
            Get Free Report <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        <p className="text-center text-[9px] tracking-widest uppercase text-foreground/20 mt-8">
          Data sourced from PropDisha internal transactions & market research · Updated April 2026
        </p>
      </div>
    </section>
  );
};

export default Insights;
