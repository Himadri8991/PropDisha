import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

const developers = [
  { name: "SRIJAN" },
  { name: "PS GROUP" },
  { name: "GODREJ" },
  { name: "SHAPOORJI" },
];

const stats = [
  { label: "Capital Deployed", value: 500, prefix: "₹", suffix: "Cr+" },
  { label: "Happy Homeowners", value: 10000, prefix: "", suffix: "+" },
  { label: "Cities Present", value: 2, prefix: "", suffix: "+" },
];

function useCounter(target: number, duration = 2000, enabled = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, enabled]);

  return count;
}

const AnimatedStat = ({ stat, delay }: { stat: typeof stats[0]; delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCounter(stat.value, 2000, inView);

  const formatted =
    stat.value >= 1000
      ? `${(count / 1000).toFixed(count === stat.value ? 0 : 1)}k`
      : `${count}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      className="flex flex-col gap-2"
    >
      <span className="font-display text-3xl md:text-4xl text-gold">
        {stat.prefix}{stat.value >= 1000 ? formatted : count}{stat.suffix}
      </span>
      <span className="text-[9px] tracking-[0.3em] uppercase text-foreground/35 font-semibold">
        {stat.label}
      </span>
    </motion.div>
  );
};

const TrustStrip = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-deep/70" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />

      <div className="container-luxe relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 md:gap-16 shrink-0">
            {stats.map((stat, i) => (
              <AnimatedStat key={stat.label} stat={stat} delay={i * 0.12} />
            ))}
          </div>

          <div className="hidden lg:block w-px h-12 bg-white/10 shrink-0" />

          {/* Developer Logos */}
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {developers.map((dev, i) => (
              <motion.div
                key={dev.name}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="group cursor-default"
              >
                <span className="font-display text-base md:text-lg tracking-[0.25em] uppercase text-foreground/25 group-hover:text-gold transition-colors duration-500">
                  {dev.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
