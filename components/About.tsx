import React, { useRef, useState, useEffect } from 'react';
import { CONTENT } from '../constants';
import { Section } from './ui/Section';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

const AboutCard: React.FC<{ item: any; index: number }> = ({ item, index }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();

    // Spotlight calc
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    // Tilt calc
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt for these cards
    const rotateX = ((y - centerY) / centerY) * -2;
    const rotateY = ((x - centerX) / centerX) * 2;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setRotation({ x: 0, y: 0 }); // Reset tilt
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative group bg-neutral-900/50
        h-[280px] md:h-[320px] 
        w-[85vw] md:w-full flex-shrink-0 snap-center
        transition-all duration-200 ease-out
        border border-white/5
        overflow-hidden
      `}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
        willChange: 'transform'
      }}
    >
      {/* Spotlight Effect Border */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(204,255,0,0.4), transparent 40%)`,
        }}
      />

      {/* Spotlight Effect Content Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 z-10 mix-blend-overlay"
        style={{
          opacity: opacity * 0.15,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255,255,255,1), transparent 40%)`,
        }}
      />

      {/* Image Background - Darker by default, reveals on hover */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover opacity-30 group-hover:opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] scale-100 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/20" />

        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(204,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-20">

        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="inline-flex items-center justify-center px-3 py-1 border border-white/10 bg-black/40 backdrop-blur-md rounded-full">
            <span className="font-mono text-[10px] text-neon-lime tracking-widest uppercase">0{index + 1}</span>
          </div>

          <div className="w-10 h-10 flex items-center justify-center border border-white/10 bg-black/40 backdrop-blur-md text-white rounded-full transition-all duration-500 transform group-hover:bg-neon-lime group-hover:text-black group-hover:scale-110">
            <ArrowUpRight size={18} strokeWidth={1.5} />
          </div>
        </div>

        {/* Footer Content */}
        <div className="transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] translate-y-4 group-hover:translate-y-0">
          <h3 className="text-3xl md:text-4xl font-display font-semibold text-white mb-2 tracking-tighter uppercase leading-[0.9]">
            {item.title}
          </h3>

          <div className="overflow-hidden max-h-[150px] opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
            <div className="w-12 h-[1px] bg-neon-lime mb-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <p className="text-neutral-400 group-hover:text-white text-xs md:text-sm leading-relaxed font-light transition-colors duration-300 line-clamp-2 md:line-clamp-none">
              {item.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SystemStatus = () => {
  return (
    <div className="mt-8 md:mt-0 w-full max-w-[280px] relative group cursor-default hidden md:block">
      {/* Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-lime/30 to-blue-500/0 opacity-0 group-hover:opacity-100 transition duration-700 blur"></div>

      <div className="relative bg-black/90 backdrop-blur border border-white/10 p-5 overflow-hidden">
        {/* Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-lime/10 to-transparent h-[50%] w-full animate-scan pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none"></div>

        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-2 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-pulse"></div>
            <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase">System_Core</span>
          </div>
          <span className="text-[9px] font-mono text-neutral-600">v.4.0</span>
        </div>

        <div className="space-y-3 relative z-10 font-mono text-[11px]">
          <div className="flex justify-between items-center group/item">
            <span className="text-neutral-500 group-hover/item:text-white transition-colors">[STATUS]</span>
            <span className="text-neon-lime drop-shadow-[0_0_8px_rgba(204,255,0,0.8)] font-bold tracking-wider">OPERATIONAL</span>
          </div>
          <div className="flex justify-between items-center group/item">
            <span className="text-neutral-500 group-hover/item:text-white transition-colors">[NODE]</span>
            <span className="text-white tracking-wider">GLOBAL_GRID</span>
          </div>
          <div className="flex justify-between items-center group/item">
            <span className="text-neutral-500 group-hover/item:text-white transition-colors">[PROTOCOL]</span>
            <span className="text-white tracking-wider">SCALE_MAX</span>
          </div>
          <div className="flex justify-between items-center group/item pt-2 border-t border-dashed border-white/10 mt-2">
            <span className="text-neutral-500 group-hover/item:text-white transition-colors">UPTIME</span>
            <span className="text-neutral-400">99.99%</span>
          </div>
        </div>

        {/* Tech Corners */}
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-neon-lime"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-neon-lime"></div>
      </div>
    </div>
  );
};

export const About: React.FC = () => {
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
    <Section id="about" className="bg-[#050505] relative overflow-hidden py-24 md:py-32" fullWidth={true}>
      {/* Container for Heading - kept constrained */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 md:mb-24 md:flex justify-between items-end">
          <div className="max-w-4xl">
            <span className="text-neon-lime font-mono text-xs tracking-widest uppercase mb-6 block">
              // The Collective_
            </span>
            <h2 className="text-5xl md:text-8xl font-display font-bold text-white tracking-tighter leading-[0.9]">
              WE BUILD<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white">DOMINANCE.</span>
            </h2>
          </div>
          {/* Animated System Status Component - Desktop Only */}
          <SystemStatus />
        </div>
      </div>

      {/* Cards Container - Vertical on mobile, Grid on desktop */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 md:gap-6 pb-8 md:pb-0 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth"
        >
          {CONTENT.about.features.map((feature, index) => (
            <AboutCard key={index} item={feature} index={index} />
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