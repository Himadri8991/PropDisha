import { useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Check, 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  UserCheck, 
  Layers, 
  Compass
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { properties } from "@/data/properties";
import { useSEO } from "@/hooks/useSEO";

const ThankYou = () => {
  const location = useLocation();
  const state = location.state as { propertyName?: string; name?: string } | null;
  
  const leadName = state?.name;
  const propertyName = state?.propertyName;
  const hasState = !!(leadName && propertyName);

  useSEO({
    title: hasState 
      ? "Request Secured | PropDisha Private Concierge" 
      : "PropDisha Private Concierge | Premium Real Estate",
    description: hasState
      ? "Thank you for registering your request. A private advisor is curating your real estate portfolio."
      : "Welcome to the PropDisha Private Concierge. Explore our hand-picked collection of pre-screened luxury homes.",
    keywords: "propdisha success, luxury property inquiry, private residence advisor, real estate portfolio"
  });

  // Select 3 recommended properties to display (shuffled randomly, excluding the current one)
  const recommendations = useMemo(() => {
    const filtered = properties.filter(p => p.name !== propertyName);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [propertyName]);

  // Construct WhatsApp URL & Button text dynamically
  const whatsappData = useMemo(() => {
    if (hasState) {
      const text = `Hi PropDisha, my name is ${leadName}. I just submitted an inquiry for "${propertyName}". Please connect me with my residence advisor.`;
      return {
        url: `https://wa.me/919331511222?text=${encodeURIComponent(text)}`,
        title: "Instant Connection",
        desc: "Skip the dispatch queue. Click below to initiate direct private communication via WhatsApp with our senior concierge desk.",
        btn: "Connect on WhatsApp Now"
      };
    } else {
      const text = "Hi PropDisha, I would like to connect with a private real estate advisor to explore premium properties.";
      return {
        url: `https://wa.me/919331511222?text=${encodeURIComponent(text)}`,
        title: "Concierge Chat",
        desc: "Looking for something specific? Chat directly with our private concierge team to find your ideal premium property.",
        btn: "Chat with Concierge"
      };
    }
  }, [hasState, leadName, propertyName]);

  // Auto-scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative min-h-screen bg-navy-deep selection:bg-gold/30 selection:text-white overflow-hidden">
      {/* Decorative premium ambient glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[220px] rounded-full translate-x-1/3 -translate-y-1/3 -z-10" />
      <div className="absolute top-[40%] left-0 w-[600px] h-[600px] bg-gold/3 blur-[180px] rounded-full -translate-x-1/3 -z-10" />
      
      {/* Noise overlay for paper/brushed metal luxury feel */}
      <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />

      <Navbar />

      <main className="pt-36 pb-24">
        <div className="container-luxe max-w-6xl">
          
          {/* Main Success Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
            
            {/* Left Side: Confirmation & Next Steps */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Header section with micro-animations */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold">
                  <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
                  <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-bold">
                    {hasState ? "Priority Status Secured" : "Elite Properties Collection"}
                  </span>
                </div>
                
                {hasState ? (
                  <h1 className="font-display text-4xl md:text-6xl leading-tight">
                    Welcome to the <br />
                    <span className="italic font-normal text-gradient-gold">Privileged Circle.</span>
                  </h1>
                ) : (
                  <h1 className="font-display text-4xl md:text-6xl leading-tight">
                    Discover Elite <br />
                    <span className="italic font-normal text-gradient-gold">Real Estate Assets.</span>
                  </h1>
                )}
                
                {hasState ? (
                  <p className="text-foreground/60 text-lg font-light leading-relaxed max-w-xl">
                    Thank you, <span className="text-white font-semibold">{leadName}</span>. Your request for <span className="text-gold font-semibold">"{propertyName}"</span> has been successfully logged with our private advisory desk.
                  </p>
                ) : (
                  <p className="text-foreground/60 text-lg font-light leading-relaxed max-w-xl">
                    Welcome to the PropDisha Private Concierge. Explore our hand-picked, pre-screened portfolio of high-growth residential and commercial properties in Kolkata & Howrah.
                  </p>
                )}
              </motion.div>

              {/* Status/Progress Tracker */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-strong rounded-[2.5rem] p-8 md:p-10 border border-gold/10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial-gold opacity-10 pointer-events-none" />
                <h3 className="font-display text-xl mb-8 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-gold" /> 
                  {hasState ? "Concierge Dispatch Pipeline" : "Our Advisory Process"}
                </h3>

                {/* Vertical Timeline */}
                <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
                  
                  {/* Step 1 */}
                  <div className="relative">
                    <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-gold border border-gold flex items-center justify-center shadow-[0_0_15px_hsla(44,50%,53%,0.5)]">
                      <Check className="w-3 h-3 text-navy-deep stroke-[3px]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {hasState ? "Verification Dispatched" : "Request Registration"}
                      </h4>
                      <p className="text-xs text-foreground/40 font-light mt-0.5">
                        {hasState 
                          ? `Details verified and logged against "${propertyName}" pre-screened criteria.` 
                          : "Connecting verified home-seekers and investors directly to off-market portfolios."}
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-navy-elevated border border-gold flex items-center justify-center shadow-[0_0_15px_rgba(201,166,70,0.15)] animate-pulse">
                      <UserCheck className="w-3 h-3 text-gold" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">
                          {hasState ? "Private Advisor Match" : "Advisor Allocation"}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-gold/10 border border-gold/25 text-[8px] tracking-widest text-gold uppercase font-bold animate-pulse">Active</span>
                      </div>
                      <p className="text-xs text-foreground/40 font-light mt-0.5">
                        {hasState 
                          ? `Allocating a dedicated advisor specializing in the "${propertyName}" market segment.` 
                          : "Matching you with a hyper-local advisor specializing in your exact geographic or intent segment."}
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-navy-soft border border-white/10 flex items-center justify-center">
                      <Layers className="w-3 h-3 text-foreground/20" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground/40">VIP Portfolio Curation</h4>
                      <p className="text-xs text-foreground/20 font-light mt-0.5">
                        {hasState 
                          ? "Preparing comparative price/investment analyses and exclusive off-market options." 
                          : "Gathering pre-screened documents, project comparisons, and developer-side calculations."}
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative">
                    <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-navy-soft border border-white/10 flex items-center justify-center">
                      <Compass className="w-3 h-3 text-foreground/20" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground/40">Site Tour & Access Curation</h4>
                      <p className="text-xs text-foreground/20 font-light mt-0.5">
                        {hasState 
                          ? "Coordinating private transport and developer-side VIP site access." 
                          : "Scheduling private site visits with zero-brokerage guarantees and entry passes."}
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>

            </div>

            {/* Right Side: Interactive Call to Action / Instant WhatsApp */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* WhatsApp Instant Connect Widget */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-strong rounded-[2.5rem] p-8 border border-green-500/20 relative overflow-hidden bg-gradient-to-br from-navy-soft via-navy-deep to-navy-deep"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-[50px] rounded-full pointer-events-none" />
                
                <h3 className="font-display text-2xl mb-4 text-white">{whatsappData.title}</h3>
                <p className="text-sm text-foreground/50 font-light leading-relaxed mb-8">
                  {whatsappData.desc}
                </p>

                <a 
                  href={whatsappData.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4.5 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_15px_30px_rgba(34,197,94,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(34,197,94,0.4)]"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-green-500" />
                  {whatsappData.btn}
                </a>

                <div className="mt-6 flex justify-between items-center text-[10px] text-foreground/30 font-semibold tracking-wider uppercase border-t border-white/5 pt-5">
                  <span>Concierge Active</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                    <span>Average reply &lt; 5 mins</span>
                  </div>
                </div>
              </motion.div>

              {/* Secure Transaction badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass rounded-2xl p-5 border border-white/5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 border border-gold/20">
                  <Check className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Zero Brokerage Guarantee</h4>
                  <p className="text-[11px] text-foreground/40 font-light mt-0.5">PropDisha will never levy brokerage or advisory charges on your purchase.</p>
                </div>
              </motion.div>

            </div>

          </div>

          {/* Dynamic recommendations section */}
          <div className="border-t border-white/5 pt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-3">Explore Elite Options</p>
                <h2 className="font-display text-4xl">Other Curated Residences</h2>
              </div>
              <Link 
                to="/properties" 
                className="text-gold text-xs tracking-widest uppercase font-semibold hover:text-white transition-colors flex items-center gap-1 group"
              >
                View Full Collection 
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendations.map((p, i) => (
                <motion.div 
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Link 
                    to={`/properties/${p.slug}`}
                    className="group relative block aspect-[4/5] rounded-[2.5rem] overflow-hidden card-property"
                  >
                    <img 
                      src={p.cover} 
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent" />
                    <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-700" />

                    {/* Top Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      {p.tag && (
                        <div className="px-3.5 py-1.5 rounded-full glass border-white/10 text-[9px] tracking-[0.3em] uppercase text-gold font-bold">
                          {p.tag}
                        </div>
                      )}
                      <div className="px-3.5 py-1.5 rounded-full glass border-white/10 text-[9px] tracking-[0.3em] uppercase text-foreground/60">
                        {p.city}
                      </div>
                    </div>

                    {/* ROI badge */}
                    <div className="absolute top-6 right-6">
                      <div className="px-3 py-1.5 rounded-full glass border-gold/20 text-[9px] tracking-widest uppercase text-gold/80 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {p.investment.roi} ROI
                      </div>
                    </div>

                    {/* Bottom Details */}
                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <h3 className="text-2xl font-display mb-1.5 transition-colors group-hover:text-gold">{p.name}</h3>
                      <div className="flex items-center gap-2 text-foreground/50 text-xs font-light mb-1">
                        <MapPin className="w-3 h-3 text-gold" /> {p.location}
                      </div>
                      <p className="text-[10px] text-foreground/30 mb-5">{p.status} · {p.bhk[0] === 0 ? "Office" : `${p.bhk.join(", ")} BHK`} · {p.sizeRange}</p>
                      
                      <div className="flex items-center justify-between pt-5 border-t border-white/5">
                        <span className="text-base font-medium text-gradient-gold">{p.priceLabel}</span>
                        <div className="w-9 h-9 rounded-full border border-white/10 grid place-items-center group-hover:bg-gold group-hover:border-gold transition-all duration-500">
                          <ArrowRight className="w-4 h-4 group-hover:text-navy-deep transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
