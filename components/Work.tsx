import React, { useState, useRef } from 'react';
import { CONTENT } from '../constants';
import { Section } from './ui/Section';
import { ArrowUpRight } from 'lucide-react';

export const Work: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const floatingImageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Direct DOM manipulation for performance
    if (floatingImageRef.current && listRef.current) {
      const rect = listRef.current.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY - rect.top;

      // Offset logic handled in CSS transform, just passing coords here
      floatingImageRef.current.style.transform = `translate(${x + 20}px, ${y - 180}px) rotate(${activeProject !== null ? '5deg' : '0deg'}) scale(${activeProject !== null ? 1 : 0})`;
    }
  };

  return (
    <Section id="work" className="relative bg-black py-0 md:py-0 overflow-visible z-20" fullWidth>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32" onMouseMove={handleMouseMove} ref={listRef}>

        {/* Header */}
        <div className="mb-20 md:mb-32 flex items-end justify-between border-b border-white/10 pb-8">
          <div>
            <span className="text-neon-lime font-mono text-xs tracking-widest uppercase mb-4 block">
              // Selected Works_
            </span>
            <h2 className="text-5xl md:text-9xl font-display font-bold text-white tracking-tighter">
              CASE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white">STUDIES</span>
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-neutral-500 font-mono text-xs block mb-2">Projects Shipped</span>
            <span className="text-2xl font-display text-white">2023 — 2025</span>
          </div>
        </div>

        {/* Floating Image Preview - Desktop Only - RESIZED SMALLER */}
        {/* Using ref for direct manipulation to avoid re-renders */}
        <div
          ref={floatingImageRef}
          className="hidden md:block pointer-events-none absolute z-30 overflow-hidden w-[480px] h-[320px] transition-opacity duration-300 ease-out"
          style={{
            left: 0,
            top: 0,
            // Initial state
            transform: `scale(0)`,
            opacity: activeProject !== null ? 1 : 0,
          }}
        >
          {CONTENT.work.items.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.client}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${activeProject === index ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          {/* Overlay for depth */}
          <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-12 md:gap-0 relative z-20 mix-blend-screen">
          {CONTENT.work.items.map((item, index) => (
            <div
              key={index}
              className="group relative md:border-b md:border-white/10 md:py-20 transition-all duration-500 md:hover:border-white/50 cursor-none"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 md:gap-0 relative z-20">

                <div className="flex items-start md:items-baseline gap-4 md:gap-12 transition-transform duration-500 md:group-hover:translate-x-4">
                  <span className="font-mono text-neon-lime text-xs md:text-base mt-2 md:mt-0 tracking-widest">0{index + 1}</span>
                  <div className="flex-1">
                    <h3 className="text-4xl md:text-8xl font-display font-medium text-white md:text-neutral-500 md:group-hover:text-white md:group-hover:italic transition-all duration-500">
                      {item.client}
                    </h3>
                    <p className="md:hidden text-neutral-400 text-sm mt-3 font-mono uppercase tracking-wider">{item.category}</p>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-between md:justify-end gap-4 md:gap-20 w-full md:w-auto">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-16">
                    <span className="text-xs md:text-base font-mono uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">{item.category}</span>
                    <span className="text-xs md:text-base font-mono text-neutral-500 group-hover:text-white transition-colors">{item.year}</span>
                  </div>
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-neon-lime group-hover:text-black transition-all duration-500 group-hover:scale-110">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};