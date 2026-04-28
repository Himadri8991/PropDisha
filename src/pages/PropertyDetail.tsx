import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Calendar,
  Phone,
  MapPin,
  Ruler,
  IndianRupee,
  TrendingUp,
  Activity,
  Sparkles,
  Train,
  GraduationCap,
  Stethoscope,
  ShieldCheck,
  X,
  MessageSquare,
  ChevronDown
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { getProperty, properties } from "@/data/properties";
import { toast } from "sonner";

const PropertyDetail = () => {
  const { slug } = useParams();
  const property = slug ? getProperty(slug) : undefined;

  const [slide, setSlide] = useState(0);
  const [planTab, setPlanTab] = useState<"master" | "unit" | "site">("master");
  const [lightbox, setLightbox] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (!property) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % property.gallery.length), 6000);
    return () => clearInterval(id);
  }, [property]);

  if (!property) {
    return (
      <div className="min-h-screen bg-navy-deep grid place-items-center">
        <div className="text-center">
          <p className="font-display text-4xl mb-6">Address not found.</p>
          <Link to="/properties" className="btn-gold">← The Collection</Link>
        </div>
      </div>
    );
  }

  const others = properties.filter((p) => p.developer === property.developer && p.id !== property.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background selection:bg-gold/30 selection:text-white">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gold z-[110] origin-left" style={{ scaleX }} />
      <Navbar />

      {/* 1. CINEMATIC HERO SLIDER */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img src={property.gallery[slide]} alt={property.name} className="w-full h-full object-cover" />
          </motion.div>
        </AnimatePresence>
        
        {/* Luxury Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-navy-deep/20 to-navy-deep z-10" />
        <div className="absolute inset-0 bg-navy-deep/40 z-10" />

        {/* Back Link */}
        <div className="absolute top-32 left-0 right-0 z-20">
          <div className="container-luxe">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Link
                to="/properties"
                className="inline-flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-foreground/50 hover:text-gold transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                The Collection
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Content */}
        <div className="absolute inset-x-0 bottom-0 z-20 pb-20 md:pb-32">
          <div className="container-luxe">
            <div className="grid lg:grid-cols-2 gap-12 items-end">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <span className="px-4 py-1.5 rounded-full glass text-[10px] tracking-[0.3em] uppercase text-gold">
                    {property.status}
                  </span>
                  <span className="px-4 py-1.5 rounded-full glass text-[10px] tracking-[0.3em] uppercase text-foreground/50">
                    {property.developer}
                  </span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-6xl md:text-8xl lg:text-[7.5rem] leading-[0.9] mb-8"
                >
                  {property.name}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3 text-foreground/60 text-lg md:text-xl font-light"
                >
                  <MapPin className="w-5 h-5 text-gold" /> {property.location}, {property.city}
                </motion.p>
              </div>

              {/* Floating Action Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="glass-strong p-8 rounded-[2rem] border-white/5 flex flex-col gap-6"
              >
                <div className="flex items-end justify-between border-b border-white/5 pb-6">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-2">Private Acquisition</p>
                    <p className="font-display text-4xl text-gradient-gold">{property.priceLabel}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-2">Demand</p>
                    <div className="flex items-center gap-2 text-gold">
                      <Activity className="w-4 h-4 animate-pulse" />
                      <span className="text-sm uppercase font-bold tracking-widest">{property.investment.demand}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => toast.success("Visit Request Sent", {
                      description: `Our advisor for ${property.name} will call you shortly.`
                    })}
                    className="btn-gold !px-0 flex items-center justify-center gap-2 group"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Book Visit</span>
                  </button>
                  <a 
                    href={`https://wa.me/918580000858?text=I am interested in ${property.name} at ${property.location}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass !px-0 flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-gold" />
                    <span>Inquire</span>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Progress Indicators */}
            <div className="mt-16 flex gap-2">
              {property.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className="relative h-1 overflow-hidden flex-1 rounded-full bg-white/10"
                >
                  {i === slide && (
                    <motion.div
                      layoutId="slideIndicator"
                      className="absolute inset-0 bg-gold"
                      transition={{ duration: 6, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SNAPSHOT STRIP */}
      <section className="py-20 border-b border-white/5 bg-navy-deep/50">
        <div className="container-luxe">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24">
            {[
              { Icon: BedDouble, label: "Configuration", value: property.bhk[0] === 0 ? "Office" : `${property.bhk.join(", ")} BHK` },
              { Icon: Ruler, label: "Carpet Area", value: property.sizeRange },
              { Icon: Calendar, label: "Possession", value: property.possession },
              { Icon: ShieldCheck, label: "RERA Status", value: "Registered" },
            ].map((item, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                key={item.label}
                className="group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <item.Icon className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/40">{item.label}</span>
                </div>
                <p className="font-display text-2xl group-hover:text-gold transition-colors">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STORY SECTION (EMOTIONAL) */}
      <section className="py-32 md:py-48 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="container-luxe max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-gold text-[10px] tracking-[0.5em] uppercase mb-12"
          >
            The Narrative
          </motion.div>
          
          <div className="space-y-10">
            {property.story.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] ${
                  i === property.story.length - 1 ? "italic text-gradient-gold" : "text-foreground"
                }`}
              >
                {line}
              </motion.p>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 flex items-center gap-6"
          >
            <div className="h-px w-20 bg-gold/30" />
            <p className="text-sm tracking-[0.2em] uppercase text-foreground/30">{property.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* 4. HIGHLIGHTS GRID */}
      <section className="py-32 bg-navy-soft/20">
        <div className="container-luxe">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gold text-[10px] tracking-[0.4em] uppercase mb-6"
              >
                Specifications
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-display"
              >
                Designed in <span className="italic">three dimensions.</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-foreground/40 max-w-sm text-right"
            >
              Every element of {property.name} is meticulously crafted to offer a life of unparalleled ease and elegance.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Amenities", items: property.highlights.amenities, Icon: Sparkles },
              { title: "Connectivity", items: property.highlights.connectivity, Icon: Train },
              { title: "Lifestyle", items: property.highlights.lifestyle, Icon: ShieldCheck },
            ].map((section, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                key={section.title}
                className="glass p-10 rounded-[2.5rem] group hover:border-gold/30 transition-all duration-700"
              >
                <div className="w-14 h-14 rounded-2xl bg-gold/10 grid place-items-center mb-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                  <section.Icon className="w-6 h-6 text-gold" />
                </div>
                <h4 className="text-[10px] tracking-[0.4em] uppercase text-gold font-bold mb-8">{section.title}</h4>
                <ul className="space-y-5">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-4 text-sm font-light text-foreground/70 group-hover:text-foreground transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/40 mt-1.5 shrink-0 group-hover:bg-gold transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GALLERY MASONRY */}
      <section className="py-32">
        <div className="container-luxe">
          <div className="flex items-end justify-between mb-20">
            <div>
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-6">Gallery</p>
              <h2 className="text-4xl md:text-5xl font-display">A <span className="italic">closer</span> look.</h2>
            </div>
            <button className="btn-glass flex items-center gap-3 !px-8 !py-3">
              View All Photos
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {property.gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                onClick={() => setLightbox(i)}
                className={`relative rounded-[2rem] overflow-hidden group cursor-zoom-in ${
                  i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
                }`}
              >
                <img
                  src={img}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-navy-deep/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FLOOR PLANS (INTERACTIVE) */}
      <section className="py-32 bg-navy-soft/20">
        <div className="container-luxe">
          <div className="text-center mb-16">
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-6">Interactive Plans</p>
            <h2 className="text-4xl md:text-5xl font-display mb-12">Drawn with <span className="italic">intent.</span></h2>
            
            <div className="flex justify-center gap-3">
              {(["master", "unit", "site"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setPlanTab(t)}
                  className={`px-8 py-3 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-500 border ${
                    planTab === t
                      ? "bg-gold text-navy-deep border-gold shadow-[0_0_20px_-5px_hsl(var(--gold))]"
                      : "border-white/10 text-foreground/40 hover:border-gold/30 hover:text-foreground"
                  }`}
                >
                  {t} plan
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            onClick={() => setLightbox(0)} // Zoom into first gallery image as placeholder for plan
            className="glass rounded-[3rem] aspect-[16/9] overflow-hidden relative group cursor-zoom-in"
          >
            <div className="absolute inset-0 bg-navy-deep opacity-40 group-hover:opacity-60 transition-opacity" />
            <img src={property.gallery[0]} alt="Plan Background" className="w-full h-full object-cover blur-sm scale-110 transition-transform duration-700 group-hover:scale-105" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-24 h-24 rounded-full glass border-gold/40 grid place-items-center mb-8 group-hover:border-gold transition-colors duration-500"
              >
                <Ruler className="w-8 h-8 text-gold" />
              </motion.div>
              <h3 className="text-4xl font-display mb-4 capitalize">{planTab} Configuration</h3>
              <p className="text-foreground/60 max-w-md text-lg font-light leading-relaxed mb-10">
                Detailed blueprints showing the exact layout, dimensions and spatial flow of the residence. Click to expand.
              </p>
              <button 
                onClick={(e) => { e.stopPropagation(); toast.success("Portfolio Sent", { description: "The HD floor plans have been sent to your registered email." }); }}
                className="btn-gold !rounded-2xl flex items-center gap-4 hover:scale-105 active:scale-95 transition-all"
              >
                Download PDF Portfolio
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. INVESTMENT SCORE (UNIQUE WEAPON) */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        
        <div className="container-luxe relative">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-6">Investment Intelligence</p>
              <h2 className="text-5xl md:text-6xl font-display leading-[1.1] mb-10">
                The numbers <span className="italic text-gradient-gold">behind the beauty.</span>
              </h2>
              <p className="text-lg text-foreground/40 font-light leading-relaxed mb-12">
                Real estate is the ultimate wealth creation vehicle. We provide institutional-grade intelligence to ensure your acquisition is as smart as it is beautiful.
              </p>
              <div className="glass p-8 rounded-3xl border-gold/10 inline-flex flex-col gap-2">
                <div className="flex items-center gap-3 text-gold">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-widest uppercase">Performance Index</span>
                </div>
                <p className="text-3xl font-display">{property.investment.appreciation}</p>
              </div>
            </div>

            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
              {[
                { label: "Projected ROI", value: property.investment.roi, sub: "Long-term compounding", icon: IndianRupee },
                { label: "Demand Level", value: property.investment.demand, sub: "Buyer sentiment: High", icon: Activity },
                { label: "Market Growth", value: property.investment.growth, sub: "Micro-market trends", icon: Sparkles },
                { label: "Resale Value", value: "Premium", sub: "Based on brand equity", icon: ShieldCheck },
              ].map((stat, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  key={stat.label}
                  className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-gold/30 transition-all duration-700"
                >
                  <stat.icon className="w-6 h-6 text-gold/60 mb-8" />
                  <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-3">{stat.label}</p>
                  <p className="text-4xl font-display text-gradient-gold mb-2">{stat.value}</p>
                  <p className="text-[10px] tracking-[0.1em] text-foreground/30 uppercase">{stat.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. LOCATION INTELLIGENCE */}
      <section className="py-32 bg-navy-soft/20">
        <div className="container-luxe grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-square rounded-[3rem] glass overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-0 bg-[#061019] opacity-90" />
            {/* Mock Map visualization */}
            <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-40">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--gold) / 0.1)" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <motion.circle 
                cx="200" cy="200" r="100" 
                fill="none" stroke="hsl(var(--gold) / 0.2)" 
                strokeWidth="1" strokeDasharray="4 4"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <circle cx="200" cy="200" r="8" fill="hsl(var(--gold))" />
              <circle cx="200" cy="200" r="20" fill="none" stroke="hsl(var(--gold))" strokeWidth="0.5" className="animate-ping" />
            </svg>
            
            <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <div className="glass-strong px-4 py-2 rounded-xl text-[10px] tracking-[0.3em] uppercase text-gold">Live Connectivity Feed</div>
                <div className="glass-strong px-4 py-2 rounded-xl text-[10px] tracking-[0.3em] uppercase text-green-500 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> High Accessibility
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "Global Airport", time: "15 min", pos: "top-10 left-10" },
                  { name: "CBD Hub", time: "12 min", pos: "bottom-1/4 right-10" },
                  { name: "Heritage Park", time: "5 min", pos: "top-1/3 right-1/4" }
                ].map(loc => (
                  <div key={loc.name} className="glass-strong p-4 rounded-2xl flex items-center justify-between border-white/5">
                    <span className="text-xs font-medium">{loc.name}</span>
                    <span className="text-xs text-gold font-bold">{loc.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-6">Contextual Awareness</p>
            <h2 className="text-5xl md:text-6xl font-display leading-[1.1] mb-10">
              Where minutes <span className="italic text-gradient-gold">become moments.</span>
            </h2>
            <p className="text-lg text-foreground/40 font-light leading-relaxed mb-12">
              Strategic location isn't just about distance—it's about the quality of life saved in transition. Every major node is within a thought's reach.
            </p>
            <ul className="space-y-8">
              {[
                { Icon: Train, label: "Metro & Transit", value: property.nearby.metro },
                { Icon: GraduationCap, label: "Premier Education", value: property.nearby.school },
                { Icon: Stethoscope, label: "Health & Wellness", value: property.nearby.hospital },
              ].map((node, i) => (
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  key={node.label}
                  className="flex items-start gap-6 group"
                >
                  <div className="w-14 h-14 rounded-2xl glass grid place-items-center shrink-0 transition-all duration-700 group-hover:border-gold group-hover:bg-gold/5">
                    <node.Icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-1">{node.label}</p>
                    <p className="text-xl font-display group-hover:text-gold transition-colors">{node.value}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 9. DEVELOPER & TRUST */}
      <section className="py-32">
        <div className="container-luxe">
          <div className="card-premium p-12 md:p-20 relative">
            <div className="absolute top-0 right-0 p-12 hidden lg:block opacity-10">
              <ShieldCheck className="w-64 h-64 text-gold" />
            </div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-gold-soft to-gold-deep grid place-items-center text-navy-deep font-display text-4xl shadow-2xl">
                    {property.developer.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.4em] uppercase text-gold font-bold mb-1">Developer Signature</p>
                    <h3 className="text-4xl font-display">{property.developer}</h3>
                  </div>
                </div>
                
                <p className="text-xl text-foreground/50 font-light leading-relaxed mb-12">
                  Legacy, craftsmanship and precision. Every square foot is a testament to decades of building for India's future. Curated and verified by PropDisha.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold">RERA Registered</span>
                  </div>
                  <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold">PropDisha Verified</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/30 font-bold">Registration Data</p>
                <div className="glass-strong p-8 rounded-3xl flex flex-col gap-4 border-white/5">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-sm text-foreground/40 font-light">RERA ID</span>
                    <span className="text-sm font-mono tracking-widest text-gold">{property.rera}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-sm text-foreground/40 font-light">Project Status</span>
                    <span className="text-sm uppercase font-bold tracking-widest">{property.status}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/40 font-light">Last Audit</span>
                    <span className="text-sm uppercase font-bold tracking-widest text-green-500">Passed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA (HIGH CONVERSION) */}
      <section className="py-40 relative overflow-hidden bg-navy-deep">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--gold)/0.15),transparent_70%)]" />
        <div className="container-luxe text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-8xl font-display leading-[1] mb-12">
              Some addresses are <br />
              <span className="italic text-gradient-gold">not found on maps.</span>
            </h2>
            <p className="text-xl text-foreground/50 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
              Connect with our private residence advisor for a confidential consultation and exclusive floor-plan walkthrough.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <button 
                onClick={() => toast.success("Visit Request Sent", { description: "We will coordinate with the builder for your private tour." })}
                className="btn-gold !px-16 !py-6 text-sm tracking-[0.3em] font-bold uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                Book Private Visit
              </button>
              <a 
                href="https://wa.me/918580000858?text=I want to connect with a private residence advisor about PropDisha properties."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass !px-16 !py-6 text-sm tracking-[0.3em] font-bold uppercase border-white/20 hover:scale-105 active:scale-95 transition-all text-center"
              >
                Talk to Expert
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* STICKY CTA BAR (MOBILE & DESKTOP) */}
      <div className="fixed bottom-8 left-0 right-0 z-[100] px-6 pointer-events-none">
        <div className="container-luxe max-w-5xl flex justify-center pointer-events-auto">
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="glass-strong px-6 py-4 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border-white/5 flex items-center gap-8 min-w-[320px] md:min-w-[600px]"
          >
            <div className="hidden sm:block">
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 font-bold mb-1">Inquiry for</p>
              <p className="text-lg font-display truncate max-w-[150px]">{property.name}</p>
            </div>
            
            <div className="w-px h-10 bg-white/5 hidden sm:block" />
            
            <div className="flex-1">
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 font-bold mb-1">Investment</p>
              <p className="text-lg font-display text-gradient-gold">{property.priceLabel}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <a 
                href="https://wa.me/918580000858"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full glass border-gold/40 grid place-items-center hover:bg-gold hover:text-navy-deep transition-all duration-500"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button 
                onClick={() => toast.success("Enquiry Received", { description: "An advisor will contact you within 15 minutes." })}
                className="btn-gold !px-8 !py-3 text-[10px] tracking-[0.2em] font-black"
              >
                ENQUIRE NOW
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] bg-navy-deep/98 backdrop-blur-3xl grid place-items-center p-4 md:p-20 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-10 right-10 text-white/50 hover:text-gold" onClick={() => setLightbox(null)}>
            <X className="w-10 h-10" />
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={property.gallery[lightbox]}
            alt="Fullscreen preview"
            className="max-h-full max-w-full rounded-3xl shadow-2xl"
          />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] uppercase text-white/30 font-bold">
            {lightbox + 1} / {property.gallery.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
