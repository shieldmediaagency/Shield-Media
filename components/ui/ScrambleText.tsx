import React, { useEffect, useState, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  revealSpeed?: number;
  trigger?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?";

export const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = "", 
  scrambleSpeed = 30, 
  revealSpeed = 50, // Slower reveal for drama
  trigger = true 
}) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
        }
      }

      iteration += 1 / 3; // Controls how fast the real text reveals (higher denominator = slower)
    }, scrambleSpeed);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [text, trigger, scrambleSpeed]);

  return <span className={className}>{displayText}</span>;
};