import React, { useState } from 'react';
import { CONTENT } from '../constants';
import { LegalModal } from './ui/LegalModal';

export const Footer: React.FC = () => {
    const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);

    const handleOpenPolicy = (key: string) => {
        setSelectedPolicy(key);
    };

    const handleClosePolicy = () => {
        setSelectedPolicy(null);
    };

    const currentPolicy = selectedPolicy ? (CONTENT.legal as any)[selectedPolicy] : null;

    return (
        // Changed wrapper to min-h-screen to ensure full viewport coverage during reveal
        <div className="md:fixed bottom-0 left-0 w-full z-0 bg-black min-h-screen flex flex-col justify-end">
            <footer className="pt-20 pb-10 border-t border-white/10 w-full h-full flex flex-col justify-between">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-center">

                    {/* Massive Call to Action in Footer - Visible on all devices */}
                    <div className="mb-12 md:mb-24 flex-1 flex items-center justify-center md:justify-start">
                        <h2 className="text-[18vw] leading-[0.8] font-display font-bold text-white tracking-tighter uppercase opacity-20 hover:opacity-100 transition-opacity duration-700 cursor-default select-none text-center md:text-left mix-blend-difference">
                            Shield<br />Media<span className="text-neon-lime">.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-t border-white/10 pt-12">
                        {/* Brand Column */}
                        <div className="md:col-span-3">
                            <p className="text-white text-xl md:text-2xl font-light max-w-sm leading-relaxed">
                                {CONTENT.footer.tagline}
                            </p>
                            <div className="mt-8 flex gap-4">
                                <div className="w-3 h-3 rounded-full bg-neon-lime animate-pulse"></div>
                                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">All Systems Normal</span>
                            </div>
                        </div>

                        {/* Hubs */}
                        <div>
                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 text-neutral-500">Hubs</h4>
                            <ul className="space-y-4">
                                {CONTENT.footer.hubs.map((hub) => (
                                    <li key={hub} className="text-white text-lg font-display uppercase tracking-wide hover:text-neon-lime transition-colors cursor-default">
                                        {hub}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
                        <p className="text-neutral-600 text-xs mb-4 md:mb-0 font-mono">
                            {CONTENT.footer.copyright}
                        </p>
                        <div className="flex space-x-6">
                            {CONTENT.footer.legal.map((link: any) => (
                                <button
                                    key={link.label}
                                    onClick={() => handleOpenPolicy(link.key)}
                                    className="text-neutral-600 hover:text-white text-xs transition-colors font-mono uppercase bg-transparent border-none cursor-pointer"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>

            {/* Legal Modal */}
            <LegalModal
                isOpen={!!selectedPolicy}
                onClose={handleClosePolicy}
                title={currentPolicy?.title || ''}
                lastUpdated={currentPolicy?.lastUpdated}
                content={currentPolicy?.content || ''}
            />
        </div>
    );
};