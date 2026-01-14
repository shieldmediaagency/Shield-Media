import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { CONTENT } from '../content';

interface LegalModalProps {
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-xl border-b border-white/10 p-6 md:p-8 flex justify-between items-center z-50">
        <div>
           <h2 className="font-serif text-2xl md:text-3xl text-white">{CONTENT.legalPage.title}</h2>
           <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{CONTENT.legalPage.lastUpdated}</p>
        </div>
        <button 
            onClick={onClose} 
            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:p-12 pb-32">
        <div className="prose prose-invert prose-lg max-w-none font-sans text-zinc-400">
           {/* Render formatted text from CONTENT.legalPage.fullText */}
           <div dangerouslySetInnerHTML={{ __html: CONTENT.legalPage.fullText }} />
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
            <button onClick={onClose} className="font-mono text-xs uppercase tracking-widest text-white border-b border-transparent hover:border-white transition-colors pb-1">
                Close Documentation
            </button>
        </div>
      </div>
    </motion.div>
  );
};