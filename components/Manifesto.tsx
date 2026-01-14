import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../content';

export const Manifesto: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 md:py-24 bg-black text-white px-6 md:px-12 relative overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* The Quote */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mb-20 md:mb-24"
        >
          <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent mx-auto mb-12" />
          <h2 className="font-sans text-xl md:text-3xl lg:text-4xl leading-relaxed font-light text-zinc-300 px-4">
            "{CONTENT.manifesto.quotePart1} <span className="font-serif italic text-white text-2xl md:text-4xl lg:text-5xl px-1">{CONTENT.manifesto.quoteHighlight1}</span> 
            {CONTENT.manifesto.quotePart2} <span className="font-serif italic text-white text-2xl md:text-4xl lg:text-5xl px-1">{CONTENT.manifesto.quoteHighlight2}</span> 
            {CONTENT.manifesto.quotePart3}"
          </h2>
        </motion.div>

        {/* The Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-24 w-full border-t border-white/10 pt-16">
           {CONTENT.manifesto.stats.map((stat, index) => (
             <motion.div 
               key={index}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
               className="text-center flex flex-col items-center justify-center p-4 md:p-8 hover:bg-white/5 rounded-none transition-colors duration-500"
             >
                <span className="font-serif text-4xl md:text-6xl text-white mb-2 md:mb-4 block">{stat.value}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{stat.label}</span>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};