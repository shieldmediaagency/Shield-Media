import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CONTENT } from '../content';

// Spotlight Card Component with Parallax Image
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  bgImage?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "", delay = 0, bgImage = "" }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // Parallax hook
  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.5 }}
      className={`relative flex-shrink-0 w-[85vw] md:w-auto md:flex-shrink-1 rounded-none border border-white/5 bg-zinc-950 overflow-hidden group hover:border-white/20 transition-colors duration-500 flex flex-col justify-between snap-center ${className}`}
      data-hover
    >
      {/* Background Image with Parallax */}
      {bgImage && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div style={{ y }} className="w-full h-[120%] -top-[10%] relative">
            <img
              src={bgImage}
              alt=""
              className="w-full h-full object-cover opacity-30 grayscale transition-all duration-700 group-hover:opacity-40 group-hover:grayscale-0 group-hover:scale-105"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/20" />
        </div>
      )}

      {/* Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-20"
        style={{
          opacity,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.08), transparent 40%)`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};

export const Expertise: React.FC = () => {
  return (
    <section id="expertise" className="py-24 md:py-32 bg-black px-6 md:px-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-zinc-500 mb-6 block">{CONTENT.expertise.subtitle}</span>
            <h2 className="font-serif text-5xl md:text-8xl text-white">
              {CONTENT.expertise.title}
            </h2>
          </div>
          <p className="font-sans text-zinc-400 text-base md:text-xl leading-relaxed max-w-md mt-6 md:mt-0 text-left md:text-right">
            {CONTENT.expertise.description}
          </p>
        </div>

        {/* 
            Desktop: 2 Rows, Asymmetrical 3-col layout per row.
            Total: 12 cols per row.
        */}
        <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-12 md:gap-6 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 pb-8 md:pb-0 md:auto-rows-[minmax(450px,auto)]">

          {CONTENT.expertise.items.map((item) => (
            <SpotlightCard
              key={item.id}
              className={`p-8 md:p-12 min-h-[450px] md:min-h-0 ${item.colSpan}`}
              delay={item.delay || 0}
              bgImage={item.image}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-xs text-zinc-300 border border-white/20 rounded-full px-3 py-1 bg-black/50 backdrop-blur-md">{item.id}</span>
                <ArrowUpRight className="text-zinc-300 w-6 h-6 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <div>
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">{item.title}</h3>
                <p className="font-sans text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider text-zinc-400 border border-white/10 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}

        </div>
      </div>
    </section>
  );
};