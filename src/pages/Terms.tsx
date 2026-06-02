import { motion } from "framer-motion";
import { FileText, CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const sections = [
  {
    id: "acceptance", title: "1. Acceptance of Terms",
    content: "By accessing or using PropDisha.com, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
  },
  {
    id: "services", title: "2. Description of Services",
    content: "PropDisha provides a curated real estate discovery platform that connects prospective buyers and investors with verified residential and commercial properties. Our services include property listings, advisory consultations, market intelligence, and related concierge services. We act as an intermediary and do not directly sell, purchase, or hold title to any property.",
  },
  {
    id: "rera-compliance", title: "3. RERA Compliance & Verification",
    content: "All properties listed on PropDisha are required to have valid RERA registration. However, PropDisha does not guarantee the accuracy of RERA certificates or government records. Buyers are advised to independently verify all RERA details from the respective state authority websites. PropDisha's RERA verification is an additional layer of due diligence, not a substitute for legal counsel.",
  },
  {
    id: "user-obligations", title: "4. User Obligations",
    content: "You agree to: (a) provide accurate and complete information when submitting inquiries or registrations; (b) not use the platform for any unlawful purpose; (c) not reproduce, distribute, or create derivative works from our content without written permission; (d) not interfere with or disrupt the platform or servers.",
  },
  {
    id: "disclaimer", title: "5. Disclaimer of Warranties",
    content: "PropDisha provides its services 'as is' without any warranty of any kind. We do not warrant that: (a) the platform will be error-free or continuously available; (b) property information is always current or accurate; (c) any advisory service constitutes legal or financial advice. Always consult qualified legal and financial professionals before making property investment decisions.",
  },
  {
    id: "limitation", title: "6. Limitation of Liability",
    content: "In no event shall PropDisha, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or goodwill, arising from your use of the platform or reliance on any information provided. Our total liability in any matter shall not exceed ₹10,000.",
  },
  {
    id: "intellectual-property", title: "7. Intellectual Property",
    content: "All content on this platform — including but not limited to text, graphics, logos, photography, and software — is the property of PropDisha Private Limited and is protected by applicable intellectual property laws. Unauthorized use is strictly prohibited.",
  },
  {
    id: "governing-law", title: "8. Governing Law",
    content: "These Terms shall be governed by the laws of India. Any disputes arising from the use of PropDisha shall be subject to the exclusive jurisdiction of the courts in Kolkata, West Bengal.",
  },
  {
    id: "changes", title: "9. Changes to Terms",
    content: "PropDisha reserves the right to modify these terms at any time. Changes will be posted on this page with an updated effective date. Continued use of the platform after changes constitutes acceptance of the new terms.",
  },
];

const Terms = () => {
  useSEO({
    title: "Terms of Service | PropDisha",
    description: "Read the Terms of Service for PropDisha.com. Understand legal terms, user obligations, disclaimer of warranties, and RERA compliance information.",
    keywords: "terms of service propdisha, real estate terms, legal terms kolkata, property site rules"
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
          Terms of<br /><span className="italic font-normal text-gradient-gold">Service.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-foreground/40 font-light mb-4">
          Last updated: April 30, 2025 · Effective: May 1, 2025
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-foreground/40 font-light leading-relaxed max-w-xl">
          Please read these terms carefully before using PropDisha. They govern your use of our platform and services.
        </motion.p>
      </div>
    </section>

    {/* Content */}
    <section className="py-20">
      <div className="container-luxe max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* TOC */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 glass rounded-2xl p-6">
              <p className="text-[9px] tracking-[0.4em] uppercase text-foreground/30 font-bold mb-4">Sections</p>
              <ul className="space-y-2">
                {sections.map(s => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-xs text-foreground/40 hover:text-gold transition-colors leading-relaxed block py-0.5">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-16">
            <div className="glass-strong rounded-2xl p-6 flex items-start gap-4 border border-gold/15">
              <FileText className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/60 font-light leading-relaxed">
                PropDisha Private Limited (CIN: U70102WB2019PTC234567) is registered under the Companies Act 2013 and operates as a real estate discovery and advisory platform.
              </p>
            </div>

            {sections.map(s => (
              <motion.div key={s.id} id={s.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <h2 className="font-display text-2xl mb-6 pb-4 border-b border-white/5">{s.title}</h2>
                <p className="text-foreground/50 font-light text-sm leading-relaxed">{s.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 border-t border-white/5">
      <div className="container-luxe max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass-strong rounded-[3rem] p-16">
          <h2 className="font-display text-4xl mb-4">Have Legal Questions?</h2>
          <p className="text-foreground/40 font-light mb-10">Our legal team is happy to clarify any aspect of our terms.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:legal@propdisha.com" className="btn-gold flex items-center gap-2">
              Email Legal Team <ArrowRight className="w-4 h-4" />
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

export default Terms;
