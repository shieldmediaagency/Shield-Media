import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CONTENT } from '../content';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-24 bg-black px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1800px] mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

          {/* Left Column: Info */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-6 block">{CONTENT.contact.subtitle}</span>
              <h2 className="font-serif text-5xl md:text-7xl text-white mb-8">
                {CONTENT.contact.title}
              </h2>
              <p className="font-sans text-lg text-zinc-400 max-w-md mb-12">
                {CONTENT.contact.description}
              </p>

              <div className="space-y-4">
                <a href={`mailto:${CONTENT.contact.email}`} className="block font-sans text-xl text-white hover:text-zinc-400 transition-colors">
                  {CONTENT.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-zinc-950 p-8 md:p-12 border border-white/5">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-widest text-zinc-500">First Name</label>
                  <input type="text" className="bg-transparent border-b border-white/20 py-2 text-white focus:border-white outline-none transition-colors" placeholder="Jane" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-widest text-zinc-500">Last Name</label>
                  <input type="text" className="bg-transparent border-b border-white/20 py-2 text-white focus:border-white outline-none transition-colors" placeholder="Doe" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs uppercase tracking-widest text-zinc-500">Email Address</label>
                <input type="email" className="bg-transparent border-b border-white/20 py-2 text-white focus:border-white outline-none transition-colors" placeholder="jane@company.com" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs uppercase tracking-widest text-zinc-500">Company / Brand</label>
                <input type="text" className="bg-transparent border-b border-white/20 py-2 text-white focus:border-white outline-none transition-colors" placeholder="Your Brand Name" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs uppercase tracking-widest text-zinc-500">Project Details</label>
                <textarea rows={4} className="bg-transparent border-b border-white/20 py-2 text-white focus:border-white outline-none transition-colors resize-none" placeholder="Tell us about your goals..." />
              </div>

              <div className="pt-4">
                <button type="button" className="w-full bg-white text-black font-mono text-xs uppercase tracking-[0.2em] py-4 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-4 group">
                  Send Inquiry
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};