import { motion } from "framer-motion";
import { Shield, CheckCircle, Lock, Eye, FileText, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const sections = [
  {
    id: "information-collected", title: "1. Information We Collect",
    content: `We collect only information necessary to serve you:\n\n• **Contact details** (name, phone, email) when you submit a lead or register\n• **Search and preference data** to personalize your property discovery experience\n• **Device and usage data** (browser type, pages visited) for analytics\n• **WhatsApp/call logs** when you connect with our advisors\n\nWe do not collect payment card details — all transactions are processed via certified third-party gateways.`,
  },
  {
    id: "how-we-use", title: "2. How We Use Your Information",
    content: `Your information is used exclusively to:\n\n• Match you with properties that fit your preferences\n• Connect you with the right PropDisha advisor\n• Send you relevant market insights and updates (with opt-out)\n• Improve our platform and personalize your experience\n• Comply with legal and regulatory obligations\n\nWe do not sell, rent, or trade your personal information with any third party for their marketing purposes.`,
  },
  {
    id: "data-sharing", title: "3. Data Sharing",
    content: `We share your data only in limited circumstances:\n\n• **With developers** — only with your explicit consent and only relevant project information\n• **With service providers** — analytics, hosting, and communication partners bound by strict data protection agreements\n• **Legal requirements** — when required by law or to protect rights and safety\n\nAll third parties are contractually obligated to protect your information and use it only for specified purposes.`,
  },
  {
    id: "data-security", title: "4. Data Security",
    content: `We implement industry-standard security measures:\n\n• SSL/TLS encryption for all data transmission\n• Encrypted storage for sensitive personal data\n• Regular security audits and penetration testing\n• Role-based access controls for our team\n• Incident response protocols\n\nNo system is 100% secure — we encourage you to use strong, unique passwords and contact us immediately if you suspect any unauthorized access.`,
  },
  {
    id: "your-rights", title: "5. Your Rights",
    content: `You have the right to:\n\n• **Access** — Request a copy of the personal data we hold about you\n• **Correction** — Request correction of inaccurate data\n• **Deletion** — Request deletion of your data (subject to legal retention requirements)\n• **Portability** — Request your data in a machine-readable format\n• **Opt-out** — Unsubscribe from marketing communications at any time\n\nTo exercise any of these rights, contact us at privacy@propdisha.com.`,
  },
  {
    id: "cookies", title: "6. Cookies",
    content: `We use cookies to:\n\n• Keep you logged in and remember your preferences\n• Understand how visitors use our platform (Google Analytics)\n• Deliver relevant content and targeted advertising\n\nYou can control cookies through your browser settings. Disabling cookies may affect some features of the platform.`,
  },
  {
    id: "changes", title: "7. Changes to This Policy",
    content: `We may update this Privacy Policy periodically. We will notify registered users of significant changes via email and update the "Last Updated" date at the top of this page. Continued use of the platform constitutes acceptance of the updated policy.`,
  },
];

const Privacy = () => {
  useSEO({
    title: "Privacy Policy | PropDisha",
    description: "Learn how PropDisha Private Limited collects, uses, and safeguards your personal data, WhatsApp communications, and preferences in absolute compliance with DPDP act regulations.",
    keywords: "privacy policy propdisha, data privacy real estate, DPDP act compliance, secure real estate"
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

    {/* Hero */}
    <section className="relative pt-44 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-navy-deep -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/4 blur-[180px] rounded-full" />
      </div>
      <div className="container-luxe max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-gold text-[10px] tracking-[0.6em] uppercase mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-gold/50" />Legal
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="font-display text-6xl md:text-7xl leading-[0.95] mb-8">
          Privacy<br /><span className="italic font-normal text-gradient-gold">Policy.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-foreground/40 font-light leading-relaxed mb-4">
          Last updated: April 30, 2025 · Effective: May 1, 2025
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-foreground/40 font-light leading-relaxed max-w-xl">
          At PropDisha, we believe privacy is not a feature — it's a foundation. This policy explains how we handle your data with the care it deserves.
        </motion.p>
      </div>
    </section>

    {/* Trust badges */}
    <section className="py-12 border-y border-white/5">
      <div className="container-luxe">
        <div className="flex flex-wrap gap-8 justify-center">
          {[
            { icon: Shield, label: "GDPR Aligned" },
            { icon: Lock, label: "SSL Encrypted" },
            { icon: Eye, label: "Zero Data Sale" },
            { icon: FileText, label: "DPDP Act Compliant" },
          ].map(b => (
            <div key={b.label} className="flex items-center gap-3 text-foreground/40">
              <b.icon className="w-4 h-4 text-gold" />
              <span className="text-[10px] tracking-[0.3em] uppercase font-bold">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Content */}
    <section className="py-20">
      <div className="container-luxe max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Sidebar TOC */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 glass rounded-2xl p-6">
              <p className="text-[9px] tracking-[0.4em] uppercase text-foreground/30 font-bold mb-4">Contents</p>
              <ul className="space-y-2">
                {sections.map(s => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}
                      className="text-xs text-foreground/40 hover:text-gold transition-colors leading-relaxed block py-0.5">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-16">
            {sections.map((s, i) => (
              <motion.div key={s.id} id={s.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <h2 className="font-display text-2xl mb-6 pb-4 border-b border-white/5">{s.title}</h2>
                <div className="space-y-3">
                  {s.content.split("\n").map((line, li) => {
                    if (!line.trim()) return null;
                    if (line.startsWith("•")) {
                      return (
                        <div key={li} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-gold/50 shrink-0 mt-0.5" />
                          <p className="text-foreground/50 font-light text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: line.slice(1).trim().replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground/80 font-medium'>$1</strong>") }} />
                        </div>
                      );
                    }
                    return <p key={li} className="text-foreground/50 font-light text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground/80 font-medium'>$1</strong>") }} />;
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Contact CTA */}
    <section className="py-24 border-t border-white/5">
      <div className="container-luxe max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass-strong rounded-[3rem] p-16">
          <h2 className="font-display text-4xl mb-4">Questions About Your Privacy?</h2>
          <p className="text-foreground/40 font-light mb-10">Our privacy team responds within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:privacy@propdisha.com" className="btn-gold flex items-center gap-2">
              Email Privacy Team <ArrowRight className="w-4 h-4" />
            </a>
            <Link to="/contact" className="btn-glass">Contact Us</Link>
          </div>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);
}

export default Privacy;
