import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, Check, BarChart3, Sparkles, Plus, Award, ZoomIn } from 'lucide-react';

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

interface BeforeAfterCompareProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  /** object-position tweak for listing-style screenshots that need to stay left-aligned */
  objectPosition?: string;
}

/** Shared before/after pair — both images shown side by side at once; tap either to zoom into a full-size lightbox. */
const BeforeAfterCompare: React.FC<BeforeAfterCompareProps> = ({ beforeSrc, afterSrc, beforeAlt, afterAlt, objectPosition }) => {
  const [zoomed, setZoomed] = useState<'before' | 'after' | null>(null);
  const zoomedSrc = zoomed === 'before' ? beforeSrc : zoomed === 'after' ? afterSrc : null;
  const zoomedAlt = zoomed === 'before' ? beforeAlt : zoomed === 'after' ? afterAlt : '';

  return (
    <div className="w-full lg:w-[440px] shrink-0 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[440px]"
      >
        <div>
          <button
            type="button"
            onClick={() => setZoomed('before')}
            aria-label="Ingrandisci l'immagine prima"
            className="group relative block w-full aspect-square rounded-2xl border border-rose-400/30 overflow-hidden cursor-zoom-in"
          >
            <img
              src={beforeSrc}
              alt={beforeAlt}
              className="w-full h-full object-cover"
              style={objectPosition ? { objectPosition } : undefined}
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </span>
          </button>
          <div className="flex items-center justify-center gap-1 mt-2 text-rose-400 text-[10px] leading-tight uppercase tracking-wide font-medium">
            <X className="w-3 h-3 shrink-0" />
            Prima
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setZoomed('after')}
            aria-label="Ingrandisci l'immagine dopo"
            className="group relative block w-full aspect-square rounded-2xl border border-brand-accent/30 overflow-hidden cursor-zoom-in"
          >
            <img
              src={afterSrc}
              alt={afterAlt}
              className="w-full h-full object-cover"
              style={objectPosition ? { objectPosition } : undefined}
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </span>
          </button>
          <div className="flex items-center justify-center gap-1 mt-2 text-brand-accent text-[10px] leading-tight uppercase tracking-wide font-medium">
            <Check className="w-3 h-3 shrink-0" />
            Dopo
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {zoomedSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setZoomed(null)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[92vw] max-h-[85vh]"
            >
              <img
                src={zoomedSrc}
                alt={zoomedAlt}
                className="max-w-[92vw] max-h-[85vh] w-auto h-auto rounded-2xl border border-white/15 object-contain"
                style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
              />
              <button
                type="button"
                onClick={() => setZoomed(null)}
                aria-label="Chiudi"
                className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-white text-brand-dark flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors"
                style={{ boxShadow: '0 6px 16px rgba(0,0,0,0.4)' }}
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/** Reason #1 — real Google listing, before vs after, both visible at once. */
export const GoogleListingCompare: React.FC = () => (
  <BeforeAfterCompare
    beforeSrc="/images/google-listing-senza-sito.webp"
    afterSrc="/images/google-listing-con-sito.webp"
    beforeAlt="Scheda Google senza sito web"
    afterAlt="Scheda Google con sito web collegato"
    objectPosition="left"
  />
);

/** Loss #1 — a customer rejecting a photo-less, site-less listing in favor of a competitor's, both visible at once. */
export const CompetitorReactionCompare: React.FC = () => (
  <BeforeAfterCompare
    beforeSrc="/images/competitor-listing-rifiuta.png"
    afterSrc="/images/competitor-listing-sceglie.png"
    beforeAlt="Cliente rifiuta attività senza foto né sito web"
    afterAlt="Cliente sceglie un'altra attività con foto e sito web"
  />
);

/** Loss #2 — Google Business performance dashboard, before vs after a connected website, both visible at once. */
export const PerformanceMetricsCompare: React.FC = () => (
  <BeforeAfterCompare
    beforeSrc="/images/gbp-performance-basso.png"
    afterSrc="/images/gbp-performance-alto.png"
    beforeAlt="Statistiche Google Business basse senza sito web"
    afterAlt="Statistiche Google Business in crescita con sito web collegato"
  />
);

/** Loss #3 — a customer's perception of the business, before vs after a professional connected website, both visible at once. */
export const BrandImageCompare: React.FC = () => (
  <BeforeAfterCompare
    beforeSrc="/images/brand-image-scarsa.png"
    afterSrc="/images/brand-image-curata.png"
    beforeAlt="Cliente non trova informazioni senza sito web"
    afterAlt="Cliente percepisce professionalità grazie al sito web"
  />
);

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
      <div className="w-full lg:w-[320px] shrink-0 flex justify-center">
        <div className="w-[240px] sm:w-[260px]">
          <div className="relative aspect-square rounded-2xl border border-brand-dark/[0.08] bg-white flex items-center justify-center">
            <div className="relative w-[168px] h-[168px] shrink-0">
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
                <span className="text-brand-dark text-3xl font-bold leading-none flex items-baseline">
                  <Plus className="w-5 h-5 mr-0.5 stroke-[3]" /> {SEO_HERO_PCT}%
                </span>
                <span className="text-brand-dark/60 text-[10px] font-medium uppercase tracking-wide mt-1.5">del ranking</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="absolute -bottom-2 -right-2 z-10 whitespace-nowrap rounded-full bg-brand-accent text-white text-sm font-bold uppercase tracking-wide px-5 py-2.5 hover:scale-105 active:scale-95 transition-transform"
              style={{ boxShadow: '0 6px 16px rgba(34,197,94,0.45)' }}
            >
              Scopri di più
            </button>
          </div>

          <div className="flex flex-col items-center gap-0.5 text-center mt-3">
            <BarChart3 className="w-3 h-3 text-brand-accent shrink-0" />
            <p className="text-[10px] leading-tight uppercase tracking-wide text-brand-accent">Peso SEO del sito</p>
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
      <div className="w-full lg:w-[320px] shrink-0 flex justify-center">
        <div className="w-[240px] sm:w-[260px]">
          <div className="relative aspect-square rounded-2xl border border-brand-dark/[0.08] bg-white flex flex-col items-center justify-center gap-2.5 px-5">
            <StarsRow filled={5} size="w-6 h-6" />
            <span className="text-brand-dark text-4xl font-bold leading-none">46%</span>
            <p className="text-brand-dark/50 text-[11px] uppercase tracking-wide text-center leading-tight">
              giudica la credibilità dal design del sito
            </p>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="absolute -bottom-2 -right-2 z-10 whitespace-nowrap rounded-full bg-brand-accent text-white text-sm font-bold uppercase tracking-wide px-5 py-2.5 hover:scale-105 active:scale-95 transition-transform"
              style={{ boxShadow: '0 6px 16px rgba(34,197,94,0.45)' }}
            >
              Scopri lo studio
            </button>
          </div>

          <div className="flex flex-col items-center gap-0.5 text-center mt-3">
            <Award className="w-3 h-3 text-brand-accent shrink-0" />
            <p className="text-[10px] leading-tight uppercase tracking-wide text-brand-accent">
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
