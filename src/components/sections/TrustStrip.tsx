import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { ShieldCheck, Users, TrendingUp, Building } from "lucide-react";
import { Link } from "react-router-dom";

import srijanLogo from "@/assets/logos/srijan blue.svg";
import psLogo from "@/assets/logos/ps blue.svg";
import godrejLogo from "@/assets/logos/godrej.svg";
import shapoorjiLogo from "@/assets/logos/shapoorji.svg";
import edenLogo from "@/assets/logos/eden.webp";
import surekaLogo from "@/assets/logos/sureka group.png";
import vinayakLogo from "@/assets/logos/Vinayak logo.webp";
import alcoveLogo from "@/assets/logos/alcove logo.png";
import emamiLogo from "@/assets/logos/emami logo.png";
import dtcLogo from "@/assets/logos/DTC logo.png";
import primarcLogo from "@/assets/logos/primarc logo.svg";
import mayfairLogo from "@/assets/logos/mayfair logo.png";
import skyscraperLogo from "@/assets/logos/skyscraper logo.svg";
import atrilogo from "@/assets/logos/atri logo.png";
import atkkalimlogo from "@/assets/logos/ATK Kalim Logo.webp";


const stats = [
  { label: "Capital Deployed", value: 500, prefix: "₹", suffix: "Cr+", icon: TrendingUp },
  { label: "Happy Homeowners", value: 10000, prefix: "", suffix: "+", icon: Users },
  { label: "Verified Projects", value: 70, prefix: "", suffix: "+", icon: Building },
  { label: "RERA Compliant", value: 100, prefix: "", suffix: "%", icon: ShieldCheck },
];

const developers = [
  { name: "Srijan", logo: srijanLogo, keyName: "Srijan" },
  { name: "PS Group", logo: psLogo, keyName: "PS Group" },
  { name: "Godrej Properties", logo: godrejLogo, keyName: "Godrej Properties" },
  { name: "Shapoorji Pallonji", logo: shapoorjiLogo, keyName: "Shapoorji Pallonji" },
  { name: "Eden Realty", logo: edenLogo, keyName: "Eden Realty" },
  { name: "Sureka Group", logo: surekaLogo, keyName: "Sureka Group" },
  { name: "Vinayak Group", logo: vinayakLogo, keyName: "Vinayak Group" },
  { name: "Alcove Realty", logo: alcoveLogo, keyName: "Alcove Realty" },
  { name: "Emami Realty", logo: emamiLogo, keyName: "Emami Realty" },
  { name: "DTC Group", logo: dtcLogo, keyName: "DTC Group" },
  { name: "Primarc", logo: primarcLogo, keyName: "Primarc" },
  { name: "Mayfair Group", logo: mayfairLogo, keyName: "Mayfair Group" },
  { name: "Skyscraper", logo: skyscraperLogo, keyName: "Skyscraper" },
  { name: "Atri Group", logo: atrilogo, keyName: "Atri Group" },
  { name: "ATK Kalim Group", logo: atkkalimlogo, keyName: "ATK Kalim Group" },
];

function useCounter(target: number, duration = 2000, enabled = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, enabled]);
  return count;
}

const AnimatedStat = ({ stat, delay }: { stat: typeof stats[0]; delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCounter(stat.value, 2000, inView);
  const formatted = stat.value >= 1000
    ? `${(count / 1000).toFixed(count === stat.value ? 0 : 1)}k`
    : `${count}`;

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      className="group flex flex-col items-center gap-3 text-center">
      <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 grid place-items-center mb-1 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-500">
        <stat.icon className="w-5 h-5 text-gold" />
      </div>
      <span className="font-display text-3xl md:text-4xl text-gold">
        {stat.prefix}{stat.value >= 1000 ? formatted : count}{stat.suffix}
      </span>
      <span className="text-[9px] tracking-[0.3em] uppercase text-foreground/50 font-semibold">
        {stat.label}
      </span>
    </motion.div>
  );
};

const TrustStrip = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Strong visible background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-soft/30 to-navy-deep" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-luxe relative">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} delay={i * 0.12} />
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-14" />

        {/* Developer logos */}
        <div>
          <p className="text-center text-[9px] tracking-[0.5em] uppercase text-foreground/25 mb-8 font-semibold">
            Curated from India's finest developers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {developers.map((dev, i) => (
              <motion.div key={dev.name}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <Link
                  to={`/properties?developer=${encodeURIComponent(dev.keyName)}`}
                  className="group flex items-center gap-4 glass-strong px-6 py-4 rounded-2xl border-white/5 hover:border-gold/30 hover:bg-gold/5 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center p-1 group-hover:bg-white transition-all duration-500">
                    <img 
                      src={dev.logo} 
                      alt={`${dev.name} Logo`} 
                      className="max-w-full max-h-full object-contain filter grayscale brightness-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500" 
                    />
                  </div>
                  <span className="font-display text-xs md:text-sm tracking-[0.2em] uppercase text-foreground/40 group-hover:text-gold transition-colors duration-500">
                    {dev.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
