import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Facebook, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Discovery",
      links: [
        { label: "Signature Collection", to: "/properties" },
        { label: "New Launches", to: "/properties?intent=Buy" },
        { label: "Investment Hotspots", to: "/properties?intent=Invest" },
        { label: "Commercial Spaces", to: "/properties?intent=Commercial" },
      ],
    },
    {
      title: "PropDisha",
      links: [
        { label: "Our Story", to: "/about" },
        { label: "Verified Guarantee", to: "/verify" },
        { label: "Market Insights", to: "/insights" },
        { label: "Work With Us", to: "/contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Privacy Policy", to: "/privacy" },
        { label: "Terms of Service", to: "/terms" },
        { label: "Contact Us", to: "/contact" },
        { label: "Help Center", to: "/help" },
      ],
    },
  ];

  return (
    <footer className="bg-navy-deep pt-32 pb-12 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      <div className="container-luxe">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24">
          {/* Brand Info */}
          <div className="max-w-md">
            <Link to="/" className="flex items-center gap-2.5 mb-10 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-soft to-gold-deep grid place-items-center shadow-[0_0_20px_-5px_hsl(var(--gold))]">
                <span className="font-display text-navy-deep font-bold text-xl">P</span>
              </div>
              <span className="font-display text-3xl tracking-tighter">
                Prop<span className="text-gradient-gold">Disha</span>
              </span>
            </Link>
            <p className="text-foreground/40 leading-relaxed mb-10 font-light text-lg">
              Crafting a more thoughtful real estate discovery journey for India's most discerning homeowners and investors.
            </p>
            <div className="flex items-center gap-6">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: "hsl(var(--gold))" }}
                  className="text-foreground/30 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h4 className="text-[10px] tracking-[0.4em] uppercase text-gold font-bold mb-8">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 font-light"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-y border-white/5 mb-12">
          <div className="flex items-center gap-4 text-foreground/40">
            <MapPin className="w-5 h-5 text-gold/50" />
            <span className="text-xs tracking-widest uppercase">Kolkata • Howrah</span>
          </div>
          <a href="tel:+919331511222" className="flex items-center gap-4 text-foreground/40 hover:text-gold transition-colors">
            <Phone className="w-5 h-5 text-gold/50" />
            <span className="text-xs tracking-widest uppercase">+91 93315 11222</span>
          </a>
          <a href="mailto:inquiry@propdisha.com" className="flex items-center gap-4 text-foreground/40 hover:text-gold transition-colors">
            <Mail className="w-5 h-5 text-gold/50" />
            <span className="text-xs tracking-widest uppercase">inquiry@propdisha.com</span>
          </a>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/20">
            © {currentYear} PropDisha Private Limited. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
            <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/20">
              RERA Registered: WBRERA/RA/HOW/2025/000143
            </span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/40 animate-pulse" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/20">System Online</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <a
            href="https://iamhimadri.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[7.5px] text-white/30 hover:text-white relative transition-all duration-300 inline-block after:content-[''] after:block after:h-[1px] after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-[9px]"
          >
            Developed by Himadri
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
