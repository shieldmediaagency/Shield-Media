import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CONTENT } from '../content';

export const Work: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  // Mouse position logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the floating image
  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="work" className="bg-black py-16 md:py-24 px-6 md:px-12 relative z-20">
      
      {/* Floating Image Reveal - Global for this section */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 mix-blend-difference">
         <AnimatePresence>
            {hoveredProject && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    style={{ 
                        x: springX, 
                        y: springY,
                        translateX: '-50%',
                        translateY: '-50%'
                    }}
                    className="absolute w-[180px] h-[240px] overflow-hidden rounded-sm"
                >
                    <img 
                        src={hoveredProject} 
                        alt="Project Preview" 
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            )}
         </AnimatePresence>
      </div>

      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col mb-12 md:mb-16">
           <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">{CONTENT.work.subtitle}</span>
           <h2 className="font-serif text-5xl md:text-6xl text-white">Recent <span className="italic text-zinc-600">Commissions</span></h2>
        </div>

        <div className="border-t border-white/10" onMouseLeave={() => setHoveredProject(null)}>
          {CONTENT.work.items.map((work, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProject(work.image || null)}
              className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-white/10 cursor-pointer hover:opacity-50 transition-opacity duration-300 px-4 relative z-30"
              data-hover
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:gap-12 pointer-events-none">
                <span className="font-mono text-xs text-zinc-600 mb-2 md:mb-0">0{index + 1}</span>
                <h3 className="font-serif text-4xl md:text-6xl text-white group-hover:italic transition-all duration-300">
                  {work.client}
                </h3>
              </div>
              
              <div className="flex items-center gap-8 mt-4 md:mt-0 pointer-events-none">
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest hidden md:block">{work.category}</span>
                <span className="font-mono text-xs text-zinc-700 uppercase tracking-widest">{work.year}</span>
                <ArrowUpRight className="text-white w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};