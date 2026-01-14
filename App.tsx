import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandTicker } from './components/BrandTicker';
import { Expertise } from './components/Expertise';
import { Work } from './components/Work';
import { Manifesto } from './components/Manifesto';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { LegalModal } from './components/LegalModal';

function App() {
  const [showLegal, setShowLegal] = useState(false);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <BrandTicker />
        <Expertise />
        <Work />
        <Manifesto />
        <About />
        <Contact />
      </main>
      <Footer onOpenLegal={() => setShowLegal(true)} />

      <AnimatePresence>
        {showLegal && <LegalModal onClose={() => setShowLegal(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;