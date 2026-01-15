import React, { useEffect, useRef, useState } from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, className = '', children, fullWidth = false }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className={`py-24 md:py-32 relative reveal-section ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      <div className={`mx-auto ${fullWidth ? 'w-full' : 'max-w-7xl px-6 md:px-12'}`}>
        {children}
      </div>
    </section>
  );
};