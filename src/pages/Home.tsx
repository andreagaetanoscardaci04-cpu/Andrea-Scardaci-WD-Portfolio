import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Search, Image, Phone, ArrowRight, ArrowUpRight, Globe, TrendingUp, Award, X, Check, LifeBuoy, MessageCircle, Sparkles, Rocket } from 'lucide-react';
import { PROJECTS, BENEFITS } from '../constants';
import ProjectCard from '../components/ProjectCard';
import { GoogleListingCompare, SeoRankingGraphic, PerceivedValueGraphic, CompetitorReactionCompare, PerformanceMetricsCompare, BrandImageCompare } from '../components/ReasonGraphics';
import HeroBackground from '../components/HeroBackground';

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

/** Photo treatment for the "Come lavoro" process cards — keyed by step index, added one at a time as artwork comes in. */
const PROCESS_VISUALS: Record<number, { src: string; alt: string }> = {
  0: { src: '/images/processo-parliamo.webp', alt: 'Videochiamata di consulenza iniziale con un titolare di palestra' },
  1: { src: '/images/processo-progetto.webp', alt: 'Progettazione del design del sito su schermo' },
  2: { src: '/images/processo-online.webp', alt: 'Sito web live su laptop, tablet e smartphone dopo il lancio' },
};

const Home = () => {
  const icons: Record<string, any> = { ShieldCheck, Search, Image, Phone };

  const [avatarOpen, setAvatarOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const videoY = useTransform(heroScroll, [0, 1], [0, 140]);
  const videoScale = useTransform(heroScroll, [0, 1], [1, 1.12]);

  const marqueeItems = [
    'Design Moderno', 'Siti Web Veloci', 'SEO Ottimizzato',
    'Mobile First', 'Alta Qualità', 'Prezzi Accessibili',
    'Palestre', 'Personal Training', 'Attività Locali',
  ];

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
    { step: '01', title: 'Parliamo', desc: 'Capisco la tua attività, i tuoi obiettivi e cosa vuoi comunicare ai tuoi clienti.', icon: MessageCircle },
    { step: '02', title: 'Progetto', desc: 'Realizzo un design moderno e professionale su misura per la tua identità visiva.', icon: Sparkles },
    { step: '03', title: 'Online', desc: 'Il tuo sito è live, ottimizzato per tutti i dispositivi e pronto ad acquisire clienti.', icon: Rocket },
  ];

  const offers = [
    {
      pages: '1 Landing Page',
      activation: 599,
      popular: false,
      features: ['Assistenza personale', 'Dominio personalizzato', 'Hosting incluso', 'SEO ottimizzato', 'Design su misura'],
    },
    {
      pages: '3 Pagine',
      activation: 899,
      popular: true,
      features: ['Assistenza personale', 'Dominio personalizzato', 'Hosting incluso', 'SEO ottimizzato', 'Design su misura'],
    },
    {
      pages: '5 Pagine',
      activation: 1199,
      popular: false,
      features: ['Assistenza personale', 'Dominio personalizzato', 'Hosting incluso', 'SEO ottimizzato', 'Design su misura'],
    },
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
                <Link
                  to="/lavoriamo-insieme"
                  className="group relative bg-brand-accent text-white px-8 py-5 lg:py-4 rounded-full font-medium text-base lg:text-sm flex items-center justify-center gap-2 overflow-hidden"
                  style={{ boxShadow: '0 0 30px rgba(34,197,94,0.35), 0 4px 15px rgba(34,197,94,0.2)' }}
                >
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                  Iniziamo a lavorare insieme
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                </Link>
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
              {/* Photo panel — short horizontal frame, rounded directly on the photo (same treatment as mobile), subtle parallax tied to scroll */}
              <motion.div
                style={{ y: videoY, scale: videoScale }}
                className="relative mx-auto max-w-[440px] aspect-[7/5]"
              >
                <img
                  src="/imageme.png.png"
                  alt="Andrea Scardaci"
                  className="absolute inset-0 w-full h-full object-cover object-top scale-75 rounded-[2.5rem] border border-white/10"
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

      {/* ── MARQUEE ──────────────────────────────────── */}
      <div data-animated-bg-region className="relative py-5 overflow-hidden border-t border-white/5">
        {/* Slightly darkens the shared background (kept lighter in the hero) for text contrast */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="relative z-10 flex gap-10 whitespace-nowrap w-max"
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="text-xs uppercase tracking-[0.2em] text-white/25 font-light flex items-center gap-10"
            >
              {item}
              <span className="w-1 h-1 rounded-full bg-brand-accent inline-block" />
            </span>
          ))}
        </motion.div>
      </div>

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
            <span className="eyebrow mb-5 block">Perché un sito web</span>
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
              <span className="eyebrow mb-5 block text-rose-400">Cosa può succedere</span>
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
        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow mb-6 block">Chi sono</span>
            <h2 className="text-4xl md:text-6xl mb-8 leading-tight text-white font-bold">
              Andrea Scardaci
            </h2>
            <div className="space-y-5 text-white/60 text-lg font-light leading-relaxed mb-10">
              <p>
                Sono un web designer freelance con una missione chiara: portare le attività locali italiane nel mondo digitale con{' '}
                <span className="text-white font-normal">eleganza e professionalità</span>.
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[7/5] rounded-3xl overflow-hidden border border-white/10">
              <img
                src="/imageme1.png.png"
                alt="Andrea Scardaci"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
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
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <span className="eyebrow mb-4 block">Come lavoro</span>
            <h2 className="text-3xl md:text-5xl text-white">
              Dal primo contatto al sito online
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {process.map((item, i) => {
              const visual = PROCESS_VISUALS[i];
              return (
              <div
                key={i}
                className="relative rounded-[2rem] bg-brand-accent hover:bg-brand-accent/90 border border-brand-accent transition-colors group overflow-hidden"
              >
                {visual && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={visual.src}
                      alt={visual.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-accent via-brand-accent/10 to-transparent" />
                  </div>
                )}

                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center z-10">
                  <span className="text-white font-bold text-sm">{item.step}</span>
                </div>

                <div className={visual ? 'relative px-10 pb-10 -mt-10' : 'relative p-10'}>
                  {!visual && (
                    <OrbIcon size="w-14 h-14" ring="border-white/30" className="mb-8">
                      <item.icon className="w-6 h-6 text-white" />
                    </OrbIcon>
                  )}
                  <h3 className="text-2xl text-white font-black mb-3">{item.title}</h3>
                  <p className="text-white text-lg leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
              );
            })}
          </motion.div>
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
            <h2 className="text-4xl md:text-5xl text-brand-dark">
              Esempi di siti web
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                category={project.category}
                index={index}
                link={project.link}
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
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <span className="eyebrow mb-4 block">Perché investire online</span>
            <h2 className="text-3xl md:text-5xl text-brand-dark">
              Il tuo sito lavora per te, 24h su 24
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {BENEFITS.map((benefit, index) => {
              const Icon = icons[benefit.icon];
              return (
                <div
                  key={index}
                  className="p-8 rounded-[1.75rem] border border-brand-dark/[0.06] hover:border-brand-accent/25 transition-colors"
                >
                  <OrbIcon size="w-12 h-12" ring="border-brand-accent/30" tint="bg-brand-accent/10" className="mb-6">
                    <Icon className="w-5 h-5 text-brand-accent" />
                  </OrbIcon>
                  <h3 className="text-2xl text-brand-dark mb-3">{benefit.title}</h3>
                  <p className="text-brand-dark/40 text-lg leading-relaxed font-light">{benefit.description}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── OFFERTE / PRICING ─────────────────────────── */}
      <section data-animated-bg-region className="section-padding text-white overflow-hidden relative">
        {/* Slightly darkens the shared background (kept lighter in the hero) for text contrast */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div
          className="hidden lg:block absolute bottom-0 left-0 w-[420px] h-[420px] bg-brand-accent/10 rounded-full blur-[110px] pointer-events-none"
        />
        <div className="container-custom relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="eyebrow mb-4 block">Offerte</span>
            <h2 className="text-4xl md:text-5xl mb-6 leading-tight text-white">
              Alta qualità, senza i costi delle agenzie.
            </h2>
            <p className="text-white/40 text-xl leading-relaxed font-light">
              Scegli il piano più adatto alla tua attività.
            </p>
          </motion.div>

          {/* Offers grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            {offers.map((offer, i) => (
              <div
                key={i}
                className={`relative rounded-3xl p-8 flex flex-col transition-colors ${
                  offer.popular
                    ? 'bg-brand-accent/[0.12] border border-brand-accent/40'
                    : 'card-bento'
                }`}
              >
                {offer.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-accent text-white text-xs px-4 py-1 rounded-full whitespace-nowrap">
                    Più consigliato
                  </div>
                )}
                <p className={`text-xs uppercase tracking-widest mb-4 font-light ${offer.popular ? 'text-brand-accent' : 'text-white/40'}`}>
                  {offer.pages}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">€{offer.activation}</span>
                  <span className="text-white/40 text-sm ml-1 font-light">prezzo unico</span>
                </div>

                <p className={`text-xs uppercase tracking-widest mb-3 font-light ${offer.popular ? 'text-brand-accent/80' : 'text-white/30'}`}>
                  Cosa include
                </p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {offer.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm text-white/60 font-light">
                      <span className="w-4 h-4 rounded-full bg-brand-accent/15 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-brand-accent" />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/lavoriamo-insieme"
                  className={`text-center py-3 rounded-full font-medium text-sm transition-all ${
                    offer.popular
                      ? 'bg-brand-accent text-white hover:bg-white hover:text-brand-dark'
                      : 'border border-white/15 text-white hover:bg-white/5'
                  }`}
                >
                  Inizia ora
                </Link>
              </div>
            ))}
          </motion.div>

          {/* Custom offer — faceted, cut-corner polygon instead of a plain rounded box */}
          <div
            className="border border-dashed border-white/20 p-8 sm:p-10 flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-6"
            style={{
              clipPath: 'polygon(28px 0, calc(100% - 28px) 0, 100% 28px, 100% calc(100% - 28px), calc(100% - 28px) 100%, 28px 100%, 0 calc(100% - 28px), 0 28px)',
            }}
          >
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2 font-light">Offerta su misura</p>
              <h3 className="text-white text-2xl font-medium mb-2">Hai una richiesta specifica?</h3>
              <p className="text-white/40 text-base font-light">Mandami un messaggio e riceverai un prezzo e un'offerta personalizzata su misura per te.</p>
            </div>
            <Link
              to="/lavoriamo-insieme"
              className="shrink-0 inline-flex items-center gap-2 bg-brand-accent text-white px-8 py-4 rounded-full font-medium text-sm hover:bg-white hover:text-brand-dark transition-all"
            >
              Scrivimi ora
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ── SUPPORTO (elevated panel on the same dark canvas) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative rounded-[2rem] sm:rounded-[3rem] bg-brand-dark-elevated border border-white/[0.06] p-8 sm:p-12 md:p-20 mt-16 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-8 lg:gap-14"
          >
            <OrbIcon size="w-16 h-16" ring="border-brand-accent/35" tint="bg-brand-accent/15" className="relative z-10 mx-auto lg:mx-0 shrink-0">
              <LifeBuoy className="w-7 h-7 text-brand-accent" />
            </OrbIcon>

            <div className="relative z-10 text-center lg:text-left">
              <span className="eyebrow mb-4 block">Dopo il lancio</span>
              <h2 className="text-3xl md:text-4xl text-white mb-4 leading-snug">
                Un sito web ha bisogno di chi se ne prende cura.
              </h2>
              <p className="text-white/40 text-lg leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
                Con il tempo la tua attività cambia, e il sito deve poterla seguire: nuove offerte, foto aggiornate, sezioni da modificare. Offro un servizio di assistenza dedicata, su misura per le modifiche di cui hai davvero bisogno.
              </p>
            </div>

            <Link
              to="/supporto"
              className="group relative z-10 mx-auto lg:mx-0 shrink-0 inline-flex items-center gap-3 bg-brand-accent text-white pl-2 pr-6 py-2 rounded-full font-medium text-sm hover:bg-white transition-all whitespace-nowrap"
              style={{ boxShadow: '0 10px 25px rgba(34,197,94,0.25)' }}
            >
              <span className="w-9 h-9 rounded-full bg-white/20 group-hover:bg-brand-accent/15 flex items-center justify-center transition-colors">
                <LifeBuoy className="w-4 h-4 text-white group-hover:text-brand-accent transition-colors" />
              </span>
              <span className="group-hover:text-brand-dark transition-colors">Scopri il supporto</span>
              <ChevronRight className="w-4 h-4 group-hover:text-brand-dark group-hover:translate-x-0.5 transition-all" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── FINAL CTA ─── large orbit rings echo the planet-icon motif ── */}
      <section className="section-padding relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 w-[620px] h-[620px] sm:w-[820px] sm:h-[820px] rounded-full border border-brand-accent/15 pointer-events-none"
          style={{ transform: 'translate(-50%, -52%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[520px] h-[210px] sm:w-[700px] sm:h-[280px] rounded-full border border-brand-accent/20 pointer-events-none"
          style={{ transform: 'translate(-50%, -50%) rotate(-10deg)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(34,197,94,0.09), transparent 70%)' }}
        />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative rounded-[2rem] sm:rounded-[3rem] bg-brand-accent overflow-hidden p-10 sm:p-16 md:p-24 text-center"
            style={{ boxShadow: '0 0 80px rgba(34,197,94,0.25), 0 40px 80px rgba(0,0,0,0.1)' }}
          >
            <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-white/10 rounded-full blur-[110px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-6xl text-white mb-6">
                Iniziamo a lavorare insieme?
              </h2>
              <p className="text-white/60 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed font-light">
                Raccontami la tua attività e ti mostrerò come posso aiutarti a crescere online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/lavoriamo-insieme"
                  className="bg-white text-brand-accent px-10 py-4 rounded-full font-medium hover:bg-brand-dark hover:text-white transition-all"
                >
                  Inizia ora
                </Link>
                <Link
                  to="/contatti"
                  className="border border-white/25 text-white px-10 py-4 rounded-full font-medium hover:bg-white/10 transition-all"
                >
                  Contattami
                </Link>
              </div>
            </div>
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
