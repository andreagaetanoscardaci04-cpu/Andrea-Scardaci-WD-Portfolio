import { motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Lightbulb, CalendarDays, MailX } from 'lucide-react';
import HeroBackground from '../components/HeroBackground';
import NewsletterSignup from '../components/NewsletterSignup';

const POINTS = [
  { icon: Lightbulb, title: 'Consigli pratici', text: 'Idee concrete per far trovare la tua palestra online e trasformare le visite al sito in nuovi iscritti.' },
  { icon: CalendarDays, title: 'Una volta al mese', text: 'Una sola email, breve e utile. Niente spam, niente messaggi ogni giorno.' },
  { icon: MailX, title: 'Libero di andare', text: 'Ti disiscrivi in qualsiasi momento con un clic dal fondo di ogni email.' },
];

const Newsletter = () => {
  // Brevo redirects here with ?confermato=1 after the subscriber confirms.
  const [params] = useSearchParams();
  const confirmed = params.get('confermato') === '1';

  return (
    <div className="pt-32 overflow-hidden">
      <HeroBackground className="fixed inset-0 w-full h-full -z-10" />

      <section data-animated-bg-region className="relative section-padding">
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {confirmed ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-20 h-20 bg-brand-accent/15 text-brand-accent rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h1 className="font-luxury text-4xl sm:text-5xl md:text-6xl leading-[1.15] mb-6 text-white">
                  Iscrizione <span className="italic text-brand-accent">confermata</span>.
                </h1>
                <p className="text-white/55 text-lg font-light leading-relaxed">
                  Grazie! Riceverai la prossima newsletter direttamente nella tua casella email.
                </p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="eyebrow mb-5 block">Newsletter</span>
                <h1 className="font-luxury text-4xl sm:text-5xl md:text-6xl leading-[1.15] mb-6 text-white">
                  Più iscritti per la tua palestra, <span className="italic text-brand-accent">un consiglio al mese</span>.
                </h1>
                <p className="text-white/55 text-lg font-light leading-relaxed max-w-xl mx-auto mb-12">
                  Ogni mese ti mando un consiglio pratico per migliorare la presenza online della tua attività: sito, Google, recensioni e tutto ciò che porta nuovi clienti.
                </p>
                <NewsletterSignup />
              </motion.div>
            )}
          </div>

          {!confirmed && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-24">
              {POINTS.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"
                >
                  <Icon className="w-7 h-7 text-brand-accent mb-5" />
                  <h2 className="text-white text-lg font-bold mb-2">{title}</h2>
                  <p className="text-white/50 font-light leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
