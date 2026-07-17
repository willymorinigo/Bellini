import { Sparkles, Shield, Heart, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export default function Philosophy() {
  const pillars = [
    {
      icon: <Sparkles className="w-5 h-5 text-gray-300" />,
      title: 'Bespoke Aesthetic Art',
      description: 'No formulamos sonrisas estandarizadas. Analizamos las líneas faciales, la dinámica de los labios y los tonos de la piel para esculpir dientes naturales y únicos.'
    },
    {
      icon: <Eye className="w-5 h-5 text-gray-300" />,
      title: 'Espacio Silencioso e Íntimo',
      description: 'Reservamos el gabinete exclusivamente para ti. Eliminamos las salas de espera saturadas y el ruido de consultorio para proveerte una experiencia de spa médico.'
    },
    {
      icon: <Shield className="w-5 h-5 text-gray-300" />,
      title: 'Odontología Libre de Metales',
      description: 'Priorizamos tu salud inmunológica. Solo implantamos zirconio de alta resistencia y cerámicas feldespáticas 100% biocompatibles que emulan el esmalte original.'
    },
    {
      icon: <Heart className="w-5 h-5 text-gray-300" />,
      title: 'Protocolo de Mínima Invasión',
      description: 'Preservamos al máximo el esmalte natural. Nos apoyamos en microscopía quirúrgica y modelados 3D digitales para intervenir solo el tejido estrictamente necesario.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="filosofia" className="relative py-24 md:py-32 bg-stone-950 overflow-hidden">
      {/* Decorative background grid elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dynamic header row split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-5">
            <span className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 uppercase block mb-3">
              FILOSOFÍA DEL ESTUDIO
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-white font-light leading-none">
              Inspirado en el Arte,<br />
              <span className="silver-text italic font-normal">Guiado por la Ciencia.</span>
            </h2>
            <div className="w-20 h-[1.5px] bg-gradient-to-r from-zinc-500 to-transparent mt-6"></div>
          </div>
          
          <div className="lg:col-span-7 pt-4">
            <p className="font-sans text-lg text-zinc-300 font-light leading-relaxed mb-6">
              En BELLINI odontología comprendemos que la salud y la estética bucal no son productos prefabricados. Rediseñamos el clásico concepto de consultorio odontológico para concebir un santuario de tratamiento exclusivo, donde la precisión médica se funde con el cuidado artístico y los silicios de última tecnología.
            </p>
            <p className="font-sans text-sm text-zinc-400 font-light leading-relaxed">
              Trabajamos exclusivamente bajo cita previa planificada. El ambiente se neutraliza cromáticamente con acabados en plata y grises mate, reduciendo los estímulos de ansiedad y transportándote a una experiencia de relajación total mientras rediseñamos la arquitectura de tu sonrisa.
            </p>
          </div>
        </div>

        {/* Pillars Staggered Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          id="pillars-grid"
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-zinc-900/30 backdrop-blur-sm border border-white/5 hover:border-white/15 p-8 transition-all duration-500 rounded-none hover:shadow-[0_10px_30px_rgba(255,255,255,0.02)] group flex flex-col justify-between h-full"
              id={`pillar-card-${idx}`}
            >
              <div>
                <div className="w-10 h-10 border border-zinc-800 bg-zinc-950 flex items-center justify-center mb-6 group-hover:border-zinc-500 transition-colors duration-300 relative">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {pillar.icon}
                </div>
                <h3 className="font-sans text-base tracking-wider font-semibold text-white mb-3 uppercase">
                  {pillar.title}
                </h3>
                <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              
              <div className="w-full h-[1px] bg-zinc-800 mt-6 group-hover:bg-zinc-500 transition-colors duration-500"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Studio quotes or metric ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 border-t border-b border-white/5 py-12 flex flex-col md:flex-row items-center justify-around gap-8 text-center md:text-left bg-neutral-950/20"
          id="metrics-ribbon"
        >
          <div>
            <span className="font-serif text-5xl font-light silver-text tracking-widest block mb-1">15+</span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-500 uppercase block">Años de Liderazgo Estético</span>
          </div>
          <div className="hidden md:block w-[1px] h-12 bg-white/10"></div>
          <div>
            <span className="font-serif text-5xl font-light silver-text tracking-widest block mb-1">1 a 1</span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-500 uppercase block">Protocolo de Exclusividad</span>
          </div>
          <div className="hidden md:block w-[1px] h-12 bg-white/10"></div>
          <div>
            <span className="font-serif text-5xl font-light silver-text tracking-widest block mb-1">0 Metal</span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-500 uppercase block">Biocompatibilidad Absoluta</span>
          </div>
          <div className="hidden md:block w-[1px] h-12 bg-white/10"></div>
          <div>
            <span className="font-serif text-5xl font-light silver-text tracking-widest block mb-1">100%</span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-500 uppercase block">Garantía Digital Previa</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
