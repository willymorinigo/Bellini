import { useState } from 'react';
import { Sparkles, ShieldCheck, Layers, Sun, Activity, Scissors, Calendar, Clock, Sparkle, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SPECIALTY_SERVICES } from '../data';
import { SpecialtyService } from '../types';

export default function SpecialtyServices() {
  const [selectedService, setSelectedService] = useState<SpecialtyService | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Sun':
        return <Sun className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5" />;
      default:
        return <Sparkle className="w-5 h-5" />;
    }
  };

  const handleScrollToBooking = () => {
    setSelectedService(null);
    const bookingSec = document.getElementById('agendar');
    if (bookingSec) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = bookingSec.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="servicios" className="relative py-24 md:py-32 bg-[#0d0d0d] overflow-hidden">
      {/* Decorative vertical silver-shimmer lines */}
      <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-12 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="mb-20">
          <span className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 uppercase block mb-3">
            ESPECIALIDADES DE ALTA GAMA
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-white font-light leading-none">
            Tratamientos<br />
            <span className="silver-text italic font-normal">Odontoestéticos de Élite.</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-gradient-to-r from-zinc-500 to-transparent mt-6"></div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-grid">
          {SPECIALTY_SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true, margin: '-50px' }}
              onClick={() => setSelectedService(service)}
              className="group relative bg-[#131313] border border-white/5 hover:border-white/20 p-8 cursor-pointer overflow-hidden transition-all duration-500 rounded-none flex flex-col justify-between h-[300px]"
              id={`service-card-${service.id}`}
            >
              {/* Internal absolute hover silver glow overlay */}
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-zinc-400 via-white to-zinc-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 bg-zinc-950 border border-white/10 text-white flex items-center justify-center group-hover:border-white/30 transition-colors duration-500">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors uppercase">
                    PROTOCOL {idx + 1}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-sans text-lg tracking-wider font-semibold text-white uppercase group-hover:text-zinc-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              {/* Read more button link */}
              <div className="pt-6 flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-zinc-400 group-hover:text-white transition-colors uppercase">
                <Info className="w-3 h-3 text-zinc-500" />
                <span>Explorar Protocolo</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Modal for selected service */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="service-modal-overlay">
              {/* Background Glass Overlayer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              />

              {/* Service Modal body panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="bg-zinc-950 border border-white/20 p-8 md:p-10 w-full max-w-2xl relative z-10 shadow-2xl overflow-y-auto max-h-[85vh] rounded-none"
                id="service-modal-content"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors focus:outline-none cursor-pointer"
                  aria-label="Cerrar modal"
                  id="close-modal-btn"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Title Block */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 text-white flex items-center justify-center flex-shrink-0">
                    {getIcon(selectedService.iconName)}
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block">
                      TRATAMIENTO EXCLUSIVO
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-white">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>

                {/* Specific Protocol Info */}
                <div className="space-y-6" id="service-protocol-body">
                  <div className="space-y-3">
                    <h4 className="font-sans text-xs tracking-widest font-semibold text-zinc-400 uppercase">
                      Descripción del Protocolo
                    </h4>
                    <p className="font-sans text-sm text-zinc-300 font-light leading-relaxed">
                      {selectedService.detailedDescription}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3 bg-white/5 p-4 border border-white/5">
                      <Clock className="w-5 h-5 text-zinc-400" />
                      <div>
                        <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase block">
                          Duración de Sesión
                        </span>
                        <span className="font-sans text-xs text-white font-medium">
                          {selectedService.duration}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white/5 p-4 border border-white/5">
                      <Sparkles className="w-5 h-5 text-zinc-400" />
                      <div>
                        <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase block">
                          Inversión Estimada
                        </span>
                        <span className="font-sans text-xs text-white font-medium">
                          {selectedService.priceRange}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Standard clinical note */}
                  <div className="bg-neutral-900 border-l border-zinc-500 p-4">
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                      * Nota del Dr. Bellini: Todos los tratamientos cosméticos se someten a un escaneo intraoral volumétrico previo para confirmar que no existan desbalances biocomecánicos u oclusales antes de iniciar la colocación definitiva.
                    </p>
                  </div>

                  {/* CTA Reserve Inside Modal */}
                  <div className="pt-6 flex justify-end">
                    <button
                      onClick={handleScrollToBooking}
                      className="inline-flex items-center gap-2 px-6 py-3.5 silver-border text-white font-sans text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all rounded-none cursor-pointer"
                      id="modal-booking-cta"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Solicitar Presupuesto Online
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
