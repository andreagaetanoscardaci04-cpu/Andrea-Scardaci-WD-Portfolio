import { Project, Step, Benefit } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Sito web per Palestra',
    description: 'Un design moderno e dinamico per una palestra che vuole mostrare i propri corsi e orari.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
    category: 'Palestra',
    link: 'https://palestresalvonicotra.com'
  },
  {
    id: '2',
    title: 'Sito web per Studio Personal Training',
    description: 'Elegante e professionale, focalizzato sulla presentazione dei coach e dei risultati.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop',
    category: 'Personal Training'
  },
  {
    id: '3',
    title: 'Sito web per Centro Fitness',
    description: 'Completo di tutte le informazioni su abbonamenti, servizi e tour virtuale.',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop',
    category: 'Centro Fitness'
  },
  {
    id: '4',
    title: 'Sito web per Studio Yoga / Pilates',
    description: 'Un design zen e pulito per trasmettere calma e professionalità.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop',
    category: 'Yoga & Pilates'
  },
  {
    id: '5',
    title: 'Sito web per Centro Sportivo',
    description: 'Gestione di più attività, campi da gioco e eventi in un unico portale.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop',
    category: 'Centro Sportivo'
  },
  {
    id: '6',
    title: 'Sito web per Attività Locale',
    description: 'Perfetto per negozi o studi professionali che vogliono farsi trovare online.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
    category: 'Attività Locale'
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
