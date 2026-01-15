import React, { useEffect, useState } from 'react';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Increased speed: Interval runs faster (50ms) and increments are larger
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsExiting(true), 200);
          setTimeout(onComplete, 1000); // Shorter wait for exit
          return 100;
        }
        // Larger random increment for faster load
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-12 bg-black transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="flex justify-between items-start">
         <span className="font-display font-bold text-white tracking-tighter text-xl">SHIELD</span>
         <span className="font-mono text-xs text-neon-lime animate-pulse">SYSTEM_INITIALIZING...</span>
      </div>

      <div className="flex items-end justify-between">
        <div className="text-neon-lime text-[12vw] md:text-[10vw] font-display font-bold leading-none tracking-tighter">
          {progress}%
        </div>
        <div className="text-neutral-500 font-mono text-xs mb-4 md:mb-8 text-right hidden md:block">
          EST. 2022<br/>
          BENGALURU / MUMBAI
        </div>
      </div>
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-[-1] opacity-10 bg-[linear-gradient(to_right,#ccff0012_1px,transparent_1px),linear-gradient(to_bottom,#ccff0012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    </div>
  );
};