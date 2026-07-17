import React, { useState, useRef, useEffect } from 'react';
import { Eye, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CLINIC_CASES } from '../data';

export default function BeforeAfterCases() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCase = CLINIC_CASES[activeCaseIndex];

  // Handle Dragging calculations
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <section id="casos" className="relative py-24 md:py-32 bg-stone-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 uppercase block mb-3">
              CASOS DE ÉXITO ESTÉTICO
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-white font-light leading-none">
              Arquitectura de<br />
              <span className="silver-text italic font-normal">Sonrisas Reales.</span>
            </h2>
            <div className="w-20 h-[1.5px] bg-gradient-to-r from-zinc-500 to-transparent mt-6"></div>
          </div>
          
          {/* Case Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-4" id="cases-selector-tabs">
            {CLINIC_CASES.map((clinicalCase, idx) => (
              <button
                key={clinicalCase.id}
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50); // reset slider to center
                }}
                className={`px-5 py-3 text-[11px] font-sans font-medium uppercase tracking-[0.2em] transition-all duration-300 rounded-none cursor-pointer ${
                  idx === activeCaseIndex
                    ? 'silver-border text-white'
                    : 'bg-transparent text-gray-400 hover:text-white border border-white/10 hover:border-white/30'
                }`}
                id={`case-tab-${idx}`}
              >
                {clinicalCase.category}
              </button>
            ))}
          </div>
        </div>

        {/* Case Comparison Grid Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="cases-comparison-grid">
          
          {/* 1. Left Description Panel */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1" id="case-text-details">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCase.id}
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 25 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1 text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  {activeCase.category}
                </div>
                
                <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-wide font-light leading-snug">
                  {activeCase.title}
                </h3>
                
                <p className="font-sans text-sm text-zinc-400 font-light leading-relaxed">
                  {activeCase.description}
                </p>

                {/* Key Case Indicators */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                  {activeCase.stats?.map((stat, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase block">
                        {stat.label}
                      </span>
                      <span className="font-sans text-sm md:text-base font-semibold text-white">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-3 bg-neutral-900/40 border border-white/5 p-4 mt-6">
                  <CheckCircle2 className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
                  <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed">
                    Sometido a rigurosos controles de oclusión dinámicos asistidos por computadora para garantizar confort y durabilidad en el tiempo.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 2. Interactive Comparison Slider Container (Right Hand Panel) */}
          <div className="lg:col-span-7 order-1 lg:order-2" id="comparison-slider-wrapper">
            <div className="relative border border-white/15 p-2 bg-neutral-950/20 shadow-2xl">
              
              {/* Outer Slider Wrapper */}
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
                className="relative aspect-4/3 w-full overflow-hidden select-none cursor-ew-resize rounded-none"
                style={{ touchAction: 'none' }}
                id="interactive-drag-canvas"
              >
                {/* AFTER image (Underneath / Static Background) */}
                <img
                  src={activeCase.afterUrl}
                  alt="Resultado del tratamiento"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover filter grayscale"
                  draggable={false}
                />
                
                <div className="absolute right-4 bottom-4 z-20 pointer-events-none">
                  <span className="font-mono text-[10px] tracking-widest text-white uppercase bg-black/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 font-medium">
                    DESPUÉS
                  </span>
                </div>

                {/* BEFORE image (Absolute Top, Width bounded by sliderPosition) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden z-10 pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={activeCase.beforeUrl}
                    alt="Estado dental previo"
                    referrerPolicy="no-referrer"
                    className="absolute inset-y-0 left-0 h-full w-auto object-cover max-w-none filter grayscale"
                    style={{ 
                      width: containerRef.current ? containerRef.current.offsetWidth : '100%',
                      height: containerRef.current ? containerRef.current.offsetHeight : '100%',
                    }}
                    draggable={false}
                  />
                </div>
                
                <div className="absolute left-4 bottom-4 z-20 pointer-events-none">
                  <span className="font-mono text-[10px] tracking-widest text-[#eeeeee]/90 uppercase bg-zinc-950/80 backdrop-blur-sm border border-white/5 px-3 py-1.5 font-light">
                    ANTES
                  </span>
                </div>

                {/* Sliding separator handle bar */}
                <div
                  className="absolute inset-y-0 z-20 pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute inset-y-0 -left-[1.5px] w-[3px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] flex items-center justify-center">
                    {/* Floating circular controller handle */}
                    <div className="w-10 h-10 -ml-[5px] bg-white border border-black/20 text-zinc-950 shadow-2xl flex items-center justify-center rounded-full transform hover:scale-110 pointer-events-auto cursor-grab active:cursor-grabbing">
                      <ArrowLeftRight className="w-4 h-4 text-zinc-900 pointer-events-none animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Instructions alert message */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-black/70 backdrop-blur-[2px] border border-white/10 px-4 py-2 flex items-center gap-1.5 animate-bounce">
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-sans text-[9px] tracking-wider text-zinc-300 uppercase font-light">
                    Arrastra el centro para comparar
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
