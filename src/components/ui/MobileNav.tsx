import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, User } from "lucide-react";
import { toast } from "sonner";

const MobileNav = () => {
  const { pathname } = useLocation();

  const items = [
    { icon: Home, label: "Home", to: "/" },
    { icon: Search, label: "Search", to: "/properties" },
    { icon: Heart, label: "Saved", to: "/saved" },
    { icon: User, label: "Profile", to: "/profile" },
  ];

  const handleClick = (to: string, e: React.MouseEvent) => {
    if (to === "/saved" || to === "/profile") {
      e.preventDefault();
      toast.info("Coming Soon", {
        description: `${to.slice(1).charAt(0).toUpperCase() + to.slice(2)} feature is being polished for the premium launch.`
      });
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] md:hidden px-6 pb-6 pointer-events-none">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-strong h-16 rounded-full flex items-center justify-around px-4 pointer-events-auto border-white/5 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
      >
        {items.map((item) => {
          const isActive = pathname === item.to;
          return (
            <Link
              key={item.label}
              to={item.to}
              onClick={(e) => handleClick(item.to, e)}
              className="relative flex flex-col items-center justify-center gap-1 group"
            >
              <item.icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-gold' : 'text-foreground/40 group-hover:text-foreground'}`} />
              <span className={`text-[8px] tracking-widest uppercase font-bold transition-colors duration-300 ${isActive ? 'text-gold' : 'text-foreground/20 group-hover:text-foreground'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobileNavIndicator"
                  className="absolute -top-1 w-1 h-1 rounded-full bg-gold shadow-[0_0_10px_hsl(var(--gold))]"
                />
              )}
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};

export default MobileNav;
