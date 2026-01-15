import React from 'react';
import { CONTENT } from '../constants';

export const Ticker: React.FC = () => {
  // Duplicate array to ensure seamless loop
  const brands = [...CONTENT.ticker.brands, ...CONTENT.ticker.brands, ...CONTENT.ticker.brands];

  return (
    <section className="relative w-full bg-black border-b border-white/5 py-8 overflow-hidden z-20">
      <div className="flex animate-ticker whitespace-nowrap items-center w-max">
        {brands.map((brand, index) => (
          <div key={`${brand.name}-${index}`} className="flex items-center mx-8 md:mx-12 flex-shrink-0">
            <img
              src={brand.path}
              alt={brand.name}
              className="h-8 md:h-12 w-auto object-contain opacity-40 hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};