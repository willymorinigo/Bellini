import { SpecialtyService, Specialist, CaseComparison } from './types';

export const HERO_SLIDER_IMAGES = [
  {
    id: 'lobby',
    url: '/src/assets/images/bellini_lobby_1780402454904.png',
    title: 'BELLINI',
    subtitle: 'ODONTOLOGÍA',
    description: 'Estudio de salud dental de alta categoría. Espacios diseñados para el bienestar absoluto, combinando el rigor clínico más estricto con el lujo de los detalles.',
    meta: 'FOTOGRAFÍA REAL DEL ESTUDIO — ACCENTOS EN PLATA Y DETALLES CRÓMICOS'
  },
  {
    id: 'clinic',
    url: '/src/assets/images/bellini_clinic_1780402470911.png',
    title: 'TECNOLOGÍA DE PUNTA',
    subtitle: 'DIAGNÓSTICO DIGITAL',
    description: 'Equipamiento de última generación y escaneo intraoral 3D para la planificación micrométrica de cirugías guiadas y estética reconstructiva.',
    meta: 'CABINETE DE ALTA GAMA — HIGIENE Y ESTERILIZACIÓN PREMIUM'
  },
  {
    id: 'detail',
    url: '/src/assets/images/bellini_detail_1780402487783.png',
    title: 'EL VALOR DEL DETALLE',
    subtitle: 'DISEÑO Y PRECISIÓN',
    description: 'Instrumental quirúrgico y materiales de estándar global. Cada tratamiento se concibe como una obra artesanal adaptada a la anatomía de tu boca.',
    meta: 'PLANO DETALLE — INSTRUMENTAL QUIRÚRGICO DE ACERO QUIRÚRGICO MATE'
  }
];

export const SPECIALTY_SERVICES: SpecialtyService[] = [
  {
    id: 'smile-design',
    title: 'Diseño de Sonrisa & Carillas',
    duration: '2 - 3 Sesiones',
    shortDescription: 'Restauraciones cerámicas ultrafinas para transformar la armonía, color y forma de tus dientes.',
    detailedDescription: 'Nuestro protocolo estrella combina carillas de porcelana feldespática alemana de solo 0.3mm de grosor con planificación digital. Ofrece un brillo natural impecable y nula invasión a la estructura dental original. Ideal para corregir color, espaciados (diastemas), desgastes y ligeras asimetrías.',
    priceRange: 'Estudio Personalizado previo',
    iconName: 'Sparkles'
  },
  {
    id: 'implants',
    title: 'Implantes Premium de Cirugía Guiada',
    duration: '45 - 60 minutos por fase',
    shortDescription: 'Sustitución de piezas dentales con implantes de marca internacional y coronas de zirconio.',
    detailedDescription: 'Utilizamos implantes de titanio puro y zirconio altamente biocompatibles (Marcas líderes: Straumann y Nobel Biocare). Mediante tomografía computada 3D y guías quirúrgicas impresas en resina médica, realizamos una colocación guiada por computadora, sin bisturí convencional, reduciendo al mínimo el postoperatorio.',
    priceRange: 'Sujeto a Tomografía guiada',
    iconName: 'ShieldCheck'
  },
  {
    id: 'invisible-orthodontics',
    title: 'Ortodoncia Invisible (Invisalign® Platinum)',
    duration: '6 - 18 Meses',
    shortDescription: 'Alineación dental discreta, cómoda y removible con tecnología de escaneo 3D Itero.',
    detailedDescription: 'Alineadores transparentes de última tecnología que actúan de forma secuencial y suave. Totalmente cómodos para hablar, removibles para comer e higienizar. Planificamos todo el movimiento biológico desde el día uno mediante software de simulación tridimensional para calcular el tiempo exacto del tratamiento.',
    priceRange: 'Plan de Tratamiento Digital completo',
    iconName: 'Layers'
  },
  {
    id: 'premium-whitening',
    title: 'Blanqueamiento Premium Combinado',
    duration: '1 Sesión Láser + Kit Boutique',
    shortDescription: 'Aclara hasta 4 o 5 tonos de forma segura sin aumentar la sensibilidad dental.',
    detailedDescription: 'Protocolo de máxima eficacia que fusiona una sesión clínica de activación foto-lumínica fría de gel concentrado, seguida de férulas personalizadas para uso nocturno en el hogar. Preserva el esmalte, fortalece las piezas dentales mediante micro-reminealización y erradica pigmentos profundos de café, tabaco o té.',
    priceRange: 'Kit de Mantenimiento incluido',
    iconName: 'Sun'
  },
  {
    id: 'full-rehabilitation',
    title: 'Rehabilitación Oral & Oclusión',
    duration: 'Planificado en fases',
    shortDescription: 'Reconstrucción morfofuncional total para pacientes con severo desgaste dental o bruxismo.',
    detailedDescription: 'Tratamiento holístico enfocado en devolver la correcta cinemática articular y masticatoria. Mediante placas de alivio neuromuscular de precisión, coronas sobre-implantares y reconstrucciones con incrustaciones de disilicato de litio, restablecemos la belleza perdida y la función oclusal sana del paciente con desgaste crónico.',
    priceRange: 'Diagnóstico por articulador virtual',
    iconName: 'Activity'
  },
  {
    id: 'aesthetic-periodontics',
    title: 'Plástica Gingival & Microcirugía',
    duration: '1 Sesión quirúrgica',
    shortDescription: 'Armonización de encías con láser dental para corregir sonrisas gingivales y asimetrías.',
    detailedDescription: 'Procedimiento microquirúrgico estético para nivelar el contorno gingival desparejo o resolver la exposición excesiva de encías al sonreír (sonrisa gingival). Realizado mediante bisturí de plasma láser de rápida cicatrización. A menudo se combina con carillas para alcanzar la simetría facial más balanceada.',
    priceRange: 'Evaluación periodontal requerida',
    iconName: 'Scissors'
  }
];

export const TEAM_MEMBERS: Specialist[] = [
  {
    id: 'andrea-bellini',
    name: 'Dr. Andrea Bellini',
    role: 'Director Médico & Fundador',
    specialty: 'Rehabilitación Oral & Estética Odontológica de Alta Complejidad',
    education: 'Doctor ph.D. en Estética Dental por la Università di Bologna, Italia. Fellowship en Odontología Restauradora y Diseño Digital por Harvard Dental School (EE.UU.). Diamond Lecturer en carillas y porcelana feldespática.',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'clara-bellini',
    name: 'Dra. Clara Bellini',
    role: 'Co-Directora & Especialista en Ortodoncia',
    specialty: 'Ortodoncia Invisible Estética',
    education: 'Especialista en Ortodoncia y Ortopedia Maxilar por la Universidad de Buenos Aires. Master Internacional en Ortodoncia Transparente (Invisalign Diamond Provider). Miembro activo de la World Federation of Orthodontists (WFO).',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813573-246434e3b96f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'stefano-vanzant',
    name: 'Dr. Stefano Vanzant',
    role: 'Cirujano Maxilofacial de Planta',
    specialty: 'Implantología Avanzada & Cirugía Guiada Tridimensional',
    education: 'Médico y Odontólogo. Especialista en Cirugía Oral y Maxilofacial por el Hospital Clínic de Barcelona. Especialista en reconstrucciones óseas avanzadas e implantes cigomáticos. Consultor regional de Nobel Biocare.',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600'
  }
];

export const CLINIC_CASES: CaseComparison[] = [
  {
    id: 'caso-estetica-carillas',
    title: 'Rejuvenecimiento Dental con Carillas de Porcelana',
    category: 'Diseño de Sonrisa',
    description: 'Armonización total de sector anterior mediante 8 carillas feldespáticas ultrafinas para resolver anomalías de esmalte, asimetrías de los bordes y lograr un blanco bio-natural integrado.',
    beforeUrl: '/src/assets/images/smile1_before_1780402554144.png',
    afterUrl: '/src/assets/images/smile1_after_1780402538305.png',
    stats: [
      { label: 'Visitas', value: '3 Consultas' },
      { label: 'Brillo Vita', value: '+4 Niveles' },
      { label: 'Armonía', value: '100% Simétrica' }
    ]
  },
  {
    id: 'caso-implante-zirconio',
    title: 'Rehabilitación Superior con Implante Estético de Zirconio',
    category: 'Implantología Avanzada',
    description: 'Sustitución de incisivo central fracturado sin dañar los dientes vecinos. Se colocó implante cerámico libre de metal con cirugía mínimamente invasiva guiada por computadora.',
    beforeUrl: '/src/assets/images/implant_before_1780402583665.png',
    afterUrl: '/src/assets/images/implant_after_1780402569179.png',
    stats: [
      { label: 'Intervención', value: '45 minutos' },
      { label: 'Biocompatibilidad', value: 'Alergias 0%' },
      { label: 'Corona', value: 'Zirconio Translúcido' }
    ]
  }
];
