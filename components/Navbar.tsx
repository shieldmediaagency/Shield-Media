import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { CONTENT } from '../content';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 ${
          scrolled || isOpen ? 'bg-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <a href="#" className="font-sans font-bold text-2xl tracking-tighter text-white z-[120] relative mix-blend-difference">
          {CONTENT.appName}
        </a>

        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white hover:text-zinc-400 transition-colors z-[120]"
        >
          Menu <Menu className="w-6 h-6" />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-black text-white z-[110] flex flex-col px-6 md:px-12 py-8 overflow-hidden"
          >
            {/* Background Image Reveal */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <AnimatePresence mode="wait">
                    {hoveredImage && (
                        <motion.img 
                            key={hoveredImage}
                            src={hoveredImage}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-cover grayscale"
                        />
                    )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="flex justify-between items-center mb-20 relative z-10">
              <span className="font-sans font-bold text-2xl tracking-tighter">{CONTENT.appName}</span>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-300 text-white">
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center gap-6 relative z-10">
               {CONTENT.nav.map((item, i) => (
                 <motion.a
                   key={item.label}
                   href={item.href}
                   onClick={() => setIsOpen(false)}
                   onMouseEnter={() => setHoveredImage(item.image || null)}
                   onMouseLeave={() => setHoveredImage(null)}
                   initial={{ y: 50, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.1 * i }}
                   className="font-serif text-5xl md:text-7xl hover:italic transition-all cursor-pointer relative group text-zinc-300 hover:text-white"
                 >
                   {item.label}
                 </motion.a>
               ))}
            </div>

            <div className="flex justify-between items-end uppercase text-xs tracking-widest font-medium border-t border-white/10 pt-8 text-zinc-500 relative z-10">
              <div className="flex flex-col gap-1">
                {CONTENT.footer.hubs.map(hub => <span key={hub}>{hub}</span>)}
              </div>
              <div>
                {CONTENT.footer.copyright}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};