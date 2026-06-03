import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, User, ChevronDown, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Discover", to: "/" },
  { label: "Properties", to: "/properties" },
  {
    label: "Company",
    children: [
      { label: "Our Story", to: "/about" },
      { label: "Insights", to: "/insights" },
      { label: "Verified Guarantee", to: "/verify" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); setDropdown(null); }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 ${scrolled ? "py-4" : "py-8"}`}>
        <div className="container-luxe">
          <motion.div layout
            className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-700 ${scrolled || !isHome
              ? "glass-strong shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] border-white/5"
              : "bg-transparent border-transparent"
            }`}>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-gold-soft via-gold to-gold-deep grid place-items-center shadow-[0_0_20px_-5px_hsl(var(--gold))]">
                <motion.span animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity }}
                  className="font-display text-navy-deep font-bold text-lg">P</motion.span>
                <div className="absolute inset-0 rounded-full bg-gold/20 animate-ping" />
              </div>
              <span className="font-display text-2xl tracking-tighter hidden sm:block">
                Prop<span className="text-gradient-gold">Disha</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map(l => l.children ? (
                <div key={l.label} className="relative"
                  onMouseEnter={() => setDropdown(l.label)}
                  onMouseLeave={() => setDropdown(null)}>
                  <button
                    className="text-xs tracking-[0.2em] uppercase text-foreground/70 hover:text-gold transition-colors duration-500 flex items-center gap-1.5 group relative">
                    {l.label}
                    <motion.div animate={{ rotate: dropdown === l.label ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="w-3 h-3" />
                    </motion.div>
                    <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-500" />
                  </button>

                  <AnimatePresence>
                    {dropdown === l.label && (
                      <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 glass-strong rounded-2xl overflow-hidden z-50 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.8)] border-white/5">
                        {l.children.map(child => (
                          <Link key={child.label} to={child.to}
                            className="block px-5 py-3.5 text-[10px] tracking-widest uppercase font-bold text-foreground/50 hover:text-gold hover:bg-white/5 transition-all">
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={l.label} to={l.to}
                  className={`text-xs tracking-[0.2em] uppercase transition-colors duration-500 relative group ${pathname === l.to ? "text-gold" : "text-foreground/70 hover:text-gold"}`}>
                  {l.label}
                  <span className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-500 ${pathname === l.to ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">

{/*               
              {isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-3">
                  <Link to="/dashboard" className="text-xs tracking-widest uppercase text-gold hover:text-gold-soft transition-colors flex items-center gap-2">
                    <User className="w-3.5 h-3.5" /> Portal
                  </Link>
                  <button onClick={() => logout()} className="text-xs tracking-widest uppercase text-foreground/50 hover:text-red-400 transition-colors">
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="hidden sm:flex items-center gap-2 text-xs tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors">
                  <User className="w-3.5 h-3.5" /> Sign In
                </Link>
              )} */}
              <a href="https://wa.me/919331511222?text=Hello PropDisha, I need expert advice on luxury properties."
                target="_blank" rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 btn-gold !px-6 !py-2.5 text-xs tracking-widest uppercase">
                <Phone className="w-3.5 h-3.5" />Talk to Expert
              </a>

              {/* Mobile Toggle */}
              <button onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-foreground/70 hover:text-gold transition-colors">
                <AnimatePresence mode="wait">
                  {isOpen
                    ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <X className="w-6 h-6" />
                    </motion.div>
                    : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  }
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] glass-strong flex flex-col items-center justify-center gap-6 md:hidden">
            {/* BG blur overlay */}
            <div className="absolute inset-0 bg-navy-deep/90 backdrop-blur-xl" onClick={() => setIsOpen(false)} />

            <div className="relative z-10 flex flex-col items-center gap-8 w-full px-8">
              {navLinks.map((l, i) => l.children ? (
                <div key={l.label} className="w-full text-center">
                  <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="text-[10px] tracking-[0.5em] uppercase text-gold/60 font-bold mb-3">{l.label}</motion.p>
                  <div className="flex flex-col gap-2">
                    {l.children.map((child, ci) => (
                      <motion.div key={child.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + ci * 0.05 }}>
                        <Link to={child.to} onClick={() => setIsOpen(false)}
                          className="font-display text-2xl hover:text-gold transition-colors block text-center">
                          {child.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div key={l.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}>
                  <Link to={l.to} onClick={() => setIsOpen(false)}
                    className="font-display text-4xl hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="flex flex-col gap-3 w-full max-w-xs mt-4">

{/* 
                {isAuthenticated ? (
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}
                    className="btn-gold w-full text-center flex items-center justify-center gap-2">
                    <User className="w-4 h-4" /> Portal
                  </Link>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)}
                    className="btn-glass w-full text-center flex items-center justify-center gap-2">
                    <User className="w-4 h-4" /> Sign In
                  </Link>
                )}
                 */}

                <a href="https://wa.me/919331511222" target="_blank" rel="noopener noreferrer"
                  className="btn-gold w-full text-center flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />Talk to Expert
                </a>
                <Link to="/contact" onClick={() => setIsOpen(false)}
                  className="btn-glass w-full text-center">
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
