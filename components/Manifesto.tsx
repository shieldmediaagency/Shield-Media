import React, { useEffect, useState, useRef } from 'react';
import { CONTENT } from '../constants';
import { Section } from './ui/Section';
import { ScrambleText } from './ui/ScrambleText';

const ROTATING_WORDS = ["CLARITY", "VELOCITY", "PRECISION", "PURPOSE", "TRUTH"];

const ScrollRevealText: React.FC<{ text: string }> = ({ text }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [words, setWords] = useState<any[]>([]);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  // Keep track of the currently active index to avoid redundant state updates
  const lastActiveIndexRef = useRef<number>(-1);

  useEffect(() => {
    const splitWords = text.split(" ");
    setWords(splitWords.map(word => ({ text: word, opacity: 0.2 })));
  }, [text]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress of the container through the viewport
      // 0 when top enters bottom of screen, 1 when bottom leaves top
      const start = windowHeight * 0.8;
      const end = windowHeight * 0.2;

      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const activeIndex = Math.floor(progress * words.length);

      // Performance Optimization: Only update state if index changed
      if (activeIndex !== lastActiveIndexRef.current) {
        lastActiveIndexRef.current = activeIndex;
        setWords(prev => prev.map((w, i) => ({
          ...w,
          opacity: i <= activeIndex ? 1 : 0.2
        })));
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [words.length]);

  return (
    <p ref={containerRef} className="text-3xl md:text-5xl font-display font-medium leading-[1.2] text-white flex flex-wrap gap-x-3 gap-y-2">
      {words.map((word, i) => {
        const isTargetWord = word.text.includes('CLARITY');
        const isVisible = word.opacity === 1;

        return (
          <span
            key={i}
            className={`transition-all duration-300 ${isTargetWord ? 'text-neon-lime font-bold tracking-wider' : ''}`}
            style={{ opacity: word.opacity }}
          >
            {isTargetWord ? (
              <ScrambleText
                text={ROTATING_WORDS[activeWordIndex]}
                key={activeWordIndex} // Forces re-render to trigger scramble animation on word change
                trigger={isVisible}
                scrambleSpeed={25}
                revealSpeed={50}
              />
            ) : (
              word.text
            )}
          </span>
        );
      })}
    </p>
  );
}

const CountUp: React.FC<{ end: string; label: string }> = ({ end, label }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const numericEnd = parseInt(end.replace(/[^0-9]/g, '')) || 0;
  const isNumeric = !isNaN(parseInt(end[0]));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && isNumeric) {
          let start = 0;
          const duration = 2000;
          const stepTime = Math.abs(Math.floor(duration / numericEnd));

          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === numericEnd) clearInterval(timer);
          }, stepTime);

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [numericEnd, isNumeric]);

  // Extract suffix (everything that's not a number)
  const suffix = end.replace(/[0-9]/g, '');

  return (
    <div ref={elementRef} className="flex flex-col">
      <span className="text-5xl md:text-7xl font-display font-bold text-white mb-2 tracking-tighter">
        {isNumeric ? count : end}{isNumeric ? suffix : ''}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-neutral-500 font-bold border-t border-white/10 pt-4 inline-block w-full">
        {label}
      </span>
    </div>
  );
};

export const Manifesto: React.FC = () => {
  // Construct full text for the reveal
  const fullText = `${CONTENT.manifesto.quotePart1} ${CONTENT.manifesto.quoteHighlight1} ${CONTENT.manifesto.quotePart2} ${CONTENT.manifesto.quoteHighlight2}`;

  return (
    <Section id="philosophy" className="border-t border-white/5 py-24 md:py-32 bg-transparent">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
        <div>
          <span className="text-neon-lime font-mono text-xs tracking-widest uppercase mb-6 block">
              // Philosophy
          </span>
          {/* Replaced static header with ScrollRevealText */}
          <ScrollRevealText text={fullText} />
        </div>

        <div className="grid grid-cols-2 gap-y-16 gap-x-12 md:border-l border-white/10 md:pl-20">
          {CONTENT.manifesto.stats.map((stat, index) => (
            <CountUp key={index} end={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </Section>
  );
};