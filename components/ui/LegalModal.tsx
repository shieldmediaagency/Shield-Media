import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    lastUpdated?: string;
    content: string; // HTML string
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, lastUpdated, content }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setShow(true);
        } else {
            setTimeout(() => setShow(false), 300); // Delay hiding for exit animation
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!show && !isOpen) return null;

    return createPortal(
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className={`
          relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden
          transform transition-all duration-300 ease-out
          ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
        `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
                    <div>
                        <h2 className="text-lg md:text-xl font-display font-bold text-white tracking-wide uppercase">{title}</h2>
                        {lastUpdated && (
                            <p className="text-[10px] text-neutral-500 font-mono mt-1">LAST UPDATED: {lastUpdated}</p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div
                        className="prose prose-invert prose-sm max-w-none text-neutral-300 font-light leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>

                {/* Footer actions (optional) */}
                <div className="px-6 py-4 border-t border-white/10 bg-black/50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neon-lime hover:border-neon-lime transition-colors border border-transparent"
                    >
                        Close
                    </button>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 left-0 w-16 h-16 border-l border-t border-white/5 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-white/5 pointer-events-none"></div>
            </div>
        </div>,
        document.body
    );
};
