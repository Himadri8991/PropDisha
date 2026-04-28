import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { properties } from "@/data/properties";

const FeaturedProjects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScrollability);
    checkScrollability();
    return () => el.removeEventListener("scroll", checkScrollability);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  // Showcase top 4 from real data
  const showcase = properties.slice(0, 4);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Section Header */}
      <div className="container-luxe mb-16">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold text-[10px] tracking-[0.5em] uppercase mb-5 font-semibold"
            >
              Curated Selection
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-display leading-tight"
            >
              Signature <span className="italic font-normal text-gradient-gold">Residences</span>
            </motion.h2>
          </div>

          {/* Arrow Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous"
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-400 ${
                canScrollLeft
                  ? "border-gold text-gold hover:bg-gold hover:text-navy-deep"
                  : "border-white/10 text-white/20 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next"
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-400 ${
                canScrollRight
                  ? "border-white/20 text-white/60 hover:border-gold hover:text-gold"
                  : "border-white/10 text-white/20 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <Link
              to="/properties"
              className="hidden md:flex items-center gap-2 ml-4 text-[10px] tracking-[0.3em] uppercase text-gold hover:gap-4 transition-all duration-500 font-semibold"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pl-6 md:pl-12 lg:pl-24 pr-6 pb-8 no-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {showcase.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px -100px 0px 0px" }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            style={{ scrollSnapAlign: "start" }}
            className="relative flex-none w-[80vw] md:w-[42vw] lg:w-[32vw] group"
          >
            <Link
              to={`/properties/${project.slug}`}
              className="block card-premium aspect-[3/4] relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {/* Image */}
              <img
                src={project.cover}
                alt={project.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
              />

              {/* Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-700" />

              {/* Gold border glow on hover */}
              <div className="absolute inset-0 rounded-[2rem] border border-transparent group-hover:border-gold/30 transition-colors duration-700 pointer-events-none" />

              {/* Tag Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full glass">
                <Sparkles className="w-3 h-3 text-gold" />
                <span className="text-[9px] tracking-[0.25em] uppercase font-semibold text-white/80">
                  {project.tag || project.status}
                </span>
              </div>

              {/* City badge */}
              <div className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full glass text-[9px] tracking-[0.2em] uppercase text-white/50 font-medium">
                {project.city}
              </div>

              {/* Bottom Content */}
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col gap-3">
                <h3 className="text-3xl md:text-4xl font-display leading-tight group-hover:text-gold transition-colors duration-500">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 text-foreground/50 text-xs font-light tracking-wide">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  {project.location}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-1">
                  <span className="text-base font-semibold text-gradient-gold">{project.priceLabel}</span>
                  <span className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-bold text-white opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    Explore <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* View All End Card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ scrollSnapAlign: "start" }}
          className="flex-none w-[50vw] md:w-[22vw] flex items-center justify-center pr-6"
        >
          <Link to="/properties" className="group flex flex-col items-center gap-5">
            <div className="w-20 h-20 rounded-full border-2 border-white/10 grid place-items-center group-hover:border-gold group-hover:bg-gold transition-all duration-700">
              <ArrowRight className="w-7 h-7 group-hover:text-navy-deep transition-colors" />
            </div>
            <span className="text-[9px] tracking-[0.4em] uppercase text-foreground/30 group-hover:text-gold transition-colors text-center">
              View All<br />Collections
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll progress dots */}
      <div className="flex justify-center gap-2 mt-4">
        {[...Array(4)].map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!scrollRef.current) return;
              const cardW = scrollRef.current.scrollWidth / 4;
              scrollRef.current.scrollTo({ left: cardW * i, behavior: "smooth" });
            }}
            className="w-6 h-1 rounded-full bg-white/10 hover:bg-gold/60 transition-colors"
          />
        ))}
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold/5 blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </section>
  );
};

export default FeaturedProjects;
