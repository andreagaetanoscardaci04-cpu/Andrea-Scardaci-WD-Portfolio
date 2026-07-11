import { Project, Step, Benefit } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Sito web per Palestra',
    description: 'Un design moderno e dinamico per una palestra che vuole mostrare i propri corsi e orari.',
    image: '/images/palestre-salvo-nicotra-cover.webp',
    category: 'Palestra',
    link: 'https://palestresalvonicotra.com'
  },
  {
    id: '7',
    title: 'Landing Page per Palestra',
    description: 'Una landing page moderna e accattivante per una palestra, pensata per convertire visitatori in nuovi iscritti.',
    image: '/images/landing-page-palestra-cover.webp',
    category: 'Palestra',
    link: 'https://athena-club-padova-spark.lovable.app/'
  },
  {
    id: '3',
    title: 'Sito Web per Studio PT',
    description: 'Elegante e professionale, focalizzato sulla presentazione dei coach e dei risultati.',
    image: '/images/studio-pt-cover.webp',
    category: 'Personal Training',
    link: 'https://fitness-life-studio.vercel.app/'
  },
  {
    id: '4',
    title: 'Sito web per Studio Yoga / Pilates',
    description: 'Un design zen e pulito per trasmettere calma e professionalità.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop',
    category: 'Yoga & Pilates',
    link: 'https://modo-firenze.vercel.app/'
  },
  {
    id: '5',
    title: 'Sito Web per Studio Fiscale',
    description: 'Un sito professionale per uno studio fiscale, con presentazione dei servizi e contatti.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop',
    category: 'Studio Fiscale',
    link: 'https://fisco3.it'
  },
  {
    id: '6',
    title: 'Sito Web per Steakhouse',
    description: 'Perfetto per negozi o studi professionali che vogliono farsi trovare online.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
    category: 'Attività Locale',
    link: 'https://steakhouse-macello-tv38.vercel.app/'
  }
];

export const STEPS: Step[] = [
  {
    title: 'Parliamo della tua attività',
    description: 'Capisco i tuoi obiettivi, il tuo stile e cosa vuoi comunicare ai tuoi clienti.',
    icon: 'MessageSquare'
  },
  {
    title: 'Progetto il tuo sito web',
    description: 'Realizzo un design moderno e professionale su misura per la tua attività.',
    icon: 'Layout'
  },
  {
    title: 'Mettiamo online il sito',
    description: 'Il tuo sito è pronto per essere visitato dai tuoi clienti su ogni dispositivo.',
    icon: 'Globe'
  }
];

export const BENEFITS: Benefit[] = [
  {
    title: 'Professionalità',
    description: 'Un sito web professionale trasmette fiducia ai nuovi clienti.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Visibilità',
    description: 'I clienti possono trovarti online e conoscere i tuoi servizi.',
    icon: 'Search'
  },
  {
    title: 'Presentazione',
    description: 'Puoi mostrare la tua struttura, i corsi e i tuoi valori.',
    icon: 'Image'
  },
  {
    title: 'Contatti semplici',
    description: 'I clienti possono contattarti facilmente.',
    icon: 'Phone'
  }
];
