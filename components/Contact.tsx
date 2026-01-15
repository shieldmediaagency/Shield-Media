import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './ui/Section';
import { ArrowUpRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const handleStartProject = () => {
    window.location.href = `mailto:${CONTENT.contact.email}?subject=New Project Inquiry`;
  };

  return (
    <Section id="contact" className="bg-white text-black pb-0 pt-24 md:pt-32 relative overflow-hidden" fullWidth>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 mb-20 md:mb-24">
          <div className="flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase mb-8 block text-neutral-400 font-bold">
                 // Initiate Protocol
              </span>
              <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[0.9] mb-8">
                HAVE AN<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-black">IDEA?</span>
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 max-w-md leading-relaxed">
                {CONTENT.contact.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-end items-start md:items-end">
            <button
              onClick={handleStartProject}
              className="w-full md:w-auto group relative inline-flex items-center justify-center overflow-hidden bg-black text-white px-8 py-6 md:px-16 md:py-8 rounded-full transition-all duration-300 hover:scale-105 hover:bg-neon-lime hover:text-black active:scale-95 border border-transparent hover:border-black/10 shadow-lg hover:shadow-neon-lime/20"
            >
              <span className="relative z-10 font-display font-bold text-xl md:text-2xl tracking-wider uppercase flex items-center gap-4">
                Start Project <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>
            <div className="mt-8 flex items-center gap-2 text-neutral-500 hover:text-black transition-colors cursor-pointer group">
              <span className="font-mono text-sm">DIRECT LINE</span>
              <span className="w-12 h-[1px] bg-neutral-300 group-hover:bg-black transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 pt-16 pb-12 md:pb-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div className="flex-1 w-full overflow-hidden">
              <span className="text-neutral-400 font-mono text-xs mb-2 block">EMAIL_</span>
              <a
                href={`mailto:${CONTENT.contact.email}`}
                className="text-2xl sm:text-3xl md:text-5xl font-display font-bold tracking-tighter hover:text-neutral-500 transition-colors break-words w-full block"
              >
                {CONTENT.contact.email}
              </a>
            </div>

            <div className="flex gap-12 md:gap-8 w-full md:w-auto">
              {['Bengaluru', 'Mumbai'].map((city) => (
                <div key={city} className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Hub</span>
                  <span className="font-display font-bold text-xl">{city}</span>
                  <span className="font-mono text-xs text-neutral-400 font-medium mt-1">INDIA</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};