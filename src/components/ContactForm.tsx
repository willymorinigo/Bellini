import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactMessage } from '../types';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sending network request (500ms response time)
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // Reset form fields
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      // Clear after 6 seconds
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 1200);
  };

  return (
    <section id="contacto" className="relative py-24 md:py-32 bg-[#0d0d0d] overflow-hidden">
      {/* Structural accent background lines */}
      <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20">
          <span className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 uppercase block mb-3">
            CONEXIÓN PREFERENTE
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-white font-light leading-none">
            Establece el <span className="silver-text italic font-normal">Contacto</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-gradient-to-r from-zinc-500 to-transparent mt-6"></div>
        </div>

        {/* Content Split: 2 Column details/form layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" id="contact-panel-grid">
          
          {/* Column 1: Studio Info details cards (5 cols) */}
          <div className="lg:col-span-5 space-y-8" id="contact-meta-column">
            
            <div className="bg-[#111111] border border-white/5 p-8 relative overflow-hidden" id="contact-info-block">
              {/* Silver horizontal thin border */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-zinc-600 via-white to-zinc-600"></div>

              <span className="font-serif text-2xl font-light text-white tracking-wider block mb-6">
                BELLINI odontología
              </span>

              <div className="space-y-6 pt-2">
                {/* 1. Address card */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-zinc-950 border border-white/5 text-zinc-400 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase block mb-0.5">
                      Dirección del Estudio
                    </span>
                    <p className="font-sans text-xs text-zinc-300 leading-relaxed font-light">
                      Av. Alvear 1920, Piso 3<br />
                      Recoleta, Ciudad Autónoma de Buenos Aires, Argentina.
                    </p>
                  </div>
                </div>

                {/* 2. Phone card */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-zinc-950 border border-white/5 text-zinc-400 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase block mb-0.5">
                      Línea Directa / WhatsApp
                    </span>
                    <p className="font-sans text-xs text-zinc-300 leading-relaxed font-light">
                      <a href="tel:+541148049900" className="hover:text-white transition-colors block">
                        +54 11 4804 9900 (Fijo)
                      </a>
                      <a href="https://wa.me/5491155667788" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block text-zinc-400 mt-1">
                        +54 9 11 5566 7788 (WhatsApp VIP)
                      </a>
                    </p>
                  </div>
                </div>

                {/* 3. Email card */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-zinc-950 border border-white/5 text-zinc-400 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase block mb-0.5">
                      Contacto Digital
                    </span>
                    <p className="font-sans text-xs text-zinc-300 leading-relaxed font-light">
                      <a href="mailto:recepcion@belliniodontologia.com" className="hover:text-white transition-colors">
                        recepcion@belliniodontologia.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* 4. Hours representation */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-zinc-950 border border-white/5 text-zinc-400 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase block mb-0.5">
                      Horarios de Atención
                    </span>
                    <p className="font-sans text-xs text-zinc-300 leading-relaxed font-light">
                      Lunes a Viernes: 09:00 - 19:00 hs<br />
                      Sábados: 09:00 - 13:00 hs <span className="text-zinc-500">(Urgencias programadas únicamente)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Standard badge */}
            <div className="border border-white/5 p-6 bg-zinc-950/20 flex gap-4 items-center">
              <ShieldAlert className="w-5 h-5 text-zinc-400 flex-shrink-0" />
              <p className="font-sans text-[11px] text-zinc-500 leading-relaxed font-light">
                * Para consultas de urgencia postquirúrgica fuera de horario comercial, los pacientes activos disponen de asistencia telefónica médica garantizada 24/7 mediante su PIN de atención.
              </p>
            </div>

          </div>

          {/* Column 2: Elegant Form Block (7 cols) */}
          <div className="lg:col-span-7 bg-[#111111] p-8 md:p-10 border border-white/10 relative" id="contact-form-block">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block mb-4">
                    Formulario Integrado de Consultas directas
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="font-sans text-[10px] uppercase tracking-widest text-zinc-400 font-medium block">
                        Nombre completo *
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ej. Martín Soler"
                        className="w-full bg-zinc-950 border border-white/5 text-white font-sans text-xs p-4 rounded-none focus:outline-none silver-border-glow focus:border-zinc-500"
                        id="contact-input-name"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="font-sans text-[10px] uppercase tracking-widest text-zinc-400 font-medium block">
                        Celular de contacto *
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+54 9 11 ..."
                        className="w-full bg-zinc-950 border border-white/5 text-white font-sans text-xs p-4 rounded-none focus:outline-none silver-border-glow focus:border-zinc-500"
                        id="contact-input-phone"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="font-sans text-[10px] uppercase tracking-widest text-zinc-400 font-medium block">
                        Correo electrónico *
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ejemplo@correo.com"
                        className="w-full bg-zinc-950 border border-white/5 text-white font-sans text-xs p-4 rounded-none focus:outline-none silver-border-glow focus:border-zinc-500"
                        id="contact-input-email"
                      />
                    </div>

                    {/* Subject line selector mock */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="font-sans text-[10px] uppercase tracking-widest text-zinc-400 font-medium block">
                        Asunto de la Consulta *
                      </label>
                      <input
                        required
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Ej. Consulta sobre Carillas de Porcelana"
                        className="w-full bg-zinc-950 border border-white/5 text-white font-sans text-xs p-4 rounded-none focus:outline-none silver-border-glow focus:border-zinc-500"
                        id="contact-input-subject"
                      />
                    </div>

                    {/* Message Box */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="font-sans text-[10px] uppercase tracking-widest text-zinc-400 font-medium block">
                        Mensaje / Comentario de Interés *
                      </label>
                      <textarea
                        required
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Redacta en detalle tu necesidad..."
                        className="w-full bg-zinc-950 border border-white/5 text-white font-sans text-xs p-4 rounded-none focus:outline-none silver-border-glow focus:border-zinc-500 resize-none animate-none"
                      />
                    </div>
                  </div>

                  {/* Submission CTA bar */}
                  <div className="pt-6 border-t border-white/5 flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 silver-border text-white font-sans text-xs font-semibold uppercase tracking-[0.22em] hover:bg-white hover:text-black transition-all cursor-pointer rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                      id="contact-submit-btn"
                    >
                      {isLoading ? (
                        <span>Enviando...</span>
                      ) : (
                        <>
                          <span>Enviar Mensaje</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 flex flex-col items-center justify-center text-center space-y-4"
                  id="contact-success-panel"
                >
                  <div className="w-16 h-16 bg-white/5 border border-white/10 text-white flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                    <CheckCircle2 className="w-8 h-8 text-white scale-110" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-white font-light tracking-wide">
                      Mensaje Enviado con Éxito
                    </h3>
                    <p className="font-sans text-xs text-zinc-400 font-light max-w-sm mx-auto leading-relaxed">
                      Gracias por contactarte con BELLINI. Un asistente de consejería preferente procesará tu mensaje y se pondrá en contacto en un plazo menor a 2 horas hábiles.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all text-stone-400 hover:text-white font-sans text-[10px] uppercase tracking-widest rounded-none cursor-pointer"
                      id="reset-contact-form-btn"
                    >
                      Enviar otra Consulta
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>

        </div>

      </div>
    </section>
  );
}
