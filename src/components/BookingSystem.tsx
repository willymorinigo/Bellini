import React, { useState, useEffect } from 'react';
import { Calendar, User, Clock, CheckCircle2, AlertCircle, ShoppingBag, X, CalendarCheck, MapPin, Copy, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SPECIALTY_SERVICES, TEAM_MEMBERS } from '../data';
import { Appointment } from '../types';

export default function BookingSystem() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Patient form
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  
  // Storage & State
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);
  const [isCopiedId, setIsCopiedId] = useState<string | null>(null);
  const [recentBooking, setRecentBooking] = useState<Appointment | null>(null);

  // Generate next 10 business days dynamically starting from 2026-06-02
  const [availableDays, setAvailableDays] = useState<{ dateString: string; dayLabel: string; dayNum: string; monthLabel: string }[]>([]);

  useEffect(() => {
    // Read from localStorage on mount
    const saved = localStorage.getItem('bellini_appointments');
    if (saved) {
      try {
        setMyAppointments(JSON.parse(saved));
      } catch (err) {
        console.error('Error loading appointments:', err);
      }
    }

    // Generate Business Days starting 2026-06-02 (Martes)
    const days = [];
    const baseDate = new Date('2026-06-02T12:00:00');
    let generatedCount = 0;
    
    // Day names and month names in Spanish
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const monthNames = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];

    for (let i = 0; generatedCount < 8; i++) {
      const tempDate = new Date(baseDate);
      tempDate.setDate(baseDate.getDate() + i);
      
      const dayOfWeek = tempDate.getDay();
      
      // Skip Sundays (0)
      if (dayOfWeek !== 0) {
        const year = tempDate.getFullYear();
        const month = String(tempDate.getMonth() + 1).padStart(2, '0');
        const dayNum = String(tempDate.getDate()).padStart(2, '0');
        
        days.push({
          dateString: `${year}-${month}-${dayNum}`,
          dayLabel: dayNames[dayOfWeek],
          dayNum: String(tempDate.getDate()),
          monthLabel: monthNames[tempDate.getMonth()]
        });
        generatedCount++;
      }
    }
    
    setAvailableDays(days);
    // Auto preset first available day
    if (days.length > 0) {
       setSelectedDate(days[0].dateString);
    }
  }, []);

  // Preset hours for slots
  const timeSlots = [
    { time: '09:00', label: '09:00 AM', status: 'available' },
    { time: '10:00', label: '10:00 AM', status: 'available' },
    { time: '11:00', label: '11:00 AM', status: 'reserved' },
    { time: '12:00', label: '12:00 PM', status: 'available' },
    { time: '14:30', label: '02:30 PM', status: 'available' },
    { time: '15:30', label: '03:30 PM', status: 'available' },
    { time: '16:30', label: '04:30 PM', status: 'reserved' },
    { time: '17:30', label: '05:30 PM', status: 'available' },
    { time: '18:30', label: '06:30 PM', status: 'available' }
  ];

  const handleNextStep = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && !selectedSpecialist) return;
    if (step === 3 && (!selectedDate || !selectedTime)) return;
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedSpecialist || !selectedDate || !selectedTime || !patientName || !patientEmail || !patientPhone) {
      alert('Por favor complete todos los datos requeridos.');
      return;
    }

    const serviceObj = SPECIALTY_SERVICES.find(s => s.id === selectedService);
    const specialistObj = TEAM_MEMBERS.find(t => t.id === selectedSpecialist);

    const newApp: Appointment = {
      id: 'BEL-' + Math.floor(100000 + Math.random() * 900000),
      serviceId: selectedService,
      serviceTitle: serviceObj?.title || selectedService,
      specialistId: selectedSpecialist,
      specialistName: specialistObj?.name || selectedSpecialist,
      date: selectedDate,
      time: selectedTime,
      patientName,
      patientEmail,
      patientPhone,
      notes: patientNotes,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    const updated = [newApp, ...myAppointments];
    setMyAppointments(updated);
    localStorage.setItem('bellini_appointments', JSON.stringify(updated));
    setRecentBooking(newApp);
    setStep(5); // Receipt Step
  };

  const handleCancelAppointment = (id: string) => {
    if (confirm('¿Está seguro de que desea cancelar este turno? Esta acción no se puede deshacer.')) {
      const filtered = myAppointments.filter(app => app.id !== id);
      setMyAppointments(filtered);
      localStorage.setItem('bellini_appointments', JSON.stringify(filtered));
      if (recentBooking?.id === id) {
        setRecentBooking(null);
      }
    }
  };

  const handleCopyCode = (id: string) => {
    navigator.clipboard.writeText(id);
    setIsCopiedId(id);
    setTimeout(() => setIsCopiedId(null), 3000);
  };

  const resetScheduler = () => {
    setStep(1);
    setSelectedService('');
    setSelectedSpecialist('');
    setSelectedTime('');
    setPatientName('');
    setPatientEmail('');
    setPatientPhone('');
    setPatientNotes('');
    setRecentBooking(null);
  };

  const activeService = SPECIALTY_SERVICES.find(s => s.id === selectedService);
  const activeSpecialist = TEAM_MEMBERS.find(t => t.id === selectedSpecialist);

  return (
    <section id="agendar" className="relative py-24 md:py-32 bg-stone-950 overflow-hidden">
      {/* Background radial soft light to simulate silver glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.015] blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Area */}
        <div className="mb-20 text-center">
          <span className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 uppercase block mb-3">
            AGENDAMIENTO EN TIEMPO REAL
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-white font-light leading-none">
            Reserva tu Espacio <span className="silver-text italic font-normal">Online</span>
          </h2>
          <p className="font-sans text-xs text-zinc-400 max-w-md mx-auto mt-4 font-light uppercase tracking-wider">
            Planifica tu visita mediante nuestro conserje inteligente de reservas cronometradas. Elige tu especialista y horario.
          </p>
          <div className="w-16 h-[1px] bg-zinc-600 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="booking-grid-rows">
          
          {/* Main Booking Stepper Block */}
          <div className="lg:col-span-8 bg-[#111111] border border-white/10 p-6 sm:p-8 md:p-10 relative silver-glow" id="booking-master-stepper">
            {/* Step indicators */}
            {step < 5 && (
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5" id="step-indicators">
                {[
                  { num: 1, label: 'Especialidad' },
                  { num: 2, label: 'Especialista' },
                  { num: 3, label: 'Fecha y Hora' },
                  { num: 4, label: 'Paciente' }
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 flex items-center justify-center text-xs font-mono border transition-all duration-300 ${
                        step >= s.num
                          ? 'bg-white text-black border-white'
                          : 'bg-transparent text-zinc-600 border-zinc-800'
                      }`}
                    >
                      {s.num}
                    </div>
                    <span
                      className={`hidden sm:inline font-sans text-[10px] uppercase tracking-widest ${
                        step === s.num ? 'text-white font-medium' : 'text-zinc-500 font-light'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* STEP 1: Select Service */}
            {step === 1 && (
              <div className="space-y-6" id="booking-step-1">
                <h3 className="font-sans text-xs tracking-widest font-semibold text-zinc-400 uppercase flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-zinc-500" />
                  Paso 1: Selecciona la Especialidad
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SPECIALTY_SERVICES.map((serv) => (
                    <div
                      key={serv.id}
                      onClick={() => setSelectedService(serv.id)}
                      className={`p-5 border cursor-pointer transition-all duration-300 flex flex-col justify-between h-[130px] rounded-none group select-none ${
                        selectedService === serv.id
                          ? 'bg-white/10 border-white text-white'
                          : 'bg-zinc-950/40 border-white/5 text-zinc-400 hover:border-white/20 hover:text-white'
                      }`}
                      id={`booking-service-choice-${serv.id}`}
                    >
                      <div>
                        <h4 className="font-sans text-sm tracking-wide font-medium uppercase text-white group-hover:text-white transition-colors">
                          {serv.title}
                        </h4>
                        <p className="font-sans text-[11px] text-zinc-400 font-light leading-relaxed mt-2 line-clamp-2">
                          {serv.shortDescription}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="font-mono text-[9px] text-zinc-400 uppercase">
                          {serv.duration}
                        </span>
                        {selectedService === serv.id && (
                          <span className="w-2 h-2 rounded-full bg-white"></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-6 border-t border-white/5">
                  <button
                    disabled={!selectedService}
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-white text-black font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-200 cursor-pointer rounded-none flex items-center gap-2"
                    id="booking-service-next-btn"
                  >
                    Siguiente
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Choose Specialist */}
            {step === 2 && (
              <div className="space-y-6" id="booking-step-2">
                <h3 className="font-sans text-xs tracking-widest font-semibold text-zinc-400 uppercase flex items-center gap-2">
                  <User className="w-4 h-4 text-zinc-500" />
                  Paso 2: Confirma el Especialista Médico
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TEAM_MEMBERS.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedSpecialist(doc.id)}
                      className={`border cursor-pointer transition-all duration-300 rounded-none overflow-hidden flex flex-col p-4 group select-none ${
                        selectedSpecialist === doc.id
                          ? 'bg-white/10 border-white text-white'
                          : 'bg-zinc-950/40 border-white/5 text-zinc-400 hover:border-white/20 hover:text-white'
                      }`}
                      id={`booking-doc-choice-${doc.id}`}
                    >
                      <div className="aspect-[5/6] w-full bg-zinc-900 border border-white/5 relative overflow-hidden mb-4">
                        <img
                          src={doc.avatarUrl}
                          alt={doc.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover filter grayscale contrast-110 saturate-0 hover:scale-105 transition-all duration-500"
                        />
                        {selectedSpecialist === doc.id && (
                          <div className="absolute top-2 right-2 bg-white text-black p-1 text-xs">
                            <CheckCircle2 className="w-4 h-4 text-neutral-950" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-sans text-xs tracking-wide font-semibold uppercase text-white">
                          {doc.name}
                        </h4>
                        <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase block">
                          {doc.role}
                        </span>
                        <p className="font-sans text-[10px] text-zinc-400 font-light leading-relaxed pt-2 border-t border-white/5 line-clamp-3">
                          {doc.education}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-6 border-t border-white/5">
                  <button
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-white/20 text-white font-sans text-xs font-medium uppercase tracking-[0.2em] hover:bg-white/5 transition-all cursor-pointer rounded-none flex items-center gap-2"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Atrás
                  </button>
                  <button
                    disabled={!selectedSpecialist}
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-white text-black font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-200 cursor-pointer rounded-none flex items-center gap-2"
                    id="booking-doc-next-btn"
                  >
                    Siguiente
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Select Date & Time */}
            {step === 3 && (
              <div className="space-y-8" id="booking-step-3">
                <h3 className="font-sans text-xs tracking-widest font-semibold text-zinc-400 uppercase flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-zinc-500" />
                  Paso 3: Selecciona Fecha y Horario
                </h3>

                {/* Horizontal Date picker */}
                <div className="space-y-3">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 font-semibold block">
                    Fechas Disponibles (Próximos días hábiles)
                  </span>
                  
                  <div className="flex gap-2 overflow-x-auto pb-4 pt-1" id="business-date-scroller">
                    {availableDays.map((day) => (
                      <button
                        key={day.dateString}
                        onClick={() => setSelectedDate(day.dateString)}
                        className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 border transition-all duration-300 rounded-none cursor-pointer ${
                          selectedDate === day.dateString
                            ? 'bg-white text-black border-white'
                            : 'bg-zinc-950/40 border-white/5 text-zinc-400 hover:border-white/20'
                        }`}
                        id={`date-badge-${day.dateString}`}
                      >
                        <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">
                          {day.dayLabel}
                        </span>
                        <span className="font-sans text-lg font-bold my-1">
                          {day.dayNum}
                        </span>
                        <span className="font-sans text-[8px] tracking-wider text-zinc-400 uppercase">
                          {day.monthLabel}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots Area */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 font-semibold block">
                      Horarios Disponibles para esta Fecha
                    </span>
                    <span className="font-mono text-[8.5px] text-zinc-500 uppercase">
                      Zona Horaria Local (GMT-3)
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {timeSlots.map((slot) => {
                      const isReserved = slot.status === 'reserved';
                      return (
                        <button
                          key={slot.time}
                          disabled={isReserved}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`py-3 text-xs font-mono border transition-all duration-300 rounded-none cursor-pointer text-center ${
                            isReserved
                              ? 'bg-zinc-900 border-white/0 text-zinc-700 cursor-not-allowed line-through'
                              : selectedTime === slot.time
                              ? 'bg-white text-black border-white font-semibold'
                              : 'bg-zinc-950/60 border-white/5 text-zinc-300 hover:border-white/20'
                          }`}
                          id={`time-slot-${slot.time}`}
                        >
                          {slot.time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-white/5">
                  <button
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-white/20 text-white font-sans text-xs font-medium uppercase tracking-[0.2em] hover:bg-white/5 transition-all cursor-pointer rounded-none flex items-center gap-2"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Atrás
                  </button>
                  <button
                    disabled={!selectedDate || !selectedTime}
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-white text-black font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-200 cursor-pointer rounded-none flex items-center gap-2"
                    id="booking-date-next-btn"
                  >
                    Siguiente
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Personal Details Form */}
            {step === 4 && (
              <form onSubmit={handleCreateAppointment} className="space-y-6" id="booking-step-4">
                <h3 className="font-sans text-xs tracking-widest font-semibold text-zinc-400 uppercase flex items-center gap-2">
                  <User className="w-4 h-4 text-zinc-500" />
                  Paso 4: Datos de Contacto del Paciente
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="font-sans text-[10px] uppercase tracking-widest text-zinc-400 font-medium block">
                      Nombre y Apellido *
                    </label>
                    <input
                      required
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Ej. Sofía Bellini"
                      className="w-full bg-zinc-950 border border-white/5 text-white font-sans text-sm p-4 rounded-none focus:outline-none silver-border-glow focus:border-zinc-500"
                      id="booking-input-name"
                    />
                  </div>
                  
                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="font-sans text-[10px] uppercase tracking-widest text-zinc-400 font-medium block">
                      Número de Teléfono / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="+54 9 11 2345 6789"
                      className="w-full bg-zinc-950 border border-white/5 text-white font-sans text-sm p-4 rounded-none focus:outline-none silver-border-glow focus:border-zinc-500"
                      id="booking-input-phone"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="font-sans text-[10px] uppercase tracking-widest text-zinc-400 font-medium block">
                      Dirección de Correo Electrónico *
                    </label>
                    <input
                      required
                      type="email"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      className="w-full bg-zinc-950 border border-white/5 text-white font-sans text-sm p-4 rounded-none focus:outline-none silver-border-glow focus:border-zinc-500"
                      id="booking-input-email"
                    />
                  </div>

                  {/* Notes Area */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="font-sans text-[10px] uppercase tracking-widest text-zinc-400 font-medium block">
                      Notas Clínicas / Síntomas / Solicitud Especial (Opcional)
                    </label>
                    <textarea
                      rows={3}
                      value={patientNotes}
                      onChange={(e) => setPatientNotes(e.target.value)}
                      placeholder="Cuéntanos brevemente sobre tus expectativas estéticas..."
                      className="w-full bg-zinc-950 border border-white/5 text-white font-sans text-sm p-4 rounded-none focus:outline-none silver-border-glow focus:border-zinc-500 resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-white/5">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-white/20 text-white font-sans text-xs font-medium uppercase tracking-[0.2em] hover:bg-white/5 transition-all cursor-pointer rounded-none flex items-center gap-2"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Atrás
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-white text-black font-sans text-xs font-semibold uppercase tracking-[0.22em] hover:bg-neutral-200 transition-all cursor-pointer rounded-none flex items-center gap-2 silver-glow"
                    id="booking-submit-final-btn"
                  >
                    Confirmar Cita Médica
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 5: Booking Receipt Ticket */}
            {step === 5 && recentBooking && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
                id="booking-step-5"
              >
                {/* Visual success notice */}
                <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
                  <div className="w-16 h-16 bg-white/5 border border-white/20 text-white flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <Check className="w-8 h-8 text-white scale-125" />
                  </div>
                  <div>
                    <h3 className="font-serif text-3xl font-light text-white tracking-wide">
                      Cita Agendada Exitosamente
                    </h3>
                    <p className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase mt-2">
                      un correo electrónico con los detalles ha sido enviado
                    </p>
                  </div>
                </div>

                {/* Elegant Ticket Voucher Graphic representation */}
                <div className="relative bg-zinc-950 border border-white/10 p-6 md:p-8 rounded-none overflow-hidden" id="appointment-ticket">
                  {/* Decorative side ticket punch circles for luxury appearance */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#111111] border border-white/10 rounded-full z-10"></div>
                  <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#111111] border border-white/10 rounded-full z-10"></div>
                  <div className="absolute top-1/2 left-4 right-4 h-[1px] border-t border-dashed border-white/15"></div>

                  {/* Top section: Service, Doctor & Code */}
                  <div className="pb-8 grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 space-y-2">
                      <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase block">
                        ESTUDIO BELLINI — VOUCHER DE ATENCIÓN
                      </span>
                      <h4 className="font-sans text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                        {recentBooking.serviceTitle}
                      </h4>
                      <p className="font-sans text-xs text-zinc-400 font-light flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-zinc-500" />
                        Atención privada por: {recentBooking.specialistName}
                      </p>
                    </div>

                    <div className="md:col-span-4 md:text-end space-y-1">
                      <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase block">
                        CÓDIGO DE RESERVA
                      </span>
                      <button
                        onClick={() => handleCopyCode(recentBooking.id)}
                        className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-white hover:text-zinc-300 transition-colors bg-white/5 border border-white/10 py-1 px-3"
                        id="copy-code-receipt-btn"
                      >
                        {recentBooking.id}
                        {isCopiedId === recentBooking.id ? (
                          <Check className="w-3.5 h-3.5 text-zinc-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-zinc-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Bottom section: Logistics Date, slot, patient address */}
                  <div className="pt-8 grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-6 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <CalendarCheck className="w-4 h-4 text-zinc-400" />
                        <div>
                          <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase block">
                            Fecha Confirmada
                          </span>
                          <span className="font-sans text-xs text-white font-medium">
                            {recentBooking.date}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-zinc-400" />
                        <div>
                          <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase block">
                            Horario Seleccionado
                          </span>
                          <span className="font-sans text-xs text-white font-medium">
                            {recentBooking.time} hs
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-6 space-y-3 md:border-l md:border-white/5 md:pl-6">
                      <div className="flex items-center gap-2.5">
                        <User className="w-4 h-4 text-zinc-400" />
                        <div>
                          <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase block">
                            Paciente Guardado
                          </span>
                          <span className="font-sans text-xs text-white font-medium">
                            {recentBooking.patientName}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-zinc-400" />
                        <div>
                          <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase block">
                            Dirección de Atenciòn
                          </span>
                          <span className="font-sans text-[11px] text-zinc-400 font-light">
                            Av. Alvear 1920, Piso 3 — Recoleta, CABA.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important notices alert */}
                <div className="flex items-start gap-3 bg-white/5 border border-white/5 p-4">
                  <AlertCircle className="w-4 h-4 text-zinc-400 mt-0.5" />
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">
                    Por favor, asista 10 minutos antes para completar la ficha bucal digital. En caso de necesitar reagendar o cancelar la reserva, puede hacerlo directamente desde este portal con tu código o contactándonos al WhatsApp de atención premium.
                  </p>
                </div>

                {/* Buttons block */}
                <div className="flex flex-wrap gap-4 pt-4 justify-center">
                  <button
                    onClick={resetScheduler}
                    className="px-6 py-3 border border-white/20 text-white font-sans text-xs font-medium uppercase tracking-[0.2em] hover:bg-white/5 transition-all cursor-pointer rounded-none"
                    id="new-booking-btn"
                  >
                    Agendar para Otro Miembro
                  </button>
                  <a
                    href="#contacto"
                    className="px-6 py-3 bg-white text-black font-sans text-xs font-semibold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-all cursor-pointer rounded-none"
                  >
                    Ver Direcciones de Mapa
                  </a>
                </div>
              </motion.div>
            )}
          </div>

          {/* Persistent Sidebar displaying local storage booked appointments ("Mis Turnos") */}
          <div className="lg:col-span-4 space-y-6" id="bookings-sidebar-panel">
            <div className="bg-[#121212] border border-white/5 p-6 rounded-none">
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                <h3 className="font-sans text-xs tracking-widest font-semibold text-white uppercase flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-zinc-400" />
                  Mi Agenda ({myAppointments.length})
                </h3>
                <span className="font-mono text-[8.5px] bg-white/5 text-zinc-400 px-2 py-0.5 uppercase tracking-widest font-medium">
                  Persistido
                </span>
              </div>

              {myAppointments.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <AlertCircle className="w-8 h-8 text-zinc-600 mx-auto" />
                  <p className="font-sans text-xs text-zinc-500 font-light leading-relaxed">
                    Aún no cuentas con turnos reservados en este navegador. Completa el tutor de reservas para confirmar tu visita.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1" id="saved-appointments-list">
                  {myAppointments.map((app) => (
                    <div
                      key={app.id}
                      className="bg-zinc-950 border border-white/5 hover:border-white/10 p-4 transition-all space-y-3 relative group"
                      id={`saved-item-${app.id}`}
                    >
                      <button
                        onClick={() => handleCancelAppointment(app.id)}
                        className="absolute top-3 right-3 text-zinc-600 hover:text-white transition-colors cursor-pointer"
                        title="Cancelar turno"
                        id={`cancel-item-btn-${app.id}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="space-y-1 pr-6">
                        <span className="font-mono text-[8px] text-zinc-500 tracking-wider uppercase block">
                          REF: {app.id}
                        </span>
                        <h4 className="font-sans text-xs font-semibold text-white uppercase tracking-wider line-clamp-1">
                          {app.serviceTitle}
                        </h4>
                        <span className="font-sans text-[10px] text-zinc-400 block font-light">
                          Dentista: {app.specialistName}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-400">
                        <div>
                          <span className="text-zinc-600 block text-[8px] uppercase">FECHA</span>
                          <span>{app.date}</span>
                        </div>
                        <div>
                          <span className="text-zinc-600 block text-[8px] uppercase">HORA</span>
                          <span>{app.time} hs</span>
                        </div>
                      </div>

                      {/* Small copy button bar */}
                      <div className="flex justify-between items-center pt-1">
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono text-green-500">
                          <Check className="w-3 h-3" />
                          Confirmado
                        </span>
                        <button
                          onClick={() => handleCopyCode(app.id)}
                          className="text-[9px] font-mono text-zinc-500 hover:text-white transition-colors flex items-center gap-1 bg-white/5 px-2 py-1"
                          id={`copy-item-btn-${app.id}`}
                        >
                          {isCopiedId === app.id ? (
                            <>
                              <span>Copiado</span>
                              <Check className="w-2.5 h-2.5" />
                            </>
                          ) : (
                            <>
                              <span>Copiar</span>
                              <Copy className="w-2.5 h-2.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
