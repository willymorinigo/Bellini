import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Filosofía', href: '#filosofia' },
    { label: 'Especialidades', href: '#servicios' },
    { label: 'Casos clínicos', href: '#casos' },
    { label: 'Agendar cita', href: '#agendar' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/85 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
            : 'bg-transparent border-b border-transparent py-5 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Elegant Brand Logo */}
            <a
              href="#inicio"
              onClick={(e) => handleNavClick(e, '#inicio')}
              className="flex flex-col items-center group cursor-pointer select-none"
              id="brand-logo"
            >
              <span className="didot-logo text-xl sm:text-2xl md:text-3xl silver-text font-light leading-none transition-all duration-300">
                BELLINI
              </span>
              <span className="gotham-sub text-[8px] sm:text-[9px] text-stone-400 mt-1 leading-none">
                odontología
              </span>
            </a>

            {/* Desktop Navigation Link Block */}
            <nav className="hidden lg:flex items-center space-x-8" id="desktop-nav">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-sans text-[11px] uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-colors duration-300 font-medium relative py-1 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* CTA action buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="#agendar"
                onClick={(e) => handleNavClick(e, '#agendar')}
                className="relative group overflow-hidden px-5 py-2.5 bg-transparent border border-white/20 hover:border-white transition-all duration-500 rounded-none text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-white flex items-center gap-2"
                id="header-cta-booking"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]"></div>
                <Calendar className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
                <span className="relative z-10">Agenda Online</span>
              </a>
            </div>

            {/* Mobile menu trigger button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-400 hover:text-white p-2 focus:outline-none transition-colors"
                aria-label="Alternar menú"
                id="mobile-menu-btn"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-zinc-950/95 backdrop-blur-lg border-b border-white/10 lg:hidden shadow-2xl overflow-hidden py-6 px-4"
            id="mobile-nav-menu"
          >
            <nav className="flex flex-col space-y-4 my-2">
              {menuItems.map((item, index) => (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-sans text-xs uppercase tracking-[0.25em] text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 font-medium py-2.5 border-b border-white/5 flex items-center justify-between group"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 text-gray-400" />
                </motion.a>
              ))}

              <div className="pt-4">
                <a
                  href="#agendar"
                  onClick={(e) => handleNavClick(e, '#agendar')}
                  className="w-full flex items-center justify-center gap-2.5 bg-white text-black py-3.5 px-4 text-xs font-sans font-medium uppercase tracking-[0.25em] text-center hover:bg-zinc-200 transition-colors rounded-none"
                >
                  <Calendar className="w-4 h-4" />
                  AGENDAR MI TURNO ONLINE
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
