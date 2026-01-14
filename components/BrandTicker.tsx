import React from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { wrap } from '@motionone/utils';
import { CONTENT } from '../content';

interface ParallaxTextProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  // We have 4 copies of the children. To loop seamlessly, we wrap between 0% and -25%.
  // When it hits -25%, it snaps back to 0%, which is visually identical.
  const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`);

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="scroller font-mono text-lg md:text-xl font-bold uppercase tracking-widest flex whitespace-nowrap gap-16 md:gap-32" style={{ x }}>
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export const BrandTicker: React.FC = () => {
  const brands = CONTENT.ticker.brands;

  return (
    <section className="py-16 md:py-24 bg-black border-b border-white/5 overflow-hidden">
      <div className="relative w-full">
        <ParallaxText baseVelocity={-2}>
          {brands.map((brand, i) => (
             <span key={i} className="text-zinc-600 hover:text-white transition-colors duration-500 mx-8 cursor-default" data-hover>
                {brand}
             </span>
          ))}
        </ParallaxText>
      </div>
    </section>
  );
};