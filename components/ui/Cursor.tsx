import React, { useEffect, useState, useRef } from 'react';

export const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Direct update for the main dot (instant)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Laggy update for follower is handled in animation loop or simple transition
      if (followerRef.current) {
        // Using CSS transition for the follower for simplicity in this setup
        followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer')) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Main tiny dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-3 h-3 bg-neon-lime rounded-full pointer-events-none z-[9999] transition-opacity duration-300 shadow-[0_0_10px_rgba(204,255,0,0.5)] ${isHidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ marginTop: -6, marginLeft: -6 }}
      />

      {/* Larger follower circle */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all duration-200 ease-out ${isHidden ? 'opacity-0' : 'opacity-100'}`}
        style={{
          width: isPointer ? 48 : 28,
          height: isPointer ? 48 : 28,
          marginTop: isPointer ? -24 : -14,
          marginLeft: isPointer ? -24 : -14,
          backgroundColor: isPointer ? 'rgba(204,255,0,0.3)' : 'transparent',
          border: '1px solid rgba(255,255,255,0.5)'
        }}
      />
    </>
  );
};