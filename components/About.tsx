import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../content';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-zinc-900/50 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      
      {/* Decorative gradient orb - Adjusted for visibility */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/[0.05] rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[1800px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">
          
          {/* Left: Title & Main Copy */}
          <div className="flex-1">
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-6 block">
              {CONTENT.about.subtitle}
            </span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-6xl text-white mb-8"
            >
              {CONTENT.about.title}
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-sans text-lg md:text-xl text-zinc-300 leading-relaxed max-w-2xl"
            >
              {CONTENT.about.description}
            </motion.div>
          </div>

          {/* Right: Feature Grid */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 gap-8 md:gap-12">
              {CONTENT.about.features.map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  className="group border-b border-white/10 pb-8 hover:border-white/30 transition-colors"
                >
                  <h3 className="font-serif text-2xl text-white mb-2 group-hover:italic transition-all">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-sm text-zinc-500 uppercase tracking-wide group-hover:text-zinc-400 transition-colors">
                    {feature.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};