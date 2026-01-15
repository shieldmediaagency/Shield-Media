import React, { useState, useEffect } from 'react';
import { CONTENT } from '../constants';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileOpen]);

  const handleConnectClick = () => {
    setIsMobileOpen(false);
    window.location.href = `mailto:${CONTENT.contact.email}?subject=New Project Inquiry`;
  };

  const scrollToSection = (id: string) => {
    setIsMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4'
          : 'bg-gradient-to-b from-black/80 to-transparent border-b border-transparent py-6'
          }`}
      >
        {/* Container updated to full width to align with Hero HUD */}
        <div className="w-full px-6 md:px-12 flex items-center justify-between">
          {/* Logo with Glitch Effect */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glitch-hover text-2xl font-display font-bold tracking-tighter text-white z-50 relative mix-blend-difference bg-transparent border-none cursor-pointer"
            data-text={CONTENT.appName}
          >
            SHIELD<span className="text-neon-lime">.</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {CONTENT.nav.filter(item => item.label !== 'Contact').map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="group relative text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-neon-lime transition-colors overflow-hidden bg-transparent border-none cursor-pointer p-0"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neon-lime transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </button>
            ))}

            {/* CTA Button */}
            <button
              onClick={handleConnectClick}
              className="relative group bg-white text-black px-6 py-2 overflow-hidden font-display font-bold uppercase tracking-wider text-sm transition-all hover:bg-neon-lime"
            >
              <span className="relative z-10">Connect</span>
              <div className="absolute inset-0 bg-neon-lime transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white z-50 relative p-2 -mr-2 active:scale-90 transition-transform"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        {/* Animated Background Elements */}
        <div className={`absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-black transition-opacity duration-1000 ${isMobileOpen ? 'opacity-100' : 'opacity-0'}`} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

        <div className="h-full flex flex-col justify-center px-6 relative z-10">
          <div className="flex flex-col space-y-4">
            {CONTENT.nav.filter(item => item.label !== 'Contact').map((item, index) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`group flex items-center justify-between py-2 transform transition-all duration-700 ease-out w-full text-left bg-transparent border-none ${isMobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="text-5xl font-display font-bold uppercase tracking-tighter text-neutral-500 group-hover:text-white transition-colors duration-300">
                  {item.label}
                </span>
                <ArrowRight className="text-neon-lime opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={32} />
              </button>
            ))}

            {/* Mobile Connect Button */}
            <button
              onClick={handleConnectClick}
              className={`group flex items-center justify-between py-2 transform transition-all duration-700 ease-out w-full text-left bg-transparent border-none ${isMobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              style={{ transitionDelay: `${CONTENT.nav.length * 100}ms` }}
            >
              <span className="text-5xl font-display font-bold uppercase tracking-tighter text-white group-hover:text-neon-lime transition-colors duration-300">
                Connect
              </span>
              <ArrowRight className="text-white opacity-100 group-hover:text-neon-lime transition-all duration-300" size={32} />
            </button>
          </div>

          <div className={`mt-16 transition-all duration-1000 delay-500 border-t border-white/10 pt-8 ${isMobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-neutral-500 font-mono text-xs mb-2 tracking-widest">BENGALURU / MUMBAI</p>
            <p className="text-white font-display text-xl tracking-wide">{CONTENT.contact.email.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </>
  );
};