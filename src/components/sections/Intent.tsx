import { Home, TrendingUp, Building2, Sparkles, ArrowUpRight } from "lucide-react";

const intents = [
  { icon: Home, title: "Buy Your Home", line: "Own more than just a house.", note: "Curated residences" },
  { icon: TrendingUp, title: "Invest Smart", line: "Make money while you sleep.", note: "12–18% projected ROI" },
  { icon: Building2, title: "Commercial", line: "Where business grows.", note: "Office · Retail · Land" },
  { icon: Sparkles, title: "Luxury Living", line: "Live beyond ordinary.", note: "Aman-grade residences" },
];

const Intent = () => {
  return (
    <section id="discover" className="relative py-24 md:py-36 bg-navy-deep">
      <div className="container-luxe">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-gold mb-4">
            Discover by intent
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            Tell us what you want. <br />
            <span className="italic text-gradient-gold">We'll do the rest.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {intents.map((it, i) => {
            const Icon = it.icon;
            return (
              <button
                key={it.title}
                className="group relative p-7 md:p-8 rounded-3xl glass text-left overflow-hidden transition-all duration-700 hover:-translate-y-2"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "radial-gradient(circle at 50% 0%, hsl(var(--gold)/0.18), transparent 70%)" }} />
                <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, hsl(var(--gold)/0.4), transparent 50%)", padding: 1, mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", maskComposite: "exclude" as any, WebkitMaskComposite: "xor" as any }} />

                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl glass-strong grid place-items-center mb-8 group-hover:scale-110 transition-transform duration-700">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>

                  <h3 className="font-display text-2xl mb-2">{it.title}</h3>
                  <p className="text-base text-foreground/80 mb-6">{it.line}</p>

                  <div className="flex items-center justify-between pt-5 border-t border-foreground/10">
                    <span className="text-xs text-foreground/50">{it.note}</span>
                    <ArrowUpRight className="w-4 h-4 text-foreground/50 group-hover:text-gold group-hover:rotate-45 transition-all duration-500" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Intent;
