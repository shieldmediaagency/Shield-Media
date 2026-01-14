import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { CONTENT } from '../content';

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    // Star Properties for "Infinite Depth"
    interface Star {
      x: number;
      y: number;
      z: number; // Depth factor (0 = far, 1 = close)
      size: number;
      opacity: number;
    }

    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
    }

    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];

    // Initialize Background Starfield
    const initStars = () => {
      stars.length = 0;
      const starCount = Math.floor((width * height) / 3000); // Responsive density
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random(), 
          size: Math.random() * 1.5,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };
    
    initStars();

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width + 200, // Bias towards right side start
        y: Math.random() * height * 0.3, // Start in top area
        length: Math.random() * 100 + 50,
        speed: Math.random() * 15 + 10,
        opacity: 1
      });
    };

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Background Stars (Parallax Layer)
      stars.forEach(star => {
        // Depth simulation: Closer stars (higher z) move faster
        const speed = (star.z * 0.3) + 0.05;
        
        // Move stars slowly upwards for "rising" effect
        star.y -= speed;
        
        // Wrap around
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        // Twinkle effect
        if (Math.random() < 0.005) {
            star.opacity = Math.random() * 0.5 + 0.2;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        // Size also affected by depth
        const r = star.size * (0.5 + star.z * 0.5);
        ctx.arc(star.x, star.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Shooting Stars
      for (let i = 0; i < shootingStars.length; i++) {
        const star = shootingStars[i];
        
        // Calculate tail position (diagonal down-left movement)
        const tailX = star.x + star.length; // Coming from right
        const tailY = star.y - star.length; // Coming from top

        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Move star (diagonal down-left)
        star.x -= star.speed;
        star.y += star.speed;
        star.opacity -= 0.015;

        // Remove dead stars
        if (star.x < -100 || star.y > height + 100 || star.opacity <= 0) {
          shootingStars.splice(i, 1);
          i--;
        }
      }

      // Random spawn
      if (Math.random() < 0.02) { // 2% chance per frame
        createShootingStar();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />;
};

const SplitText = ({ text }: { text: string }) => {
  return (
    <h1 className="font-serif text-[17vw] md:text-[16vw] leading-none text-white tracking-tighter mix-blend-overlay select-none flex overflow-hidden">
        {text.split("").map((char, i) => (
            <motion.span
                key={i}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, delay: i * 0.03, ease: [0.33, 1, 0.68, 1] }}
                className="block"
            >
                {char}
            </motion.span>
        ))}
    </h1>
  );
};

export const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % CONTENT.hero.words.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-between items-center bg-black overflow-hidden px-6 md:px-12 pt-28 pb-8 md:pt-32 md:pb-12">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" /> 
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60 scale-110"
        >
          <source src={CONTENT.hero.videoUrl} type="video/mp4" />
        </video>
      </div>

      <Starfield />

      <div className="relative z-30 w-full max-w-[1800px] mx-auto flex flex-col h-full">
        
        {/* Top Meta */}
        <div className="flex justify-between items-start border-b border-white/20 pb-4 md:pb-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2 }} // Wait for preloader
            className="flex flex-col"
          >
             <span className="font-sans text-xs font-bold tracking-[0.2em] text-white uppercase">{CONTENT.appName} Media</span>
             <span className="font-mono text-[10px] text-zinc-300 mt-1">{CONTENT.hero.est}</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2 }}
            className="text-right hidden md:block"
          >
             <span className="font-sans text-xs font-bold tracking-[0.2em] text-white uppercase">Global HQ</span>
             <span className="font-mono text-[10px] text-zinc-300 mt-1 block">{CONTENT.hero.hq}</span>
          </motion.div>
        </div>

        {/* Centerpiece - Morphing Text */}
        <div className="flex flex-col items-center text-center justify-center flex-1 w-full">
          <div className="relative h-[20vw] md:h-[16vw] flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              <div key={CONTENT.hero.words[index]} className="absolute inset-0 flex items-center justify-center">
                 <SplitText text={CONTENT.hero.words[index]} />
              </div>
            </AnimatePresence>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
            className="mt-4 md:mt-8 font-sans text-base md:text-2xl text-zinc-200 max-w-xl md:max-w-3xl font-light tracking-wide mix-blend-difference px-4"
          >
            We craft <span className="italic font-serif">legends</span> for the modern age. 
            <br className="hidden md:block"/> Branding. Experience. Dominance.
          </motion.p>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-between items-end">
           <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="flex items-center gap-4"
           >
             <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
             <span className="font-mono text-[10px] md:text-xs text-zinc-300 uppercase tracking-widest">{CONTENT.hero.status}</span>
           </motion.div>

           <motion.a 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 2.5 }}
             href="#work"
             data-hover
             className="group flex flex-col items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
           >
             <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white">Scroll</span>
             <ArrowDown className="text-white w-4 h-4 animate-bounce" />
           </motion.a>
        </div>
      </div>
    </section>
  );
};