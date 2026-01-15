import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { Expertise } from './components/Expertise';
import { Work } from './components/Work';
import { Manifesto } from './components/Manifesto';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Preloader } from './components/Preloader';
import { Footer } from './components/Footer';
import { Cursor } from './components/ui/Cursor';
import { AmbientBackground } from './components/ui/AmbientBackground';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <Cursor />
      <AmbientBackground />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className={`bg-transparent min-h-screen text-white selection:bg-white selection:text-black overflow-x-hidden relative transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar onOpenContact={() => setIsContactOpen(true)} />
        
        {/* Main Content Wrapper - needs margin-bottom to reveal fixed footer */}
        <div className="main-content-wrapper relative z-10 bg-shield-black shadow-[0_50px_100px_rgb(0,0,0)]">
          <Hero />
          <Ticker />
          <Expertise />
          <Work />
          <Manifesto />
          <About />
          <Contact 
            isOpen={isContactOpen} 
            onClose={() => setIsContactOpen(false)}
            onOpen={() => setIsContactOpen(true)}
          />
        </div>
        
        {/* Footer sits fixed behind the main content wrapper */}
        <Footer />
      </div>
    </>
  );
};

export default App;