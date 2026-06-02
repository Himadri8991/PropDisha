import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useSEO } from "@/hooks/useSEO";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import DiscoverByIntent from "@/components/sections/DiscoverByIntent";
import WhyPropDisha from "@/components/sections/WhyPropDisha";
import SmartMap from "@/components/sections/SmartMap";
import Insights from "@/components/sections/Insights";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

const Index = () => {
  useSEO({
    title: "PropDisha | Verified Luxury & Premium Real Estate in Kolkata & Howrah",
    description: "Discover the finest luxury and premium real estate collection in Kolkata and Howrah. PropDisha offers verified, pre-screened properties, smart location intelligence, and private consultations for high-growth investments.",
    keywords: "PropDisha, luxury real estate kolkata, verified properties kolkata, buy flats howrah, luxury apartments, real estate investment india"
  });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-background selection:bg-gold/30 selection:text-white">
      {/* Cinematic Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-[110] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        <TrustStrip />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <FeaturedProjects />
        </motion.div>

        <DiscoverByIntent />
        
        <WhyPropDisha />

        <SmartMap />

        <Insights />
        
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
