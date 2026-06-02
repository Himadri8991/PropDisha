import { motion } from "framer-motion";
import { Shield, Award, Users, TrendingUp, MapPin, CheckCircle, Star, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const stats = [
  { value: "₹2,400 Cr+", label: "Properties Curated", icon: TrendingUp },
  { value: "1,200+", label: "Families Guided", icon: Users },
  { value: "98%", label: "Client Satisfaction", icon: Star },
  { value: "WBRERA", label: "RA/HOW/2025/000143", icon: Shield },
];

const values = [
  { title: "Radical Transparency", desc: "Every listing is RERA-verified, every price is honest, every claim is backed by documentation. No surprises. Ever.", icon: Shield },
  { title: "Time is Sacred", desc: "We know your time is your most valuable asset. We curate so you never scroll through 2,000 irrelevant properties.", icon: Award },
  { title: "Advisor, Not Broker", desc: "We make money when you make the right decision — not just any decision. Our interests are aligned with yours.", icon: Users },
];

const timeline = [
  { year: "2019", title: "Founded in Kolkata", desc: "PropDisha begins its journey to eliminate chaos from real estate discovery." },
  { year: "2021", title: "RERA Verification System", desc: "Launched India's first luxury property verification dashboard — zero brokerage, zero surprises." },
  { year: "2022", title: "Howrah Curation", desc: "Expanded our curated platform to the twin city, bringing premium RERA-verified options along the riverfront." },
  { year: "2023", title: "AI-Powered Discovery", desc: "Integrated intent-based search so buyers find their true match — not just any match." },
  { year: "2025", title: "The Concierge Era", desc: "Launched 24×7 white-glove concierge for premium buyers and investors across India." },
];

const team = [
  { name: "Sudip Kundu", role: "Founder & CEO", city: "Kolkata", quote: "Real estate should feel like art, not arithmetic." },
  { name: "Priya Sharma", role: "Head of Curation", city: "Kolkata", quote: "Every property we list is one we'd buy ourselves." },
  { name: "Rohit Das", role: "Chief Trust Officer", city: "Kolkata", quote: "Verification is not a checkbox. It's a promise." },
  { name: "Ananya Bose", role: "Investor Relations", city: "Howrah", quote: "The right investment doesn't feel like gambling. It feels like clarity." },
];

const About = () => {
  useSEO({
    title: "About PropDisha | The Antidote to Property Portals",
    description: "Learn how PropDisha is redefining real estate discovery in Kolkata and Howrah through zero-commission, 100% RERA-verified luxury property curations and time-saving advisory services.",
    keywords: "about propdisha, real estate agency kolkata, zero commission real estate, rera verified real estate agency"
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-navy-deep -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[200px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      </div>
      <div className="container-luxe py-44">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-gold text-[10px] tracking-[0.6em] uppercase mb-10 flex items-center gap-3">
          <div className="h-px w-8 bg-gold/50" />Our Story
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="font-display text-6xl md:text-[7rem] leading-[0.9] mb-10 max-w-4xl">
          We didn't build<br /><span className="italic font-normal text-gradient-gold">a property portal.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-xl text-foreground/40 max-w-xl font-light leading-relaxed mb-14">
          We built the antidote to one. PropDisha was born from frustration with cluttered listings, hidden fees, and broken trust.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex gap-5 flex-wrap">
          <Link to="/properties" className="btn-gold flex items-center gap-2">Explore Properties <ArrowRight className="w-4 h-4" /></Link>
          <a href="https://wa.me/919331511222" target="_blank" rel="noopener noreferrer" className="btn-glass">Talk to Us</a>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-24 border-y border-white/5">
      <div className="container-luxe">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <s.icon className="w-6 h-6 text-gold/60 mx-auto mb-4" />
              <div className="font-display text-4xl text-gradient-gold mb-2">{s.value}</div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/30">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="py-40">
      <div className="container-luxe text-center max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-gold text-[10px] tracking-[0.6em] uppercase mb-8">The Mission</motion.div>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.1 }} className="font-display text-5xl md:text-7xl leading-[1.05] mb-12">
          To make finding your<br /><span className="italic font-normal text-gradient-gold">perfect address</span><br />feel inevitable.
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="text-lg text-foreground/40 font-light leading-relaxed max-w-2xl mx-auto">
          PropDisha curates only 1% of properties in any given market. Every listing has been physically visited, legally verified, and editorially approved.
        </motion.p>
      </div>
    </section>

    {/* Values */}
    <section className="py-24 border-t border-white/5">
      <div className="container-luxe">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <div className="text-gold text-[10px] tracking-[0.6em] uppercase mb-4">What We Stand For</div>
          <h2 className="font-display text-5xl">Our Core Values</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="glass-strong rounded-[2.5rem] p-10 group hover:border-gold/20 transition-all duration-700 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 grid place-items-center mb-8 group-hover:bg-gold/15 transition-colors">
                <v.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-display text-2xl mb-4 group-hover:text-gold transition-colors">{v.title}</h3>
              <p className="text-foreground/40 font-light leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-32">
      <div className="container-luxe">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <div className="text-gold text-[10px] tracking-[0.6em] uppercase mb-4">Our Journey</div>
          <h2 className="font-display text-5xl">The PropDisha Story</h2>
        </motion.div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px hairline-v" />
          {timeline.map((t, i) => (
            <motion.div key={t.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative flex gap-8 mb-14 pl-20">
              <div className="absolute left-0 top-1 w-16 h-16 rounded-full glass-gold grid place-items-center border border-gold/20 z-10">
                <span className="text-gold font-display text-sm">{t.year}</span>
              </div>
              <div className="flex-1 glass rounded-2xl p-6 hover:border-gold/20 transition-all duration-500">
                <h3 className="font-display text-xl mb-2">{t.title}</h3>
                <p className="text-sm text-foreground/40 font-light leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-24 border-t border-white/5">
      <div className="container-luxe">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <div className="text-gold text-[10px] tracking-[0.6em] uppercase mb-4">The People</div>
          <h2 className="font-display text-5xl">Who Guides You</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass rounded-[2rem] p-8 text-center group hover:border-gold/20 transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 mx-auto mb-6 grid place-items-center border border-gold/15">
                <span className="font-display text-2xl text-gold">{m.name[0]}</span>
              </div>
              <h3 className="font-display text-xl mb-1 group-hover:text-gold transition-colors">{m.name}</h3>
              <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-2">{m.role}</p>
              <div className="flex items-center justify-center gap-1.5 text-foreground/20 text-xs mb-6">
                <MapPin className="w-3 h-3" />{m.city}
              </div>
              <p className="text-sm text-foreground/40 font-light italic">"{m.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Trust CTA */}
    <section className="py-24 border-t border-white/5">
      <div className="container-luxe">
        <div className="glass-strong rounded-[3rem] p-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-gold text-[10px] tracking-[0.6em] uppercase mb-6">Our Commitments</div>
            <h2 className="font-display text-4xl md:text-5xl mb-12">Why India's smartest<br />buyers trust PropDisha</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              {["100% RERA-verified listings","Zero hidden brokerage fees","24×7 concierge support","Physical site visits for every listing","Legal document review included","Post-purchase support for 12 months"].map(item => (
                <div key={item} className="flex items-center gap-3 text-left">
                  <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                  <span className="text-foreground/60 text-sm font-light">{item}</span>
                </div>
              ))}
            </div>
            <Link to="/properties" className="btn-gold">See Verified Properties</Link>
          </motion.div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);
}

export default About;
