import { ShieldCheck, Ban, BrainCircuit, TrendingUp } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Verified Premium Listings", text: "Every property hand-vetted by our team. Zero misleading photos." },
  { icon: Ban, title: "No Spam. No Brokers.", text: "Direct from developers. No surprise calls. No middlemen." },
  { icon: BrainCircuit, title: "AI-Powered Matches", text: "Describe your dream in plain words. We find it instantly." },
  { icon: TrendingUp, title: "High-ROI Projects", text: "Backed by data. Selected for appreciation potential." },
];

const Why = () => {
  return (
    <section className="relative py-24 md:py-36">
      <div className="container-luxe">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-gold mb-4">
              Why PropDisha
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
              The opposite of <br />
              <span className="italic text-gradient-gold">a property portal.</span>
            </h2>
            <p className="text-base md:text-lg text-foreground/65 max-w-md">
              We removed the noise so you can hear yourself think.
              No flashing banners. No junk leads. Just calm, considered discovery.
            </p>
          </div>

          <div className="space-y-px bg-foreground/5 rounded-2xl overflow-hidden">
            {items.map((it) => {
              const Icon = it.icon;
              return (
                <div
                  key={it.title}
                  className="group bg-navy p-7 md:p-9 flex gap-6 hover:bg-navy-soft transition-colors duration-500"
                >
                  <div className="shrink-0 w-12 h-12 rounded-full glass grid place-items-center group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl mb-2">{it.title}</h3>
                    <p className="text-sm md:text-base text-foreground/60">{it.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why;
