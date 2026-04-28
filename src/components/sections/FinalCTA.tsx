import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageSquare, ArrowUpRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-40 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-navy-deep -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-gold/10 blur-[150px] rounded-full opacity-50 -z-10" />
      
      <div className="container-luxe text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-[10px] tracking-[0.6em] uppercase mb-10"
          >
            Take the next step
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-display leading-[0.9] mb-16"
          >
            Your dream address <br />
            <span className="italic font-normal text-gradient-gold">is closer than you think.</span>
          </motion.h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/properties"
              className="btn-gold !px-12 !py-5 text-sm tracking-widest uppercase font-bold flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
            >
              Explore Now
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            
            <a
              href="https://wa.me/918580000858?text=I want to talk to an expert about PropDisha properties."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass !px-12 !py-5 text-sm tracking-widest uppercase flex items-center gap-3 border-white/20 hover:scale-105 active:scale-95 transition-all"
            >
              Talk to Expert
              <MessageSquare className="w-4 h-4 text-gold" />
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-20 flex items-center justify-center gap-8 text-[10px] tracking-[0.3em] uppercase text-foreground/30 font-medium"
          >
            <span>Kolkata</span>
            <div className="w-1.5 h-1.5 rounded-full bg-gold/20" />
            <span>Mumbai</span>
            <div className="w-1.5 h-1.5 rounded-full bg-gold/20" />
            <span>Expanding India</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative hairline */}
      <div className="absolute bottom-0 left-0 w-full hairline opacity-20" />
    </section>
  );
};

export default FinalCTA;
