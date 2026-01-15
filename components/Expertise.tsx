import React, { useRef, useState, useEffect } from 'react';
import { CONTENT } from '../constants';
import { Section } from './ui/Section';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

const SpotlightCard: React.FC<{ item: any; className?: string }> = ({ item, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Update CSS variables for high performance
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);

    // Tilt calculation
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    cardRef.current.style.setProperty('--rotate-x', `${rotateX}deg`);
    cardRef.current.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`
        relative group bg-neutral-900/50
        flex-shrink-0 w-[85vw] h-[340px] md:w-auto md:h-[400px] snap-center
        ${item.colSpan}
        transition-all duration-200 ease-out
        border border-white/5
        ${className}
      `}
      style={{
        transform: `perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale3d(1, 1, 1)`,
        willChange: 'transform',
      } as React.CSSProperties}
    >
      {/* Spotlight Effect Border */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(204,255,0,0.4), transparent 40%)`,
        }}
      />

      {/* Spotlight Effect Content Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 z-10 mix-blend-overlay"
        style={{
          opacity: 0.15,
          background: `radial-gradient(800px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,1), transparent 40%)`,
        }}
      />

      {/* Image Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] scale-100 md:scale-105 md:group-hover:scale-110 md:grayscale md:opacity-40 md:group-hover:grayscale-0 md:group-hover:opacity-60 opacity-60 grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 transition-opacity duration-500" />

        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(204,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-20">
        {/* Header */}
        <div className="flex justify-between items-start transform translate-z-10 group-hover:translate-y-2 transition-transform">
          <div className="inline-flex items-center justify-center px-3 py-1 border border-white/10 bg-black/40 backdrop-blur-md rounded-full">
            <span className="font-mono text-[10px] text-white/90 tracking-widest uppercase">{item.id}</span>
          </div>

          <div className="w-12 h-12 flex items-center justify-center border border-white/10 bg-black/40 backdrop-blur-md text-white rounded-full transition-all duration-500 transform md:group-hover:bg-neon-lime md:group-hover:text-black md:group-hover:scale-110">
            <ArrowUpRight size={20} strokeWidth={1.5} />
          </div>
        </div>

        {/* Footer Content */}
        <div className="transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 translate-z-20">
          <h3 className="text-3xl md:text-5xl font-display font-semibold text-white mb-4 tracking-tighter uppercase leading-[0.9]">
            {item.title}
          </h3>

          <div className="overflow-hidden max-h-[200px] md:max-h-0 md:group-hover:max-h-[200px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-100 md:opacity-0 md:group-hover:opacity-100">
            <div className="w-12 h-[1px] bg-neon-lime mb-6"></div>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6 max-w-[90%] font-light">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-2">
              {item.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-white/20 text-neutral-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export const Expertise: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [progress, setProgress] = useState(0);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);

      const maxScroll = scrollWidth - clientWidth;
      setProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      // Check initial state
      checkScroll();
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const targetScroll = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Section id="expertise" className="bg-transparent" fullWidth>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 md:mb-20">
        {/* Changed items-end to items-start for mobile (flex-col), and md:items-end for desktop */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/10 pb-8">
          <div className="max-w-4xl relative">
            <span className="text-xs font-bold tracking-[0.2em] text-neon-lime uppercase mb-4 block">
              {CONTENT.expertise.subtitle}
            </span>
            <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white leading-[0.85] uppercase">
              {CONTENT.expertise.title.part1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 via-white to-neutral-400">
                {CONTENT.expertise.title.part2}
              </span>
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-neutral-500 font-mono text-xs uppercase tracking-wide mb-2">System Status</div>
            <div className="flex items-center gap-2 justify-end">
              <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse"></span>
              <span className="text-white font-mono text-sm">ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Container - Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative perspective-1000">

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-12 gap-6 pb-8 md:pb-0 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth"
        >
          {CONTENT.expertise.items.map((item) => (
            <SpotlightCard key={item.id} item={item} className={`flex-shrink-0 w-[85vw] h-[340px] md:w-auto md:h-[400px] snap-center ${item.colSpan}`} />
          ))}
        </div>

        {/* Mobile Navigation Controls - Bottom Left */}
        <div className="flex md:hidden items-center gap-6 mt-4">
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white transition-all ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'active:bg-neon-lime active:text-black'
                }`}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white transition-all ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : 'active:bg-neon-lime active:text-black'
                }`}
            >
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 max-w-[120px] h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-neon-lime transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};