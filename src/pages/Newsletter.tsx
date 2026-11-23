import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Plus, ArrowRight, Lock } from 'lucide-react';
import HeroBackground from '../components/HeroBackground';
import NewsletterSignup from '../components/NewsletterSignup';
import PortfolioTile from '../components/PortfolioTile';
import { PROJECTS } from '../constants';

// Standalone landing page for the free-preview newsletter (/anteprima-gratuita,
// also served at /newsletter, where Brevo redirects with ?confermato=1).
// It is the link sent to leads who said "not now".

// Sample businesses shown inside the browser mockup — illustrative only.
const SAMPLES = [
  { name: 'Palestra Centrale', url: 'palestracentrale.it', tagline: 'Allenati con chi ti segue davvero.', cta: 'Prenota una prova' },
  { name: 'Trattoria Il Borgo', url: 'trattoriailborgo.it', tagline: 'Cucina di casa, dal 1987.', cta: 'Prenota un tavolo' },
  { name: 'Studio Dentistico Sorriso', url: 'studiosorriso.it', tagline: 'Cure attente, senza attese.', cta: 'Fissa una visita' },
  { name: 'Salone Nadia', url: 'salonenadia.it', tagline: 'Il tuo stile, curato nei dettagli.', cta: 'Prenota online' },
];

const STEPS = [
  { title: 'Ti iscrivi', text: 'Lasci la tua email qui sotto e confermi con un clic. Ci vogliono dieci secondi.' },
  { title: 'Apre una finestra', text: 'Poche volte l’anno, per pochi giorni, apro le anteprime gratuite. Gli iscritti ricevono l’avviso per primi.' },
  { title: 'Prenoti il tuo posto', text: 'Mi racconti la tua attività: cosa offri, a chi ti rivolgi e, se ce l’hai, il logo.' },
  { title: 'Vedi il sito e decidi', text: 'Ricevi l’anteprima del tuo sito da aprire anche sul telefono. Se ti piace, andiamo avanti. Se no, non devi nulla.' },
];

const FAQ = [
  { q: 'Devo pagare qualcosa per l’anteprima?', a: 'No. L’anteprima è gratuita e non ti chiedo dati di pagamento. Paghi solo se decidi di far realizzare il sito completo.' },
  { q: 'E se poi non mi piace?', a: 'Nessun problema e nessun obbligo. Mi dici di no e finisce lì.' },
  { q: 'Perché lo fai gratis?', a: 'Perché è più facile scegliere dopo aver visto il risultato che dopo aver letto un preventivo. Ogni anteprima la realizzo a mano, per questo i posti sono pochi.' },
  { q: 'Quando apre la prossima finestra?', a: 'Non c’è una data fissa. La comunico prima agli iscritti, così hai il tempo di prenotare prima che i posti finiscano.' },
  { q: 'Quante email riceverò?', a: 'Poche: l’avviso quando apre una finestra e, ogni tanto, qualcosa di utile per la tua attività. Ti disiscrivi in qualsiasi momento con un clic.' },
];

/** The page's signature: a browser window drafting a site for a different business every few seconds. */
const PreviewWindow = () => {
  const reduceMotion = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % SAMPLES.length), 3200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const s = SAMPLES[i];

  return (
    <div
      className="relative w-full max-w-md mx-auto rounded-[1.25rem] overflow-hidden border border-white/12 bg-[#0d1310]"
      style={{ boxShadow: '0 40px 90px -30px rgba(34,197,94,0.35), 0 0 0 1px rgba(197,255,220,0.06)' }}
      aria-hidden="true"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07] bg-white/[0.03]">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-[11px] text-white/55 font-mono">
          <Lock className="w-3 h-3 shrink-0 text-brand-accent/80" />
          <AnimatePresence mode="wait">
            <motion.span
              key={s.url}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="truncate"
            >
              {s.url}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Drafted page */}
      <div className="relative px-5 pt-5 pb-6">
        <div className="flex items-center justify-between mb-7">
          <span className="w-16 h-2 rounded-full bg-white/20" />
          <div className="flex gap-2">
            <span className="w-7 h-1.5 rounded-full bg-white/10" />
            <span className="w-7 h-1.5 rounded-full bg-white/10" />
            <span className="w-7 h-1.5 rounded-full bg-white/10" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={s.name}
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.45 }}
          >
            <p className="font-luxury text-[1.65rem] leading-[1.1] text-white mb-2">{s.name}</p>
            <p className="text-sm text-white/50 font-light mb-5">{s.tagline}</p>
            <span className="inline-block rounded-full bg-brand-accent px-4 py-2 text-xs font-medium text-white">{s.cta}</span>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-3 gap-2 mt-6">
          <span className="aspect-[4/5] rounded-lg bg-gradient-to-br from-brand-accent/25 to-white/[0.03]" />
          <span className="aspect-[4/5] rounded-lg bg-gradient-to-br from-white/10 to-white/[0.02]" />
          <span className="aspect-[4/5] rounded-lg bg-gradient-to-br from-white/10 to-brand-accent/15" />
        </div>

        {/* Stamp */}
        <span className="absolute top-14 right-4 rotate-[8deg] rounded-md border border-brand-accent/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-accent bg-brand-dark/70">
          Anteprima
        </span>
      </div>
    </div>
  );
};

const Newsletter = () => {
  const [params] = useSearchParams();
  const confirmed = params.get('confermato') === '1';

  useEffect(() => {
    document.title = 'Anteprima gratuita del tuo sito · Andrea Scardaci';
  }, []);

  return (
    <div className="min-h-screen overflow-hidden text-white">
      <HeroBackground className="fixed inset-0 w-full h-full -z-10" />
      <div className="fixed inset-0 -z-10 bg-black/45 pointer-events-none" />

      {/* Minimal header: one way back to the main site, nothing else to distract. */}
      <header className="container-custom flex items-center justify-between py-6">
        <Link to="/" className="text-lg sm:text-xl font-light tracking-tight text-white">
          Andrea <span className="text-brand-accent">Scardaci</span>
        </Link>
        <Link to="/esempi" className="text-sm text-white/55 hover:text-white transition-colors">
          I miei lavori
        </Link>
      </header>

      {confirmed ? (
        <section className="container-custom pt-16 pb-28 text-center max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-20 h-20 bg-brand-accent/15 text-brand-accent rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="font-luxury text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-6">
              Iscrizione <span className="italic text-brand-accent">confermata</span>.
            </h1>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-10">
              Ti scriverò appena apre la prossima finestra di anteprime gratuite, così potrai prenotare la tua prima che i posti finiscano.
            </p>
            <Link
              to="/esempi"
              className="group inline-flex items-center gap-2 text-brand-accent font-medium"
            >
              Intanto guarda i siti che ho realizzato
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </section>
      ) : (
        <>
          {/* ── HERO ── */}
          <section className="container-custom pt-8 sm:pt-14 pb-20 lg:pb-28">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs text-white/70 mb-7">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-brand-accent/70 motion-safe:animate-ping" />
                    <span className="relative w-2 h-2 rounded-full bg-brand-accent" />
                  </span>
                  Anteprime gratuite · posti limitati
                </span>

                <h1 className="font-luxury text-[2.6rem] sm:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.01em] mb-6">
                  La newsletter che ti mostra il tuo sito <span className="italic text-brand-accent">prima di pagarlo</span>.
                </h1>

                <p className="text-white/60 text-lg font-light leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9">
                  Poche volte l’anno realizzo gratis l’anteprima del sito per la tua attività. La guardi, la provi sul telefono e decidi solo dopo. Iscriviti e ti avviso quando apre la prossima finestra.
                </p>

                <div className="lg:[&_form]:mx-0 lg:[&_form>p]:text-left">
                  <NewsletterSignup cta="Avvisami" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <PreviewWindow />
              </motion.div>
            </div>
          </section>

          {/* ── COME FUNZIONA (a real sequence, so it's numbered) ── */}
          <section className="border-t border-white/[0.07] bg-black/30">
            <div className="container-custom py-20 lg:py-28">
              <h2 className="font-luxury text-3xl sm:text-4xl md:text-5xl leading-[1.15] mb-12 lg:mb-16 max-w-xl">
                Come <span className="italic text-brand-accent">funziona</span>
              </h2>
              <ol className="grid gap-px sm:grid-cols-2 lg:grid-cols-4 rounded-[1.75rem] overflow-hidden border border-white/[0.08] bg-white/[0.08]">
                {STEPS.map((step, idx) => (
                  <motion.li
                    key={step.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: idx * 0.08 }}
                    className="bg-[#0b100d] p-7 lg:p-8"
                  >
                    <span className="font-luxury italic text-4xl text-brand-accent/90 lining-nums block mb-5">{idx + 1}</span>
                    <h3 className="text-white text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-white/55 font-light leading-relaxed">{step.text}</p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── REAL WORK ── */}
          <section className="container-custom py-20 lg:py-28">
            <div className="flex items-end justify-between gap-6 mb-10">
              <h2 className="font-luxury text-3xl sm:text-4xl md:text-5xl leading-[1.15] max-w-lg">
                Alcuni siti che ho <span className="italic text-brand-accent">realizzato</span>
              </h2>
              <Link to="/esempi" className="hidden sm:inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors shrink-0">
                Vedi tutti <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {PROJECTS.slice(0, 3).map((project, index) => (
                <div key={project.id} className={index === 2 ? 'hidden lg:block' : undefined}>
                  <PortfolioTile title={project.title} image={project.image} link={project.link} index={index} />
                </div>
              ))}
            </div>
            <Link to="/esempi" className="sm:hidden mt-6 inline-flex items-center gap-2 text-sm text-white/60">
              Vedi tutti i lavori <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          {/* ── FAQ ── */}
          <section className="border-t border-white/[0.07] bg-black/30">
            <div className="container-custom py-20 lg:py-28">
              <div className="max-w-3xl mx-auto">
              <h2 className="font-luxury text-3xl sm:text-4xl md:text-5xl leading-[1.15] mb-10">
                Domande <span className="italic text-brand-accent">frequenti</span>
              </h2>
              <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {FAQ.map(({ q, a }) => (
                  <details key={q} className="group py-5">
                    <summary className="flex items-center justify-between gap-6 cursor-pointer list-none text-white text-lg font-medium focus-visible:outline-none focus-visible:text-brand-accent [&::-webkit-details-marker]:hidden">
                      {q}
                      <Plus className="w-5 h-5 shrink-0 text-brand-accent transition-transform duration-300 group-open:rotate-45" />
                    </summary>
                    <p className="pt-3 pr-10 text-white/55 font-light leading-relaxed">{a}</p>
                  </details>
                ))}
              </div>
              </div>
            </div>
          </section>

          {/* ── CLOSING CTA ── */}
          <section className="container-custom py-20 lg:py-28">
            <div
              className="max-w-3xl mx-auto text-center rounded-[2.5rem] border border-brand-accent/25 bg-brand-accent/[0.06] px-6 py-14 sm:px-14 sm:py-18"
              style={{ boxShadow: '0 40px 100px -30px rgba(34,197,94,0.25)' }}
            >
              <h2 className="font-luxury text-3xl sm:text-5xl leading-[1.12] mb-5">
                Il prossimo posto <span className="italic text-brand-accent">può essere tuo</span>.
              </h2>
              <p className="text-white/55 text-lg font-light leading-relaxed max-w-lg mx-auto mb-9">
                Iscriversi è gratis e non ti impegna a nulla. Ti avviso solo quando apre la prossima finestra.
              </p>
              <NewsletterSignup compact cta="Avvisami" />
            </div>
          </section>
        </>
      )}

      <footer className="container-custom py-8 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
        <span>© {new Date().getFullYear()} Andrea Scardaci · Web design</span>
        <Link to="/privacy-policy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
      </footer>
    </div>
  );
};

export default Newsletter;
