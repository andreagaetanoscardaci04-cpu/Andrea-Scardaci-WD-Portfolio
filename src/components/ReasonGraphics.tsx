import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, Check, ArrowRight, BarChart3, Sparkles, Plus, Award } from 'lucide-react';

const StarsRow: React.FC<{ filled?: number; size?: string }> = ({ filled = 4, size = 'w-3 h-3' }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`${size} ${i < filled ? 'text-amber-400 fill-amber-400' : 'text-white/15 fill-white/15'}`}
      />
    ))}
  </div>
);

const SLIDES = [
  {
    src: '/images/google-listing-senza-sito.webp',
    label: 'Prima della collaborazione',
    icon: X,
    tone: 'text-white/35',
    border: 'border-white/10',
  },
  {
    src: '/images/google-listing-con-sito.webp',
    label: 'Dopo la collaborazione',
    icon: Check,
    tone: 'text-brand-accent',
    border: 'border-brand-accent/30',
  },
];

/** Reason #1 — real Google listing, before vs after: click the small arrow to flip the card. */
export const GoogleListingCompare: React.FC = () => {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const Icon = slide.icon;
  const flip = () => setIndex((i) => (i === 0 ? 1 : 0));

  return (
    <div className="w-full lg:w-[300px] shrink-0 flex justify-center">
      <div className="w-[140px]">
      <div className="relative aspect-square" style={{ perspective: 900 }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute inset-0 rounded-lg border overflow-hidden ${slide.border}`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <img
              src={slide.src}
              alt={index === 1 ? 'Scheda Google con sito web collegato' : 'Scheda Google senza sito web'}
              className="w-full h-full object-cover object-left"
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={flip}
          aria-label={index === 0 ? 'Mostra il dopo' : 'Mostra il prima'}
          className="absolute -bottom-2 -right-2 z-10 w-6 h-6 rounded-full bg-brand-accent text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
          style={{ boxShadow: '0 4px 10px rgba(34,197,94,0.4)' }}
        >
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="relative h-9 mt-2 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`absolute inset-x-0 flex flex-col items-center gap-0.5 text-center text-[8.5px] leading-tight uppercase tracking-wide ${slide.tone}`}
          >
            <Icon className="w-2.5 h-2.5 shrink-0" />
            <p>{slide.label}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      </div>
    </div>
  );
};

const RANKING_FACTORS = [
  { label: 'Scheda Google Business', pct: 32, highlight: false },
  { label: 'Sito web e contenuti', pct: 19, highlight: true },
  { label: 'Recensioni', pct: 16, highlight: false },
  { label: 'Link e citazioni', pct: 15, highlight: false },
  { label: 'Altri segnali', pct: 18, highlight: false },
];

const FactorBar: React.FC<{ label: string; pct: number; highlight?: boolean }> = ({ label, pct, highlight }) => (
  <div>
    <div className="flex items-center justify-between text-[10px] mb-1">
      <span className={highlight ? 'text-brand-accent font-medium' : 'text-white/50'}>{label}</span>
      <span className={highlight ? 'text-brand-accent font-medium' : 'text-white/35'}>{pct}%</span>
    </div>
    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`h-full rounded-full ${highlight ? 'bg-gradient-to-r from-brand-accent/60 to-brand-accent' : 'bg-white/25'}`}
      />
    </div>
  </div>
);

const SEO_HERO_PCT = 19;
const SEO_RING_RADIUS = 40;
const SEO_RING_CIRCUMFERENCE = 2 * Math.PI * SEO_RING_RADIUS;

/** Reason #2 — a compact ring teaser (sized to match the reason-1 card) that opens a full study modal. */
export const SeoRankingGraphic: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full lg:w-[300px] shrink-0 flex justify-center">
        <div className="w-[140px]">
          <div className="relative aspect-square rounded-lg border border-brand-dark/[0.08] bg-white flex items-center justify-center">
            <div className="relative w-[92px] h-[92px] shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r={SEO_RING_RADIUS} fill="none" stroke="rgba(34,197,94,0.15)" strokeWidth="9" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r={SEO_RING_RADIUS}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={SEO_RING_CIRCUMFERENCE}
                  initial={{ strokeDashoffset: SEO_RING_CIRCUMFERENCE }}
                  whileInView={{ strokeDashoffset: SEO_RING_CIRCUMFERENCE * (1 - SEO_HERO_PCT / 100) }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-brand-dark text-xl font-bold leading-none flex items-baseline">
                  <Plus className="w-3.5 h-3.5 mr-0.5 stroke-[3]" /> {SEO_HERO_PCT}%
                </span>
                <span className="text-brand-dark/60 text-[7px] font-medium uppercase tracking-wide mt-1">del ranking</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="absolute -bottom-2.5 -right-6 z-10 whitespace-nowrap rounded-full bg-brand-accent text-white text-[10px] font-medium px-3 py-1.5 hover:scale-105 active:scale-95 transition-transform"
              style={{ boxShadow: '0 4px 10px rgba(34,197,94,0.4)' }}
            >
              Scopri di più
            </button>
          </div>

          <div className="flex flex-col items-center gap-0.5 text-center mt-2">
            <BarChart3 className="w-2.5 h-2.5 text-brand-accent shrink-0" />
            <p className="text-[8.5px] leading-tight uppercase tracking-wide text-brand-accent">Peso SEO del sito</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-[2rem] bg-brand-dark-elevated border border-white/10 p-7 sm:p-8"
              style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Chiudi"
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-11 h-11 rounded-full bg-brand-accent/10 flex items-center justify-center mb-5">
                <BarChart3 className="w-5 h-5 text-brand-accent" />
              </div>

              <span className="eyebrow mb-2 block">Studio SEO locale · 2026</span>
              <h3 className="text-xl sm:text-2xl text-white font-bold mb-4 leading-snug">
                Quanto conta davvero il sito per farti trovare su Google?
              </h3>

              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Secondo il report annuale Whitespark sui fattori di ranking locale (il più citato del settore SEO),
                Google Maps e il "pacchetto locale" si basano su un mix di segnali. Nessuno di questi da solo decide
                la posizione — contano insieme:
              </p>

              <div className="space-y-3 mb-5">
                {RANKING_FACTORS.map((f) => (
                  <FactorBar key={f.label} {...f} />
                ))}
              </div>

              <div className="rounded-2xl bg-brand-accent/[0.08] border border-brand-accent/20 p-4 mb-5">
                <p className="flex items-center gap-2 text-brand-accent text-xs font-medium mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Il dato che cresce di più
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Per le risposte generate dall'IA di Google (AI Overviews), i contenuti del sito diventano il{' '}
                  <span className="text-white font-medium">fattore più pesante, circa il 24%</span> — più di
                  scheda Google, recensioni o link. L'IA legge il tuo sito, non solo la tua scheda.
                </p>
              </div>

              <p className="text-white/40 text-sm leading-relaxed mb-5">
                In parole semplici: un sito web <span className="text-white/70">non sostituisce</span> recensioni
                curate o una scheda Google Business completa — quelle restano il singolo fattore più pesante. Ma è
                un pezzo reale e in crescita del puzzle, non un dettaglio marginale. E per quanto riguarda gli anni
                di attività: non è un fattore diretto di Google — conta indirettamente, solo perché un'attività più
                vecchia ha in genere accumulato più recensioni e citazioni nel tempo.
              </p>

              <p className="text-white/25 text-[10px] uppercase tracking-widest">
                Fonte: Whitespark, Local Search Ranking Factors 2026
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/** Reason #3 — real study on visual design and perceived credibility, with a "full study" modal. */
export const PerceivedValueGraphic: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full lg:w-[300px] shrink-0 flex justify-center">
        <div className="w-[140px]">
          <div className="relative aspect-square rounded-lg border border-brand-dark/[0.08] bg-white flex flex-col items-center justify-center gap-1.5 px-3">
            <StarsRow filled={5} size="w-3.5 h-3.5" />
            <span className="text-brand-dark text-2xl font-bold leading-none">46%</span>
            <p className="text-brand-dark/50 text-[7px] uppercase tracking-wide text-center leading-tight">
              giudica la credibilità dal design del sito
            </p>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="absolute -bottom-2.5 -right-6 z-10 whitespace-nowrap rounded-full bg-brand-accent text-white text-[10px] font-medium px-3 py-1.5 hover:scale-105 active:scale-95 transition-transform"
              style={{ boxShadow: '0 4px 10px rgba(34,197,94,0.4)' }}
            >
              Scopri lo studio
            </button>
          </div>

          <div className="flex flex-col items-center gap-0.5 text-center mt-2">
            <Award className="w-2.5 h-2.5 text-brand-accent shrink-0" />
            <p className="text-[8.5px] leading-tight uppercase tracking-wide text-brand-accent">
              Studio su credibilità web
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-[2rem] bg-brand-dark-elevated border border-white/10 p-7 sm:p-8"
              style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Chiudi"
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-11 h-11 rounded-full bg-brand-accent/10 flex items-center justify-center mb-5">
                <Award className="w-5 h-5 text-brand-accent" />
              </div>

              <span className="eyebrow mb-2 block">Studio su credibilità web · Stanford</span>
              <h3 className="text-xl sm:text-2xl text-white font-bold mb-4 leading-snug">
                Quanto conta l'aspetto di un sito per la fiducia dei clienti?
              </h3>

              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Il{' '}
                <span className="text-white/80">Stanford Web Credibility Project</span>, condotto con Consumer
                Reports WebWatch (organizzazione statunitense con sede a Yonkers, New York), ha coinvolto oltre{' '}
                <span className="text-white/80">4.500 persone</span> in tre anni di ricerca — inclusa una rilevazione
                su 2.684 partecipanti che hanno valutato la credibilità di 100 siti web reali.
              </p>

              <div className="rounded-2xl bg-brand-accent/[0.08] border border-brand-accent/20 p-4 mb-4">
                <p className="text-white font-bold text-3xl leading-none mb-1.5">46,1%</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  delle persone ha giudicato la credibilità di un sito (e quindi dell'attività dietro di esso){' '}
                  <span className="text-white font-medium">soprattutto dall'aspetto visivo</span> — layout,
                  tipografia, colori — più che dai contenuti stessi.
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 mb-5">
                <p className="flex items-center gap-2 text-brand-accent text-xs font-medium mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Anche le foto contano
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Secondo i dati ufficiali di Google Business Profile, le attività che aggiungono foto ricevono{' '}
                  <span className="text-white font-medium">il 42% di richieste di indicazioni in più</span> e{' '}
                  <span className="text-white font-medium">il 35% di clic in più verso il sito</span> rispetto a chi
                  non ne ha.
                </p>
              </div>

              <p className="text-white/40 text-sm leading-relaxed mb-5">
                In parole semplici: le persone giudicano un'attività prima ancora di leggerla, solo guardandola. Un
                sito curato e foto reali non sono un dettaglio estetico — sono spesso il primo (e a volte unico)
                motivo per cui un cliente si fida di te invece che di un concorrente.
              </p>

              <p className="text-white/25 text-[10px] uppercase tracking-widest">
                Fonte: Stanford Web Credibility Project, Consumer Reports WebWatch (2002) · Dati Google Business
                Profile
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
