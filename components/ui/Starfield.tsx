import React, { useEffect, useRef } from 'react';

export const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; size: number; opacity: number; speed: number }[] = [];
    let shootingStars: { x: number; y: number; length: number; speed: number; angle: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    };

    const createStars = () => {
      stars = [];
      // Detect low-power mode or mobile
      const isMobile = window.matchMedia("(pointer: coarse)").matches;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Much fewer stars on mobile/weak devices
      const divider = isMobile ? 8000 : prefersReducedMotion ? 10000 : 4000;
      const starCount = Math.floor((canvas.width * canvas.height) / divider);

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          opacity: Math.random(),
          speed: Math.random() * 0.05
        });
      }
    };

    const createShootingStar = () => {
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * (canvas.height / 2); // Mostly top half
      const angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1); // Diagonal down-rightish
      shootingStars.push({
        x: startX,
        y: startY,
        length: Math.random() * 80 + 10,
        speed: Math.random() * 10 + 5,
        angle: angle,
        opacity: 1
      });
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw static stars
      stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Twinkle - only some stars per frame for performance
        if (Math.random() < 0.1) {
          star.opacity += (Math.random() - 0.5) * 0.05;
          star.opacity = Math.max(0.1, Math.min(1, star.opacity));
        }
      });

      // Draw and update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];

        const endX = star.x + Math.cos(star.angle) * star.length;
        const endY = star.y + Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.02;

        if (star.opacity <= 0 || star.x > canvas.width || star.y > canvas.height) {
          shootingStars.splice(i, 1);
        }
      }

      // Randomly spawn shooting stars
      // Optimized frequency
      if (Math.random() < 0.01) {
        createShootingStar();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none opacity-70" />;
};