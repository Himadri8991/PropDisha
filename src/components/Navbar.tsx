import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, User } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Discover", to: "/" },
    { label: "Properties", to: "/properties" },
    { label: "Invest", to: "/#invest" },
    { label: "Insights", to: "/#insights" },
  ];

  const isHome = pathname === "/";

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 ${
          scrolled ? "py-4" : "py-8"
        }`}
      >
        <div className="container-luxe">
          <motion.div
            layout
            className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-700 ${
              scrolled || !isHome
                ? "glass-strong shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] border-white/5"
                : "bg-transparent border-transparent"
            }`}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-gold-soft via-gold to-gold-deep grid place-items-center shadow-[0_0_20px_-5px_hsl(var(--gold))]">
                <motion.span 
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="font-display text-navy-deep font-bold text-lg"
                >
                  P
                </motion.span>
                <div className="absolute inset-0 rounded-full bg-gold/20 animate-ping" />
              </div>
              <span className="font-display text-2xl tracking-tighter hidden sm:block">
                Prop<span className="text-gradient-gold">Disha</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-10">
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="text-xs tracking-[0.2em] uppercase text-foreground/70 hover:text-gold transition-colors duration-500 relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-500" />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => toast.info("Sign in is coming soon.", {
                  description: "We are building a secure vault for your saved properties."
                })}
                className="hidden sm:flex items-center gap-2 text-xs tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                Sign In
              </button>
              <a 
                href="https://wa.me/918580000858?text=Hello PropDisha, I need expert advice on luxury properties."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 btn-gold !px-6 !py-2.5 text-xs tracking-widest uppercase"
              >
                <Phone className="w-3.5 h-3.5" />
                Talk to Expert
              </a>
              
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-foreground/70 hover:text-gold transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] glass-strong flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((l, i) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={l.label}
              >
                <Link
                  to={l.to}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-4xl hover:text-gold transition-colors"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="btn-gold mt-4"
            >
              Contact Us
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
