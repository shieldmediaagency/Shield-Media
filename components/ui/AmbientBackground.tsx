import React, { useEffect, useRef } from 'react';

export const AmbientBackground: React.FC = () => {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on mobile/touch devices - no mouse to follow
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let lastUpdate = 0;
    const throttleMs = 50; // Only update every 50ms

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate < throttleMs) return;
      lastUpdate = now;

      if (!blobRef.current) return;

      const { clientX, clientY } = e;

      // The animate function creates the "lazy" follow effect
      blobRef.current.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
      }, { duration: 3000, fill: "forwards" });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        ref={blobRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-neon-lime opacity-[0.03] rounded-full blur-[60px] md:blur-[80px] mix-blend-screen"
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>
  );
};