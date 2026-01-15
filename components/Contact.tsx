import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CONTENT } from '../constants';
import { Section } from './ui/Section';
import { ArrowUpRight, X, Loader2 } from 'lucide-react';

interface ContactProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const Contact: React.FC<ContactProps> = ({ isOpen, onClose, onOpen }) => {
  const [formState, setFormState] = useState({ name: '', email: '', budget: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormState({ name: '', email: '', budget: '', message: '' });
      }, 2000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <>
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
                onClick={onOpen}
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

      {/* --- INQUIRY MODAL (PORTAL) --- */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-300 animate-fade-in" onClick={onClose} />

          {/* Modal Container - Centered */}
          <div
            className="w-full max-w-2xl bg-neutral-900 border border-white/10 relative overflow-hidden shadow-2xl animate-fade-in flex flex-col max-h-[85vh] md:max-h-[90vh] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative Tech Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-neutral-400 hover:text-white transition-colors z-20 p-2"
            >
              <X size={24} />
            </button>

            <div className="relative z-10 p-6 md:p-12 overflow-y-auto custom-scrollbar">

              {!isSubmitted ? (
                <>
                  <div className="mb-8 md:mb-10">
                    <span className="text-neon-lime font-mono text-xs tracking-widest uppercase mb-2 block">
                        // New Inquiry
                    </span>
                    <h3 className="text-2xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">
                      Initialize Project
                    </h3>
                    <p className="text-neutral-400 text-sm mt-2 font-light">
                      Tell us about your ambition. We'll handle the rest.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Name</label>
                        <input
                          required
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          type="text"
                          className="w-full bg-black/50 border border-white/10 p-3 md:p-4 text-white placeholder-neutral-700 focus:border-neon-lime focus:outline-none focus:ring-1 focus:ring-neon-lime transition-all font-mono text-sm"
                          placeholder="FULL NAME"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Email</label>
                        <input
                          required
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          type="email"
                          className="w-full bg-black/50 border border-white/10 p-3 md:p-4 text-white placeholder-neutral-700 focus:border-neon-lime focus:outline-none focus:ring-1 focus:ring-neon-lime transition-all font-mono text-sm"
                          placeholder="EMAIL ADDRESS"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Estimated Budget (USD)</label>
                      <select
                        name="budget"
                        value={formState.budget}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 p-3 md:p-4 text-white text-sm font-mono focus:border-neon-lime focus:outline-none appearance-none"
                      >
                        <option value="" disabled className="text-neutral-700">SELECT RANGE</option>
                        <option value="10-25k">$10k - $25k</option>
                        <option value="25-50k">$25k - $50k</option>
                        <option value="50-100k">$50k - $100k</option>
                        <option value="100k+">$100k+</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Project Brief</label>
                      <textarea
                        required
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-black/50 border border-white/10 p-3 md:p-4 text-white placeholder-neutral-700 focus:border-neon-lime focus:outline-none focus:ring-1 focus:ring-neon-lime transition-all font-mono text-sm resize-none"
                        placeholder="TELL US WHAT YOU WANT TO BUILD..."
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" size={18} /> Processing
                          </>
                        ) : (
                          'Transmit Request'
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="min-h-[300px] flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 rounded-full border border-neon-lime/30 bg-neon-lime/10 flex items-center justify-center mb-6 text-neon-lime animate-pulse">
                    <ArrowUpRight size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-2">Transmission Received</h3>
                  <p className="text-neutral-400 max-w-xs mx-auto">
                    Your briefing has been securely logged. Our team will decrypt and respond within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};