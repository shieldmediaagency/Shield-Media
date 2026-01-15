import React, { useEffect, useState } from 'react';
import { CONTENT } from '../constants';
import { Starfield } from './ui/Starfield';
import { ScrambleText } from './ui/ScrambleText';

export const Hero: React.FC = () => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Reveal animation
    setTimeout(() => setLoaded(true), 100);

    // Word rotation logic
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % CONTENT.hero.words.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[100dvh] bg-black text-white overflow-hidden selection:bg-neon-lime selection:text-black">

      {/* --- LAYER 1: CINEMATIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        {/* Deep Vignette for focus */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]" />
        {/* Scanlines for texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* --- LAYER 2: HYBRID BACKGROUND --- */}
      {/* Starfield for Mobile (fast, lightweight) */}
      <div className="absolute inset-0 z-10 opacity-70 mix-blend-screen md:hidden">
        <Starfield />
      </div>

      {/* Video for Desktop (premium experience) */}
      <div className="absolute inset-0 z-10 opacity-60 mix-blend-screen hidden md:block">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* --- LAYER 3: TACTICAL HUD FRAMING --- */}
      <div className={`absolute inset-0 z-20 pointer-events-none transition-all duration-1000 ease-out ${loaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="absolute top-24 left-6 md:left-12 w-64 h-64 border-l border-t border-white/20 rounded-tl-3xl hidden md:block"></div>
        <div className="absolute top-24 right-6 md:right-12 w-64 h-64 border-r border-t border-white/20 rounded-tr-3xl hidden md:block"></div>
        <div className="absolute bottom-24 left-6 md:left-12 w-64 h-64 border-l border-b border-white/20 rounded-bl-3xl hidden md:block"></div>
        <div className="absolute bottom-24 right-6 md:right-12 w-64 h-64 border-r border-b border-white/20 rounded-br-3xl hidden md:block"></div>

        {/* Crosshairs */}
        <div className="absolute top-1/2 left-8 w-4 h-[1px] bg-white/30 hidden md:block"></div>
        <div className="absolute top-1/2 right-8 w-4 h-[1px] bg-white/30 hidden md:block"></div>
        <div className="absolute top-24 left-1/2 w-[1px] h-4 bg-white/30 hidden md:block"></div>
        <div className="absolute bottom-24 left-1/2 w-[1px] h-4 bg-white/30 hidden md:block"></div>
      </div>

      {/* --- LAYER 4: CONTENT --- */}
      <div className="relative z-30 w-full h-full flex flex-col items-center justify-center px-6">

        {/* Top Meta Data */}
        <div className="absolute top-32 left-0 right-0 px-12 md:px-20 flex justify-between items-start text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase hidden md:flex">
          <div className="flex flex-col gap-1">
            <span className="text-white">EST. 2022</span>
            <span className="text-neon-lime animate-pulse">System: Online</span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-white">Bengaluru / Mumbai</span>
            <span>Global HQ</span>
          </div>
        </div>

        {/* MAIN TYPOGRAPHY */}
        <div className="flex flex-col items-center relative mt-0">
          {/* The Massive Title */}
          <div className="relative overflow-hidden py-2 min-h-[16vw] flex items-center justify-center">
            <h1 className="font-display font-bold text-[20vw] md:text-[16vw] leading-[0.8] tracking-tighter text-white uppercase text-center mix-blend-difference">
              <ScrambleText
                text={CONTENT.hero.words[activeWordIndex]}
                key={activeWordIndex} // Key forces re-render/re-scramble
                className="block"
              />
            </h1>
          </div>

          {/* The Subheading */}
          <div
            className={`
               mt-8 md:mt-8 backdrop-blur-md border border-white/10 bg-black/40 rounded-full px-8 py-4 md:px-12 md:py-6 text-center
               transform transition-all duration-1000 delay-200 hover:bg-white/5 hover:border-white/30 transition-colors
               ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
             `}
          >
            <p className="text-base md:text-2xl text-white font-light tracking-wide mb-2">
              We craft legends for the modern age.
            </p>
            <div className="flex items-center justify-center gap-3 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
              <span>Branding</span>
              <span className="w-1 h-1 bg-neon-lime rounded-full animate-pulse"></span>
              <span>Experience</span>
              <span className="w-1 h-1 bg-neon-lime rounded-full animate-pulse"></span>
              <span className="text-white">Dominance</span>
            </div>
          </div>
        </div>

        {/* Bottom Elements - Centered on mobile via justify-center, space-between on desktop */}
        <div className="absolute bottom-32 left-0 right-0 px-12 md:px-20 flex justify-center md:justify-between items-end">
          {/* Scroll Indicator */}
          <button
            onClick={() => document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-4 cursor-pointer bg-transparent border-none appearance-none"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-neon-lime transition-colors relative overflow-hidden">
              <div className="absolute inset-0 bg-neon-lime translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <div className="w-[1px] h-4 bg-white group-hover:bg-black relative z-10 transition-colors"></div>
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-neutral-400 group-hover:text-white transition-colors">Scroll to Begin</span>
          </button>

          {/* Status Pill */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-neon-lime/10 hover:border-neon-lime/30 transition-colors">
            <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-widest text-neutral-300 uppercase">{CONTENT.hero.status}</span>
          </div>
        </div>

      </div>
    </section>
  );
};