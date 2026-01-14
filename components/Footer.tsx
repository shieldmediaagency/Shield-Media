import React from 'react';
import { ArrowUp } from 'lucide-react';
import { CONTENT } from '../content';

interface FooterProps {
    onOpenLegal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="bg-black pt-20 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1800px] mx-auto flex flex-col justify-between min-h-[50vh]">
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-24">
           <div className="flex flex-col gap-8 mb-12 md:mb-0">
             <div className="flex flex-col gap-4">
               <a href="#" className="font-sans font-bold text-2xl tracking-tighter text-white">{CONTENT.appName}</a>
               <p className="text-zinc-500 max-w-xs font-mono text-xs leading-relaxed whitespace-pre-line">
                 {CONTENT.footer.tagline}
               </p>
             </div>
             
             {/* Locations */}
             <div className="flex flex-col gap-2">
               <h4 className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">Global Hubs</h4>
               <p className="text-white font-sans text-sm tracking-wide">
                 {CONTENT.footer.hubs.join(" • ")}
               </p>
             </div>
           </div>

           {/* Legal */}
           <div className="flex flex-col gap-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">Legal</h4>
              <div className="flex flex-col gap-2">
                 {CONTENT.footer.legal.map(link => (
                     <button 
                        key={link.label} 
                        onClick={onOpenLegal}
                        className="text-zinc-400 hover:text-white transition-colors font-sans text-sm text-left"
                     >
                         {link.label}
                     </button>
                 ))}
              </div>
           </div>
        </div>

        <div className="flex flex-col">
           {/* Massive Text */}
           <div className="border-t border-white/10 pt-4 flex justify-between items-end">
              <h1 className="font-serif text-[12vw] leading-[0.8] text-white/10 select-none">{CONTENT.appName}</h1>
              
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hidden md:flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-4 md:mb-8"
              >
                <span className="font-mono text-xs uppercase tracking-widest">Back to Top</span>
                <ArrowUp className="w-4 h-4" />
              </button>
           </div>
           
           <div className="flex justify-between items-center mt-4">
             <span className="text-zinc-600 text-[10px] font-mono uppercase">{CONTENT.footer.copyright}</span>
             <span className="text-zinc-600 text-[10px] font-mono uppercase">All Rights Reserved</span>
           </div>
        </div>

      </div>
    </footer>
  );
};