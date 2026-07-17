import { useState, useEffect } from 'react';
import { ArrowUp, MessageSquare, ShieldCheck, Heart, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom Elegant Section Components
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import Philosophy from './components/Philosophy';
import SpecialtyServices from './components/SpecialtyServices';
import BeforeAfterCases from './components/BeforeAfterCases';
import BookingSystem from './components/BookingSystem';
import ContactForm from './components/ContactForm';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate Scroll Progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      // 2. Toggle scroll to top visibility
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen bg-[#0c0c0c] text-[#eeeeee] flex flex-col font-sans selection:bg-white/10 selection:text-white" id="applet-viewport">
      
      {/* 1. Dynamic Top Scroll Progress Ribbon */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-zinc-600 via-white to-zinc-600 z-[100] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-line"
      />

      {/* 2. Top Glass Header */}
      <Header />

      {/* 3. Infinite Sections Wrapper */}
      <main className="flex-grow pt-0" id="main-scroller">
        
        {/* Fullscreen Hero Slide Showcase Section */}
        <HeroSlider />

        {/* Clinical-Artistic Philosophy Section */}
        <Philosophy />

        {/* Specialties and Treatmens Grid */}
        <SpecialtyServices />

        {/* Interactive Before & After cases */}
        <BeforeAfterCases />

        {/* Dynamic Scheduler */}
        <BookingSystem />

        {/* Contact panel */}
        <ContactForm />

      </main>

      {/* 4. Luxury Minimalist Studio Footer */}
      <footer className="bg-black border-t border-white/15 py-16 md:py-20 relative overflow-hidden" id="studio-footer">
        {/* Subtle decorative silver grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Logo brand & Address Grid Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5 items-center md:items-start">
            
            {/* Column A: Central Title representation */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
              <div className="flex flex-col items-center md:items-start">
                <span className="didot-logo text-3xl silver-text font-light leading-none">
                  BELLINI
                </span>
                <span className="gotham-sub text-[8px] text-stone-500 mt-1">
                  odontología
                </span>
              </div>
              <p className="font-sans text-xs text-zinc-500 font-light leading-relaxed max-w-sm">
                Odontología de alta categoría y rejuvenecimiento estético dental. Diseñando sonrisas que perduran, inspirando confianza en un entorno de confort absoluto.
              </p>
            </div>

            {/* Column B: Links Block */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
              <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase font-bold">
                Especialidades
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                <a href="#servicios" className="font-sans text-xs text-zinc-500 hover:text-white transition-colors font-light">Diseño de Sonrisa & Carillas</a>
                <a href="#servicios" className="font-sans text-xs text-zinc-500 hover:text-white transition-colors font-light">Implantes de Alta Gama</a>
                <a href="#servicios" className="font-sans text-xs text-zinc-500 hover:text-white transition-colors font-light">Ortodoncia Invisible Premium</a>
                <a href="#servicios" className="font-sans text-xs text-zinc-500 hover:text-white transition-colors font-light">Blanqueamiento Clínico</a>
              </div>
            </div>

            {/* Column C: Quality Disclosures label */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
              <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase font-bold">
                Acreditaciones CABA
              </span>
              <div className="space-y-3 font-sans text-xs text-zinc-500 font-light max-w-xs leading-relaxed">
                <p>Estudio habilitado por el Ministerio de Salud Pública de la Nación. Registro Sanitario N° 19.340/M.</p>
                <div className="flex items-center gap-2 text-zinc-400 pt-1 justify-center md:justify-start">
                  <ShieldCheck className="w-4 h-4 text-zinc-500" />
                  <span className="font-mono text-[9px] tracking-wider uppercase">Calidad Certificada ISO 9001</span>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright disclosures row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <span className="font-mono text-[9px] tracking-wider text-zinc-600 uppercase">
              &copy; {new Date().getFullYear()} BELLINI ODONTOLOGÍA. TODOS LOS DERECHOS RESERVADOS.
            </span>
            <div className="flex gap-6 font-mono text-[9px] tracking-wider text-zinc-600 uppercase">
              <a href="#filosofia" className="hover:text-zinc-400 transition-colors">Términos VIP</a>
              <span>&bull;</span>
              <a href="#contacto" className="hover:text-zinc-400 transition-colors">Privacidad de Fichas</a>
              <span>&bull;</span>
              <span className="text-zinc-600">Recoleta, ARG</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 5. Custom Floating Silver-Chrome WhatsApp & Travel-to-top Desk */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3" id="floating-preference-panel">
        
        {/* Elegant Minimalist WhatsApp Anchor */}
        <a
          href="https://wa.me/5491155667788"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-white text-zinc-950 border border-zinc-200 hover:border-black hover:bg-neutral-200 transition-all duration-300 shadow-2xl flex items-center justify-center cursor-pointer group relative"
          aria-label="Atención por WhatsApp"
          id="floating-wa-btn"
        >
          {/* Custom micro tooltip */}
          <span className="absolute right-14 top-1/2 -transparent -translate-y-1/2 bg-zinc-900 text-white font-mono text-[9px] tracking-widest uppercase border border-white/10 py-1.5 px-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 pointer-events-none">
            Asistencia VIP Whatsapp
          </span>
          <MessageSquare className="w-5 h-5 text-zinc-950 transition-transform group-hover:scale-110" />
        </a>

        {/* Smooth Scroll up desk arrow */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              onClick={handleScrollTop}
              className="w-12 h-12 bg-zinc-900 text-white border border-white/10 hover:border-white/30 hover:bg-zinc-800 transition-all duration-300 shadow-2xl flex items-center justify-center cursor-pointer group"
              aria-label="Volver arriba"
              id="floating-top-btn"
            >
              <ArrowUp className="w-4 h-4 text-zinc-300 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
        
      </div>

    </div>
  );
}
