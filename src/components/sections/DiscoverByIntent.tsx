import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, TrendingUp, Building2, Crown, ArrowRight, Sparkles } from "lucide-react";

const intentColors: Record<string, string> = {
  Buy: "#38bdf8",
  Invest: "#34d399",
  Commercial: "hsl(44 50% 53%)",
  Luxury: "#c084fc",
};

const intents = [
  {
    title: "Buy Your Dream Home",
    subtitle: "Own more than just a house",
    desc: "Handpicked residences with verified credentials and zero brokerage.",
    icon: Home,
    intent: "Buy",
    color: "text-sky-400",
    bg: "from-sky-500/10",
    border: "hover:border-sky-400/40",
    glow: "hover:shadow-[0_20px_60px_-10px_rgba(56,189,248,0.2)]",
    count: "4 Projects",
  },
  {
    title: "Invest Smart",
    subtitle: "Make money while you sleep",
    desc: "High-ROI projects with institutional-grade analysis. 14–22% returns.",
    icon: TrendingUp,
    intent: "Invest",
    color: "text-emerald-400",
    bg: "from-emerald-500/10",
    border: "hover:border-emerald-400/40",
    glow: "hover:shadow-[0_20px_60px_-10px_rgba(52,211,153,0.2)]",
    count: "5 Projects",
  },
  {
    title: "Commercial Spaces",
    subtitle: "Where your business grows quietly",
    desc: "Grade-A offices and retail spaces in prime micro-markets.",
    icon: Building2,
    intent: "Commercial",
    color: "text-gold",
    bg: "from-gold/10",
    border: "hover:border-gold/40",
    glow: "hover:shadow-[0_20px_60px_-10px_rgba(201,166,70,0.2)]",
    count: "1 Project",
  },
  {
    title: "Luxury Living",
    subtitle: "Live beyond ordinary",
    desc: "Sea-facing, river-view and sky residences for the truly discerning.",
    icon: Crown,
    intent: "Luxury",
    color: "text-purple-400",
    bg: "from-purple-500/10",
    border: "hover:border-purple-400/40",
    glow: "hover:shadow-[0_20px_60px_-10px_rgba(192,132,252,0.2)]",
    count: "3 Projects",
  },
];

const DiscoverByIntent = () => {
  return (
    <section className="py-32 relative overflow-hidden" style={{ background: "hsl(210 50% 8%)" }}>
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "36px 36px" }} />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-luxe">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-semibold">
            <Sparkles className="w-3 h-3" />
            Personalized Discovery
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display mb-6">
            Find what <span className="italic font-normal text-gradient-gold">moves you.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/50 max-w-md mx-auto font-light">
            Whether you're buying your first home or growing your portfolio — we have the right address for every intent.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {intents.map((item, i) => (
            <motion.div key={item.intent}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}>
              <Link to={`/properties?intent=${item.intent}`}
                className={`group block glass rounded-[2rem] p-8 flex flex-col gap-6 border border-white/5 ${item.border} ${item.glow} bg-gradient-to-br ${item.bg} to-transparent transition-all duration-700 hover:-translate-y-3 focus:outline-none`}>
                
                {/* Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl glass border-white/10 grid place-items-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
                    <item.icon className="w-6 h-6 transition-colors duration-500" style={{ color: intentColors[item.intent] ?? "currentColor", opacity: 0.7 }} />
                  </div>
                  <span className={`text-[9px] tracking-widest uppercase font-bold px-3 py-1 rounded-full glass ${item.color} border border-current/20`}>
                    {item.count}
                  </span>
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-xl font-display mb-2 leading-tight">{item.title}</h3>
                  <p className="text-[10px] text-foreground/35 font-light tracking-wide uppercase mb-3">{item.subtitle}</p>
                  <p className="text-sm text-foreground/50 font-light leading-relaxed">{item.desc}</p>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-foreground/30 group-hover:text-foreground/70 group-hover:gap-4 transition-all duration-500 font-semibold pt-2 border-t border-white/5 mt-auto">
                  Explore
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverByIntent;
