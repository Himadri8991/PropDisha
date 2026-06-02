import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Shield, Search, CheckCircle, XCircle, AlertCircle, ExternalLink, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { properties } from "@/data/properties";
import { Link } from "react-router-dom";

type VerifyResult = "found" | "not-found" | null;

const Verify = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<VerifyResult>(null);
  const [foundProp, setFoundProp] = useState<(typeof properties)[0] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const match = properties.find(p => {
        const reraSearch = typeof p.rera === 'string' 
          ? p.rera 
          : Object.values(p.rera).filter(Boolean).join(" ");
          
        return reraSearch.toLowerCase().includes(input.trim().toLowerCase()) ||
               p.name.toLowerCase().includes(input.trim().toLowerCase());
      });
      setFoundProp(match || null);
      setResult(match ? "found" : "not-found");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-navy-deep -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[180px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>
        <div className="container-luxe max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-gold text-[10px] tracking-[0.6em] uppercase mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-gold/50" />Verified Guarantee
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-8xl leading-[0.95] mb-8">
            Verify before<br /><span className="italic font-normal text-gradient-gold">you invest.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-xl text-foreground/40 max-w-xl font-light leading-relaxed">
            Every PropDisha listing carries a RERA registration number. Enter it here or search by project name to verify authenticity instantly.
          </motion.p>
        </div>
      </section>

      {/* Verifier */}
      <section className="py-12">
        <div className="container-luxe max-w-3xl mx-auto">
          <motion.form onSubmit={handleVerify} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }} className="glass-strong rounded-[2.5rem] p-8 md:p-12">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-gold" />
              <h2 className="font-display text-2xl">PropDisha Verify</h2>
            </div>
            <p className="text-sm text-foreground/30 font-light mb-8">Enter a RERA number or project name to instantly verify its status on our platform.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input value={input} onChange={e => setInput(e.target.value)}
                placeholder="e.g. WBRERA/P/NOR/2025/003059 or Srijan Spacia"
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm placeholder:text-foreground/20 outline-none focus:border-gold/40 transition-colors" />
              <button type="submit" disabled={loading}
                className="btn-gold flex items-center gap-2 whitespace-nowrap">
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-navy-deep/30 border-t-navy-deep rounded-full" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                Verify Now
              </button>
            </div>

            {/* Results */}
            <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} className="mt-8">
                  {result === "found" && foundProp ? (
                    <div className="rounded-2xl bg-green-500/5 border border-green-500/20 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-sm font-medium text-green-400">Verified on PropDisha</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/30 mb-1">Project</p>
                          <p className="font-medium">{foundProp.name}</p>
                        </div>
                        <div>
                          <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/30 mb-1">
                            {foundProp.developers ? "Developers" : "Developer"}
                          </p>
                          <p className="font-medium">
                            {foundProp.developers ? foundProp.developers.map(d => d.trim()).join(" & ") : foundProp.developer}
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/30 mb-1">RERA No.</p>
                          <p className="font-mono text-xs text-gold">
                            {typeof foundProp.rera === 'string' 
                              ? foundProp.rera 
                              : "Multiple Phased RERA"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/30 mb-1">Status</p>
                          <p className="font-medium text-green-400">{foundProp.status}</p>
                        </div>
                        <div>
                          <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/30 mb-1">Location</p>
                          <p className="text-foreground/60">{foundProp.location}</p>
                        </div>
                        <div>
                          <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/30 mb-1">Possession</p>
                          <p className="text-foreground/60">{foundProp.possession}</p>
                        </div>
                      </div>
                      <div className="mt-6 flex gap-3">
                        <Link to={`/properties/${foundProp.slug}`} className="btn-gold !px-6 !py-2.5 text-xs flex items-center gap-2">
                          View Property <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <a href="https://www.wbrera.in" target="_blank" rel="noopener noreferrer"
                          className="btn-glass !px-6 !py-2.5 text-xs flex items-center gap-2">
                          Check RERA Portal <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <XCircle className="w-5 h-5 text-red-400" />
                        <span className="text-sm font-medium text-red-400">Not found on PropDisha</span>
                      </div>
                      <p className="text-sm text-foreground/40 font-light mb-4">
                        This project or RERA number wasn't found in our verified database. It may not be a PropDisha-listed property, or the RERA number may be incorrect.
                      </p>
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                        <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-foreground/40 leading-relaxed">
                          If you're unsure about a property's legitimacy, always verify directly on the <a href="https://www.wbrera.in" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">RERA portal</a> and consult a qualified legal advisor before investing.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          {/* How it works */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-8 glass rounded-[2rem] p-8">
            <h3 className="font-display text-xl mb-6">PropDisha's 12-Point Verification</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "State RERA registration confirmed",
                "Developer background verification",
                "Physical site inspection by our team",
                "Legal title chain verification",
                "Builder payment schedule audit",
                "Approvals & NOC checklist",
                "Pricing benchmark analysis",
                "Infrastructure connectivity audit",
                "Investment yield modeling",
                "Sales velocity check",
                "Construction quality assessment",
                "Post-possession maintenance review",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-gold/60 shrink-0" />
                  <span className="text-sm text-foreground/50 font-light">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Verified properties preview */}
      <section className="py-24 border-t border-white/5">
        <div className="container-luxe">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <div className="text-gold text-[10px] tracking-[0.6em] uppercase mb-4">All Verified</div>
            <h2 className="font-display text-5xl">Our Certified Portfolio</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {["10", "32", "51"]
              .map(id => properties.find(p => p.id === id))
              .filter((p): p is typeof properties[number] => !!p)
              .map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="glass rounded-[2rem] p-6 flex items-start gap-4 hover:border-gold/20 transition-all duration-500">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display text-lg mb-1">{p.name}</h3>
                    <p className="text-xs text-foreground/30 mb-2">
                      {p.developers ? p.developers.map(d => d.trim()).join(" & ") : p.developer} · {p.city}
                    </p>
                    <p className="font-mono text-[10px] text-gold/60">
                      {typeof p.rera === 'string' ? p.rera : "Phased Development"}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
          <div className="text-center">
            <Link to="/properties" className="btn-gold">View All Verified Properties</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Verify;
