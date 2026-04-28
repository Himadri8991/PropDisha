import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, TrendingUp, Building2, Crown, ArrowRight } from "lucide-react";

const intents = [
  {
    title: "Buy Your Dream Home",
    subtitle: "Own more than just a house",
    icon: Home,
    intent: "Buy",
    accent: "group-hover:text-sky-400",
    borderHover: "group-hover:border-sky-400/30",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(56,189,248,0.25)]",
  },
  {
    title: "Invest Smart",
    subtitle: "Make money while you sleep",
    icon: TrendingUp,
    intent: "Invest",
    accent: "group-hover:text-emerald-400",
    borderHover: "group-hover:border-emerald-400/30",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(52,211,153,0.25)]",
  },
  {
    title: "Commercial Spaces",
    subtitle: "Where your business grows",
    icon: Building2,
    intent: "Commercial",
    accent: "group-hover:text-gold",
    borderHover: "group-hover:border-gold/30",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(201,166,70,0.25)]",
  },
  {
    title: "Luxury Living",
    subtitle: "Live beyond ordinary",
    icon: Crown,
    intent: "Luxury",
    accent: "group-hover:text-purple-400",
    borderHover: "group-hover:border-purple-400/30",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(192,132,252,0.25)]",
  },
];

const DiscoverByIntent = () => {
  return (
    <section className="py-32 bg-navy-deep relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "36px 36px" }}
      />

      <div className="container-luxe">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-[10px] tracking-[0.5em] uppercase mb-5 font-semibold"
          >
            Personalized Discovery
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display"
          >
            Find what <span className="italic font-normal text-gradient-gold">moves you.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {intents.map((item, i) => (
            <motion.div
              key={item.intent}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/properties?intent=${item.intent}`}
                className={`group block glass rounded-[2rem] p-10 flex flex-col items-center text-center gap-8 border border-white/5 ${item.borderHover} ${item.glow} transition-all duration-700 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold`}
              >
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl glass border-white/5 grid place-items-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
                  <item.icon className={`w-9 h-9 text-foreground/40 transition-colors duration-500 ${item.accent}`} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-xl font-display mb-3 leading-tight">{item.title}</h3>
                  <p className="text-xs text-foreground/35 font-light tracking-wide uppercase leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-white/5" />

                {/* CTA */}
                <div className={`flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-foreground/30 ${item.accent} group-hover:gap-4 transition-all duration-500 font-semibold`}>
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
