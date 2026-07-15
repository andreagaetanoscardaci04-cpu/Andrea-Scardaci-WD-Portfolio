import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Search, Image, Phone, ArrowRight, ArrowUpRight, Globe, TrendingUp, Award, X } from 'lucide-react';
import { PROJECTS, BENEFITS } from '../constants';
import PortfolioTile from '../components/PortfolioTile';
import BenefitsStepper from '../components/BenefitsStepper';
import { GoogleListingCompare, SeoRankingGraphic, PerceivedValueGraphic, CompetitorReactionCompare, PerformanceMetricsCompare, BrandImageCompare } from '../components/ReasonGraphics';
import HeroBackground from '../components/HeroBackground';
import { useContactModal } from '../context/ContactModalContext';

/** Glossy sphere-and-ring icon medallion — a Saturn-like signature detail. */
const OrbIcon: React.FC<{ children: React.ReactNode; size?: string; ring?: string; tint?: string; className?: string }> = ({
  children,
  size = 'w-12 h-12',
  ring = 'border-white/25',
  tint = 'bg-white/15',
  className = '',
}) => (
  <div className={`relative ${size} ${className}`}>
    <span
      className={`absolute left-1/2 top-1/2 w-[175%] h-[62%] border ${ring} rounded-full pointer-events-none`}
      style={{ transform: 'translate(-50%, -50%) rotate(-20deg)' }}
    />
    <div
      className={`relative ${size} rounded-full ${tint} flex items-center justify-center`}
      style={{
        backgroundImage: 'radial-gradient(circle at 32% 26%, rgba(255,255,255,0.5), rgba(255,255,255,0) 65%)',
        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -6px 10px rgba(0,0,0,0.18), 0 8px 18px rgba(0,0,0,0.2)',
      }}
    >
      {children}
    </div>
  </div>
);

/** Photo treatment for the "Come lavoro" process circles — keyed by step index. */
const PROCESS_VISUALS: Record<number, { src: string; alt: string }> = {
  0: { src: '/images/processo-parliamo.webp', alt: 'Videochiamata di consulenza iniziale con un titolare di palestra' },
  1: { src: '/images/processo-progetto.webp', alt: 'Progettazione del design del sito su schermo' },
  2: { src: '/images/processo-online.webp', alt: 'Sito web live su laptop, tablet e smartphone dopo il lancio' },
};

const Home = () => {
  const icons: Record<string, any> = { ShieldCheck, Search, Image, Phone };

  const [avatarOpen, setAvatarOpen] = useState(false);
  const { openModal } = useContactModal();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const videoY = useTransform(heroScroll, [0, 1], [0, 140]);
  const videoScale = useTransform(heroScroll, [0, 1], [1, 1.12]);

  const reasons = [
    {
      icon: Search,
      title: 'Ti trovano su Google',
      desc: 'Chi cerca un\'attività come la tua ti scopre online e conosce i tuoi servizi, anche senza passaparola.',
      Visual: GoogleListingCompare,
    },
    {
      icon: TrendingUp,
      title: 'Più SEO grazie alla scheda Google',
      desc: 'Un sito collegato alla tua scheda Google Business aumenta la visibilità nelle ricerche locali.',
      Visual: SeoRankingGraphic,
    },
    {
      icon: Award,
      title: 'Valore percepito più alto',
      desc: 'Un sito curato comunica professionalità e fa percepire la tua attività di qualità superiore.',
      Visual: PerceivedValueGraphic,
    },
  ];

  const losses = [
    {
      text: 'Clienti che scelgono un\'attività più visibile',
      Visual: CompetitorReactionCompare,
    },
    {
      text: 'Meno chiamate e prenotazioni da chi ti cerca su Google',
      Visual: PerformanceMetricsCompare,
    },
    {
      text: 'Un\'immagine meno curata rispetto a chi ha già un sito',
      Visual: BrandImageCompare,
    },
  ];

  const process = [
    { title: 'Parliamo' },
    { title: 'Progetto' },
    { title: 'Online' },
  ];

  return (
    <div className="overflow-hidden">

      {/* Code-generated animated background — flowing dark-green light, no video/image assets.
          Fixed to the viewport and shared by every dark section below (each tagged with
          data-animated-bg-region); opaque light sections naturally cover it in between. */}
      <HeroBackground className="fixed inset-0 w-full h-full -z-10" />

      {/* ── HERO ─────────────────────────────────────── */}
      <section ref={heroRef} data-animated-bg-region className="relative flex items-center overflow-hidden">

        <div className="container-custom relative z-10 pt-16 pb-10 md:pt-20 md:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <div className="mb-4 lg:mb-8 space-y-1">
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl sm:text-6xl md:text-8xl lg:text-8xl leading-[1.02] font-black text-white"
                >
                  Un sito web
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.33, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl sm:text-6xl md:text-8xl lg:text-8xl leading-[1.02] font-light italic text-brand-accent"
                >
                  per far crescere
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.51, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl sm:text-6xl md:text-8xl lg:text-8xl leading-[1.02] font-black text-white"
                >
                  la tua attività.
                </motion.h1>
              </div>

              {/* Mobile-only photo — short horizontal frame, same crop as desktop */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="lg:hidden relative aspect-[7/5] mb-5"
              >
                <img
                  src="/imageme.png.png"
                  alt="Andrea Scardaci"
                  className="w-full h-full object-cover object-top scale-75 rounded-[2.5rem] border border-white/10"
                  style={{ boxShadow: '0 0 50px rgba(34,197,94,0.12), 0 30px 60px rgba(0,0,0,0.5)' }}
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center">
                  <div className="flex items-center gap-1.5 bg-brand-dark/70 border border-white/15 rounded-full pl-1.5 pr-3 py-1.5">
                    <div className="w-5 h-5 rounded-full bg-brand-accent/30 flex items-center justify-center shrink-0">
                      <Globe className="w-2.5 h-2.5 text-brand-accent" />
                    </div>
                    <span className="text-[9px] text-white font-light">Online in 10 giorni</span>
                  </div>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="text-lg md:text-xl text-white/55 font-light mb-6 lg:mb-10 max-w-md leading-relaxed"
              >
                Aiuto palestre, studi fitness e attività locali italiane ad avere una presenza online moderna, elegante e professionale.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  type="button"
                  onClick={() => openModal('hero')}
                  className="group relative bg-brand-accent text-white px-8 py-5 lg:py-4 rounded-full font-medium text-base lg:text-sm flex items-center justify-center gap-2 overflow-hidden"
                  style={{ boxShadow: '0 0 30px rgba(34,197,94,0.35), 0 4px 15px rgba(34,197,94,0.2)' }}
                >
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                  Iniziamo a lavorare insieme
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                </button>
                <Link
                  to="/esempi"
                  className="group border border-white/15 text-white/70 px-8 py-5 lg:py-4 rounded-full font-light tracking-wide text-base lg:text-sm flex items-center justify-center gap-2 hover:border-white/30 hover:text-white transition-all"
                >
                  Guarda i miei lavori
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>

              {/* Mini bio */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="flex items-center justify-center gap-3.5 mt-10 pt-6 border-t border-white/10"
              >
                <button
                  type="button"
                  onClick={() => setAvatarOpen(true)}
                  aria-label="Ingrandisci la foto di Andrea Scardaci"
                  className="w-14 h-14 rounded-full overflow-hidden border border-white/15 shrink-0 cursor-pointer"
                >
                  <img src="/images/andrea-selfie.webp" alt="Andrea Scardaci" className="w-full h-full object-cover object-[center_35%] scale-125" />
                </button>
                <div className="text-center">
                  <p className="text-white text-base font-medium">Andrea Scardaci</p>
                  <p className="text-white/45 text-sm font-light">Web Designer & Developer</p>
                </div>
              </motion.div>
            </div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 0 }}
              animate={{ opacity: 1, x: 0, y: -64 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              {/* Photo panel — tall vertical frame sized to match the headline block, subtle parallax tied to scroll */}
              <motion.div
                style={{ y: videoY, scale: videoScale }}
                className="relative w-full aspect-[3/4] xl:aspect-[4/5]"
              >
                <img
                  src="/imageme.png.png"
                  alt="Andrea Scardaci"
                  className="absolute inset-0 w-full h-full object-cover object-top rounded-[2.5rem] border border-white/10"
                  style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}
                />
              </motion.div>

              {/* Floating badge — bottom, static after entrance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="hidden lg:flex absolute -bottom-16 left-1/2 -translate-x-1/2 items-center gap-2 bg-brand-accent rounded-full pl-2 pr-4 py-2 text-white whitespace-nowrap"
                style={{ boxShadow: '0 15px 35px rgba(34,197,94,0.3)' }}
              >
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Globe className="w-3 h-3 text-white" />
                </span>
                <div>
                  <p className="text-[9px] text-white/70 uppercase tracking-wider">Disponibile ora</p>
                  <p className="text-xs font-medium">Accetta nuovi clienti</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PERCHÉ UN SITO WEB ─── de-boxed list, circular medallions ── */}
      <section data-animated-bg-region className="section-padding text-white relative">
        {/* Slightly darkens the shared background (kept lighter in the hero) for text contrast */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="font-luxury text-4xl sm:text-5xl md:text-6xl leading-[1.15] text-white">
              {['Perché un sito web ', 'può far crescere', ' la tua attività?'].map((chunk, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-block ${i === 1 ? 'italic text-brand-accent' : ''}`}
                >
                  {chunk}
                </motion.span>
              ))}
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto border-t border-white/10">
            {reasons.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-8 py-10 border-b border-white/10"
              >
                <div className="flex items-start gap-6 sm:gap-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl text-white font-bold mb-1.5">{item.title}</h3>
                    <p className="text-white/45 text-base leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
                <item.Visual />
              </motion.div>
            ))}
          </div>

          {/* Cosa stai perdendo — de-boxed list, mirrors "Perché un sito web" above */}
          <div className="mt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="font-luxury text-4xl sm:text-5xl md:text-6xl leading-[1.15] text-white">
                Cosa potresti star perdendo{' '}
                <span className="italic text-rose-500" style={{ textShadow: '0 0 40px rgba(244,63,94,0.4)' }}>
                  senza un sito web?
                </span>
              </h2>
            </motion.div>

            <div className="max-w-5xl mx-auto border-t border-white/10">
              {losses.map((loss, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid grid-cols-1 ${loss.Visual ? 'lg:grid-cols-[1fr_auto] items-center gap-8' : ''} py-10 border-b border-white/10`}
                >
                  <div className="flex items-start gap-6 sm:gap-8">
                    <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0">
                      <X className="w-5 h-5 text-rose-500" />
                    </span>
                    <p className="text-white text-xl sm:text-2xl font-bold leading-relaxed pt-3 sm:pt-4">{loss.text}</p>
                  </div>
                  {loss.Visual && <loss.Visual />}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHI SONO ──────────────────────────────────── */}
      <section data-animated-bg-region className="section-padding text-white overflow-hidden relative border-t border-white/5">
        {/* Slightly darkens the shared background (kept lighter in the hero) for text contrast */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div
          className="hidden lg:block absolute top-0 right-0 w-[550px] h-[550px] bg-brand-accent/[0.07] rounded-full blur-[130px] pointer-events-none"
        />
        <div className="container-custom relative z-10 max-w-3xl lg:max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow mb-6 block">Chi sono</span>
            <h2 className="text-4xl md:text-6xl mb-8 lg:mb-12 leading-tight text-white font-bold">
              Andrea Scardaci
            </h2>

            {/* Desktop: photo on the left, text on the right. Mobile: stacked, photo first (unchanged). */}
            <div className="lg:grid lg:grid-cols-[400px_1fr] lg:gap-12 lg:items-start">
              <div className="relative max-w-md aspect-[7/5] rounded-3xl overflow-hidden border border-white/10 mb-10 lg:mb-0">
                <img
                  src="/imageme1.png.png"
                  alt="Andrea Scardaci"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 18%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
              </div>

              <div>
                <div className="space-y-5 text-white/85 text-lg font-luxury leading-relaxed mb-10">
                  <p>
                    Sono un web designer freelance con una missione chiara: portare le attività locali italiane nel mondo digitale con{' '}
                    <span className="text-white italic">eleganza e professionalità</span>.
                  </p>
                  <p>
                    Non mi limito a "fare siti". Creo vetrine digitali che riflettono l'anima della tua attività, che sia una palestra storica, un moderno studio di personal training o un centro yoga.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-10">
                  {['Web Design', 'UI/UX', 'SEO', 'Mobile First', 'Performance'].map((tag) => (
                    <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 text-white/40 text-xs tracking-wider font-light">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to="/chi-sono"
                  className="inline-flex items-center gap-2 text-white font-medium text-base group"
                >
                  Scopri di più su di me
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform text-brand-accent" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESSO ──────────────────────────────────── */}
      <section data-animated-bg-region className="section-padding text-white border-t border-white/5 relative">
        {/* Slightly darkens the shared background (kept lighter in the hero) for text contrast */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="eyebrow mb-4 block">Come lavoro</span>
            <h2 className="font-luxury text-4xl sm:text-5xl md:text-6xl leading-[1.15] text-white">
              Dal primo contatto <span className="italic text-brand-accent">al sito online</span>
            </h2>
          </motion.div>

          {/* Infinite scrolling line of steps — centered, no float, just a continuous loop.
              Pure CSS animation (not Framer Motion) so the loop reset never twitches, and a
              mask-image edge fade (not a painted overlay) so no box is visible against the
              animated background behind it. */}
          <div
            className="relative overflow-hidden py-4"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
          >
            <div
              className="animate-marquee-x flex items-start gap-12 sm:gap-20 w-max"
              style={{ animationDuration: '16s' }}
            >
              {[...process, ...process].map((item, i) => {
                const visual = PROCESS_VISUALS[i % process.length];
                return (
                  <div key={i} className="flex flex-col items-center gap-4 shrink-0">
                    <h3 className="text-white font-black text-lg sm:text-xl whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                      {item.title}
                    </h3>
                    <div
                      className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shrink-0"
                      style={{ boxShadow: '0 0 0 3px rgba(34,197,94,0.6), 0 18px 40px rgba(0,0,0,0.5)' }}
                    >
                      <img
                        src={visual.src}
                        alt={visual.alt}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO PREVIEW ─────────────────────────── */}
      <section className="section-padding bg-brand-paper">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="mb-16"
          >
            <span className="eyebrow mb-4 block">Portfolio</span>
            <h2 className="font-luxury text-4xl sm:text-5xl md:text-6xl leading-[1.15] text-brand-dark">
              Esempi di <span className="italic text-brand-accent">siti web</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {PROJECTS.map((project, index) => (
              <PortfolioTile
                key={project.id}
                title={project.title}
                image={project.image}
                link={project.link}
                index={index}
              />
            ))}
          </div>

          <div className="flex justify-center mt-14">
            <Link
              to="/esempi"
              className="group relative inline-flex items-center gap-3 bg-brand-dark text-white px-10 py-5 rounded-full font-medium text-base overflow-hidden hover:bg-brand-accent transition-colors duration-300"
              style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.15)' }}
            >
              <span className="relative z-10">Vedi tutti i lavori</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────── */}
      <section className="section-padding bg-brand-paper border-t border-brand-dark/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="eyebrow mb-4 block">Perché investire online</span>
            <h2 className="font-luxury text-3xl sm:text-4xl md:text-5xl leading-[1.15] text-brand-dark">
              Il tuo sito lavora <span className="italic text-brand-accent">per te</span>,{' '}
              <span className="lining-nums">24 ore su 24</span>
            </h2>
          </motion.div>

          {/* Showcase video — benefit card hangs off its bottom edge, mostly resting on the page background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative mx-auto w-full max-w-xl sm:max-w-2xl mb-32 sm:mb-20"
          >
            <div className="relative aspect-[7/5] rounded-[2rem] overflow-hidden border border-brand-dark/[0.08] bg-brand-dark/[0.04]">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/videos/benefits-showcase-poster.jpg"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/benefits-showcase.webm" type="video/webm" />
                <source src="/videos/benefits-showcase.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            <BenefitsStepper items={BENEFITS} icons={icons} />
          </motion.div>
        </div>
      </section>

      {/* ── PREVIEW GRATUITA (big standalone CTA) ─────── */}
      <section data-animated-bg-region className="section-padding text-white relative overflow-hidden">
        {/* Slightly darkens the shared background (kept lighter in the hero) for text contrast */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/[0.12] rounded-full blur-[140px] pointer-events-none"
        />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="relative max-w-3xl mx-auto text-center rounded-[2.5rem] border border-brand-accent/25 bg-brand-accent/[0.06] px-8 py-16 sm:px-16 sm:py-20"
            style={{ boxShadow: '0 40px 100px -30px rgba(34,197,94,0.25)' }}
          >
            <span className="eyebrow mb-5 block">Prova senza impegno</span>
            <h2 className="font-luxury text-4xl sm:text-5xl md:text-6xl leading-[1.15] mb-6 text-white">
              Ottieni la tua <span className="italic text-brand-accent">preview gratuita</span>.
            </h2>
            <p className="text-white/50 text-lg leading-relaxed font-light max-w-xl mx-auto mb-10">
              Ti mostro in anteprima un sito pensato per la tua attività, così vedi con i tuoi occhi come potrebbe diventare. Nessun impegno, nessun costo: né tu né la tua palestra dovete nulla in anticipo.
            </p>
            <button
              type="button"
              onClick={() => openModal('preview-gratuita')}
              className="group relative inline-flex items-center gap-3 bg-brand-accent text-white px-10 py-5 rounded-full font-medium text-base overflow-hidden"
              style={{ boxShadow: '0 0 30px rgba(34,197,94,0.35), 0 4px 15px rgba(34,197,94,0.2)' }}
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              Ottienila ora
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {avatarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setAvatarOpen(false)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] rounded-full overflow-hidden border border-white/15 shrink-0"
              style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
            >
              <img src="/images/andrea-selfie.webp" alt="Andrea Scardaci" className="w-full h-full object-cover object-[center_35%] scale-125" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
