import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HERO_SLIDER_IMAGES } from '../data';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleNext();
    }, 7000); // 7 seconds slide intervals
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentSlide]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDER_IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === HERO_SLIDER_IMAGES.length - 1 ? 0 : prev + 1));
  };

  const handleSelectSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const handleScrollDown = () => {
    const philosophySec = document.getElementById('filosofia');
    if (philosophySec) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = philosophySec.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 },
        scale: { duration: 1.2, ease: 'easeOut' }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 }
      }
    })
  };

  return (
    <section id="inicio" className="relative h-screen w-full bg-black overflow-hidden select-none">
      {/* Silver Chrome Overlay Shimmer across entire Hero element */}
      <div className="absolute inset-x-0 top-0 h-1 z-20 background-shimmer opacity-30"></div>

      {/* Slide Visuals */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* Monochromatic Treatment Overlay */}
            <div className="absolute inset-0 bg-neutral-950/40 z-10"></div>
            {/* Subtle Silver Gradient overlay to enrich lights */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-black/80 z-10"></div>
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10"></div>

            <img
              src={HERO_SLIDER_IMAGES[currentSlide].url}
              alt={HERO_SLIDER_IMAGES[currentSlide].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter grayscale contrast-125 saturate-50 brightness-75 scale-100 transition-all duration-[7000ms] ease-out"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Copy Content Overlays */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl mt-12 md:mt-0">
          {/* Subtle metadata tag */}
          <motion.div
            key={`meta-${currentSlide}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-[1px] bg-white/40"></span>
            <span className="font-mono text-[9px] tracking-[0.3em] text-zinc-400 uppercase">
              {HERO_SLIDER_IMAGES[currentSlide].meta}
            </span>
          </motion.div>

          {/* Large Elegant Brand Representation (Didot look) */}
          <div className="mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-container-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col">
                  {currentSlide === 0 ? (
                    <>
                      <h1 className="didot-logo text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.25em] font-light silver-text leading-none">
                        {HERO_SLIDER_IMAGES[currentSlide].title}
                      </h1>
                      <div className="text-left pl-2 md:pl-4">
                        <span className="gotham-sub text-xs sm:text-sm md:text-base text-zinc-300 mt-2 block">
                          {HERO_SLIDER_IMAGES[currentSlide].subtitle}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.1em] font-light silver-text leading-tight uppercase">
                        {HERO_SLIDER_IMAGES[currentSlide].title}
                      </h2>
                      <span className="font-mono text-xs md:text-sm tracking-[0.3em] font-light text-zinc-400 uppercase mt-1 block">
                        {HERO_SLIDER_IMAGES[currentSlide].subtitle}
                      </span>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Description line */}
          <motion.p
            key={`desc-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-sans text-sm md:text-base text-zinc-300 font-light leading-relaxed mb-8 max-w-lg"
          >
            {HERO_SLIDER_IMAGES[currentSlide].description}
          </motion.p>

          {/* Quick interactive buttons in Hero */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#agendar"
              className="px-8 py-3.5 silver-border text-white font-sans text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 hover:bg-white hover:text-black cursor-pointer"
              id="hero-reserve-cta"
            >
              Agenda de Turnos
            </a>
            <a
              href="#servicios"
              className="px-8 py-3.5 bg-transparent text-white font-sans text-xs font-medium uppercase tracking-[0.25em] transition-all duration-300 hover:bg-white/10 border border-white/20"
              id="hero-services-cta"
            >
              Ver Especialidades
            </a>
          </motion.div>
        </div>
      </div>

      {/* Horizontal Nav Arrows (Subtle silver icons) */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 border border-white/10 hover:border-white/30 bg-black/30 hover:bg-black/60 backdrop-blur-sm text-zinc-400 hover:text-white transition-all cursor-pointer rounded-none group"
        aria-label="Anterior diapositiva"
        id="hero-prev-btn"
      >
        <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 border border-white/10 hover:border-white/30 bg-black/30 hover:bg-black/60 backdrop-blur-sm text-zinc-400 hover:text-white transition-all cursor-pointer rounded-none group"
        aria-label="Siguiente diapositiva"
        id="hero-next-btn"
      >
        <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      {/* Progress Block Indicators (Silver lines) */}
      <div className="absolute bottom-16 left-0 right-0 z-30 flex justify-center space-x-3">
        {HERO_SLIDER_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSelectSlide(index)}
            className="group relative py-2 focus:outline-none cursor-pointer"
            id={`slide-indicator-${index}`}
          >
            <div className="h-[2px] w-8 md:w-12 transition-all duration-300 relative bg-neutral-800">
              {index === currentSlide && (
                <motion.div
                  layoutId="activeBar"
                  className="absolute inset-0 bg-white"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
        <button
          onClick={handleScrollDown}
          className="text-zinc-500 hover:text-white flex flex-col items-center gap-1.5 transition-colors cursor-pointer group"
          id="scroll-indicator-btn"
        >
          <span className="font-mono text-[8px] tracking-[0.25em] uppercase font-light text-zinc-600 group-hover:text-zinc-400 transition-colors">
            Despliega
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-1 border border-zinc-800 group-hover:border-zinc-500 transition-colors rounded-full"
          >
            <ArrowDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
          </motion.div>
        </button>
      </div>
    </section>
  );
}
