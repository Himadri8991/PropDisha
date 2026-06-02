import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { submitLead } from "@/lib/mock-api";
import { toast } from "sonner";
import { useSEO } from "@/hooks/useSEO";

const offices = [
  { city: "Kolkata", address: "DLF IT Park, AF-1, Sec V, Salt Lake, Kolkata 700091", phone: "+91 93315 11222", email: "kolkata@propdisha.com" },
  { city: "Howrah", address: "Solaris Shalimar Junction, Shalimar, Howrah 711103", phone: "+91 93315 11222", email: "howrah@propdisha.com" },
];

const faqs = [
  { q: "Do you charge brokerage?", a: "Zero brokerage. PropDisha earns from developers, never from buyers. Your savings are our success." },
  { q: "Are all properties RERA-verified?", a: "Absolutely. Every listing undergoes our 12-point RERA and legal verification before appearing on our platform." },
  { q: "Can I schedule a site visit?", a: "Yes — your personal advisor will arrange a private, curated site visit at a time that suits you." },
  { q: "Do you operate outside Kolkata and Howrah?", a: "Currently we are hyper-focused on these two markets. Expansion to other regions of West Bengal is planned for late 2026." },
];

const Contact = () => {
  useSEO({
    title: "Contact Our Private Residence Advisors | PropDisha",
    description: "Get in touch with PropDisha's certified property advisors. Submit an inquiry for buying, investing, commercial, or private consultations in Kolkata and Howrah.",
    keywords: "contact propdisha, property advisors kolkata, luxury real estate consultant kolkata, real estate advice howrah"
  });
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", type: "Buy" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) {
      toast.error("Name, email, and phone number are required.");
      return;
    }
    
    try {
      // 1. Post to Express Backend for Nodemailer Dual-Side Emails
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          type: form.type,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to dispatch email notification.");
      }

      // 2. Submit to existing local mock CRM database
      await submitLead({
        customerName: form.name,
        mobile: form.phone,
        email: form.email,
        requirement: form.type,
        budget: "Not Specified",
        buyingTimeline: "Immediate",
        source: "Direct Website Lead",
        city: "Kolkata", // Defaulting for simple demo
        notes: form.message,
      });

      setSubmitted(true);
      toast.success("Your message has been sent successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit enquiry.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-navy-deep -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[180px] rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>
        <div className="container-luxe">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-gold text-[10px] tracking-[0.6em] uppercase mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-gold/50" />Get in Touch
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-8xl leading-[0.95] mb-8">
            Let's find your<br /><span className="italic font-normal text-gradient-gold">perfect address.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-lg text-foreground/40 max-w-lg font-light leading-relaxed">
            Our advisors are real people, not chatbots. Connect with us and get a response within 2 hours.
          </motion.p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20">
        <div className="container-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="glass-strong rounded-[3rem] p-10 md:p-14">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gold/10 grid place-items-center animate-border-glow">
                      <CheckCircle className="w-12 h-12 text-gold" />
                    </div>
                    <h3 className="font-display text-4xl">Message Received.</h3>
                    <p className="text-foreground/40 font-light max-w-xs leading-relaxed">
                      Your advisor will reach out within 2 hours. Expect a WhatsApp message from us.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn-glass mt-4">Send Another</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <h2 className="font-display text-3xl mb-2">Send a Message</h2>
                      <p className="text-sm text-foreground/30 font-light">We respond to every inquiry personally.</p>
                    </div>

                    {/* Inquiry type */}
                    <div>
                      <p className="text-[9px] tracking-[0.4em] uppercase text-foreground/40 font-bold mb-3">I'm looking to</p>
                      <div className="flex flex-wrap gap-2">
                        {["Buy", "Invest", "Commercial", "Advisory"].map(t => (
                          <button type="button" key={t} onClick={() => setForm({ ...form, type: t })}
                            className={`px-4 py-2 rounded-full text-[10px] tracking-widest uppercase font-bold border transition-all duration-300 ${form.type === t ? "bg-gold text-navy-deep border-gold" : "border-white/10 text-foreground/40 hover:border-gold/30"}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { label: "Full Name", key: "name", type: "text", placeholder: "Your name" },
                        { label: "Email", key: "email", type: "email", placeholder: "your@email.com" },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="text-[9px] tracking-[0.4em] uppercase text-foreground/40 font-bold block mb-2">{f.label}</label>
                          <input required type={f.type} placeholder={f.placeholder}
                            value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-foreground/20 outline-none focus:border-gold/40 transition-colors" />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="text-[9px] tracking-[0.4em] uppercase text-foreground/40 font-bold block mb-2">Phone (WhatsApp)</label>
                      <input type="tel" placeholder="+91 98765 43210" value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-foreground/20 outline-none focus:border-gold/40 transition-colors" />
                    </div>

                    <div>
                      <label className="text-[9px] tracking-[0.4em] uppercase text-foreground/40 font-bold block mb-2">Message</label>
                      <textarea rows={4} placeholder="Tell us what you're looking for…" value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-foreground/20 outline-none focus:border-gold/40 transition-colors resize-none" />
                    </div>

                    <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />Send Message
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex flex-col gap-10">

              {/* Quick Links */}
              <div className="glass rounded-[2rem] p-8">
                <h3 className="font-display text-2xl mb-6">Instant Connect</h3>
                <div className="space-y-4">
                  <a href="https://wa.me/919331511222?text=Hello PropDisha, I need expert advice."
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-green-500/5 border border-green-500/20 hover:border-green-500/40 transition-all group">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-sm font-medium group-hover:text-green-400 transition-colors">WhatsApp Us</p>
                      <p className="text-[10px] text-foreground/30">+91 93315 11222 · Typically replies in &lt;15 min</p>
                    </div>
                  </a>
                  <a href="tel:+919331511222"
                    className="flex items-center gap-4 p-4 rounded-xl glass border border-white/5 hover:border-gold/30 transition-all group">
                    <Phone className="w-5 h-5 text-gold" />
                    <div>
                      <p className="text-sm font-medium group-hover:text-gold transition-colors">Call Us Directly</p>
                      <p className="text-[10px] text-foreground/30">Mon–Sat · 9 AM – 8 PM</p>
                    </div>
                  </a>
                  <a href="mailto:inquiry@propdisha.com"
                    className="flex items-center gap-4 p-4 rounded-xl glass border border-white/5 hover:border-gold/30 transition-all group">
                    <Mail className="w-5 h-5 text-gold" />
                    <div>
                      <p className="text-sm font-medium group-hover:text-gold transition-colors">Email Concierge</p>
                      <p className="text-[10px] text-foreground/30">inquiry@propdisha.com · &lt;2 hour response</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Office Locations */}
              <div className="glass rounded-[2rem] p-8">
                <h3 className="font-display text-2xl mb-6">Our Offices</h3>
                <div className="space-y-6">
                  {offices.map(o => (
                    <div key={o.city} className="border-b border-white/5 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-gold" />
                        <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-bold">{o.city}</span>
                      </div>
                      <p className="text-sm text-foreground/50 font-light leading-relaxed mb-2">{o.address}</p>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-foreground/30">{o.phone}</span>
                        <span className="text-xs text-foreground/30">{o.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="glass rounded-[2rem] p-8 flex items-start gap-4">
                <Clock className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium mb-1">Office Hours</p>
                  <p className="text-sm text-foreground/40 font-light">Mon – Fri: 9:00 AM – 8:00 PM</p>
                  <p className="text-sm text-foreground/40 font-light">Saturday: 10:00 AM – 6:00 PM</p>
                  <p className="text-xs text-foreground/20 mt-2">WhatsApp support available 24×7</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-white/5">
        <div className="container-luxe max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="text-gold text-[10px] tracking-[0.6em] uppercase mb-4">Quick Answers</div>
            <h2 className="font-display text-4xl">Frequently Asked</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-white/3 transition-colors">
                  <span className="text-sm font-medium">{faq.q}</span>
                  <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.3 }}
                    className="text-gold text-xl shrink-0 ml-4">+</motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                      className="px-8 pb-6">
                      <p className="text-sm text-foreground/40 font-light leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
