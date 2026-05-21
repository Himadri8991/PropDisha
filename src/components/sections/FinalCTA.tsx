import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Phone, Home, Building2, TrendingUp, ShieldCheck } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-navy-deep min-h-[80vh] flex items-center justify-center">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Soft Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,hsl(210,35%,15%)_0%,hsl(210,50%,8%)_100%)]" />
        
        {/* Subtle Geometric Pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(201,166,70,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,166,70,1) 1px, transparent 1px)", backgroundSize: "120px 120px" }} />
      </div>

      {/* Main Content Area */}
      <div className="container-luxe relative z-20 flex flex-col items-center justify-center text-center h-full max-w-4xl mx-auto px-4">
        
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-[10px] tracking-widest uppercase font-semibold mb-8">
          <ShieldCheck className="w-4 h-4" /> Trusted by 10,000+ Families
        </motion.div>

        {/* Heading */}
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-display leading-[1.05] text-white mb-6">
          Ready to find your<br />
          <span className="italic font-normal text-gradient-gold">dream property?</span>
        </motion.h2>

        {/* Subheading */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-foreground/70 font-light max-w-2xl mb-12">
          Connect with our real estate experts today. Whether you are looking for a luxury residence or a prime investment, we guide you every step of the way.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <Link to="/properties"
            className="btn-gold !px-10 !py-4 text-sm tracking-widest uppercase font-bold flex items-center gap-3 shadow-[0_20px_40px_-15px_rgba(201,166,70,0.4)] hover:scale-105 active:scale-95 transition-all duration-300">
            Explore Properties
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a href="https://wa.me/919331511222?text=Hello PropDisha, I am interested in exploring premium properties."
            target="_blank" rel="noopener noreferrer"
            className="btn-glass !px-10 !py-4 text-sm tracking-widest uppercase font-semibold flex items-center gap-3 border-white/20 hover:scale-105 active:scale-95 transition-all duration-300">
            <Phone className="w-4 h-4 text-gold" /> Talk to an Expert
          </a>
        </motion.div>

        {/* Trust Indicators / Features */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl border-t border-white/10 pt-10">
          {[
            { icon: Home, label: "Premium Listings", desc: "Curated luxury homes" },
            { icon: TrendingUp, label: "High ROI", desc: "Prime investment zones" },
            { icon: ShieldCheck, label: "Verified & Secure", desc: "Zero legal hassle" }
          ].map((feature, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.1 }}
              className="flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-navy-elevated border border-white/5 flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-300">
                <feature.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-1">{feature.label}</p>
                <p className="text-xs text-foreground/50 font-light">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default FinalCTA;