import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Search, Image, Phone, ArrowRight, ArrowUpRight, Globe, Zap, Palette, Check, LifeBuoy } from 'lucide-react';
import { PROJECTS, BENEFITS } from '../constants';
import ProjectCard from '../components/ProjectCard';

const Home = () => {
  const icons: Record<string, any> = { ShieldCheck, Search, Image, Phone };

  const marqueeItems = [
    'Design Moderno', 'Siti Web Veloci', 'SEO Ottimizzato',
    'Mobile First', 'Alta Qualità', 'Prezzi Accessibili',
    'Palestre', 'Personal Training', 'Attività Locali',
  ];

  const stats = [
    { value: '7', suffix: ' giorni', label: 'Tempo medio di consegna' },
    { value: '100', suffix: '%', label: 'Design su misura, mai un template' },
    { value: '0', suffix: '€', label: 'Canoni mensili obbligatori' },
  ];

  return (
    <div className="overflow-hidden">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-brand-dark overflow-hidden">

        {/* Radial spotlight from top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 110% 65% at 50% -5%, rgba(34,197,94,0.14) 0%, transparent 65%)',
          }}
        />

        {/* Signature light beam — diagonal sweep, white-hot core fading to green */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="hidden lg:block absolute top-0 right-0 w-[55%] h-full pointer-events-none"
          style={{
            background: 'linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.06) 44%, rgba(255,255,255,0.16) 50%, rgba(34,197,94,0.14) 58%, transparent 72%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Animated orbs — desktop only (too GPU-heavy on mobile) */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute top-1/4 right-1/3 w-[650px] h-[650px] bg-brand-accent/20 rounded-full blur-[150px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 35, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="hidden lg:block absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[130px] pointer-events-none"
        />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        <div className="container-custom relative z-10 pt-32 pb-16 md:pt-36 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 mb-8 pl-2 pr-4 py-2 rounded-full border border-white/10 bg-white/[0.04]"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden border border-white/15 shrink-0">
                  <img src="/imageme.png.png" alt="" className="w-full h-full object-cover object-top" />
                </div>
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block"
                  style={{ boxShadow: '0 0 8px rgba(34,197,94,0.8)' }}
                />
                <span className="text-white/60 text-xs uppercase tracking-[0.2em] font-light">
                  Disponibile per nuovi progetti
                </span>
              </motion.div>

              <div className="mb-8 space-y-1">
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] font-black text-white"
                >
                  Un sito web
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.33, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] font-extralight italic text-brand-accent"
                >
                  per far crescere
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.51, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] font-black text-white"
                >
                  la tua attività.
                </motion.h1>
              </div>

              {/* Mobile-only image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="lg:hidden relative aspect-square rounded-3xl overflow-hidden mb-8 shadow-2xl border border-white/10"
                style={{ boxShadow: '0 0 50px rgba(34,197,94,0.12), 0 30px 60px rgba(0,0,0,0.5)' }}
              >
                <img
                  src="/imageme.png.png"
                  alt="Andrea Scardaci"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/15 rounded-full pl-2 pr-4 py-2">
                    <div className="w-7 h-7 rounded-full bg-brand-accent/30 flex items-center justify-center shrink-0">
                      <Globe className="w-3.5 h-3.5 text-brand-accent" />
                    </div>
                    <span className="text-[11px] text-white font-light">Online in 7 giorni</span>
                  </div>
                  <span className="flex items-center gap-1.5 bg-brand-accent rounded-full px-3 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="text-[10px] text-white font-medium uppercase tracking-wide">Attivo</span>
                  </span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="text-lg md:text-xl text-white/55 font-light mb-10 max-w-md leading-relaxed"
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
                  <motion.span
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.45 }}
                  />
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

              {/* Stats strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="grid grid-cols-3 gap-4 sm:gap-8 mt-14 pt-10 border-t border-white/10"
              >
                {stats.map((s, i) => (
                  <div key={i}>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                      {s.value}<span className="text-brand-accent">{s.suffix}</span>
                    </p>
                    <p className="text-white/35 text-[11px] sm:text-xs uppercase tracking-wider mt-1.5 font-light leading-snug">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              {/* Main photo */}
              <div className="relative aspect-[3/4] lg:aspect-[4/5]">
                {/* Pulsing glow behind photo */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.98, 1.02, 0.98] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-4 rounded-[2.5rem] bg-brand-accent/15 blur-2xl pointer-events-none"
                />
                <div
                  className="relative rounded-3xl overflow-hidden w-full h-full shadow-2xl border border-white/10"
                  style={{ boxShadow: '0 0 50px rgba(34,197,94,0.12), 0 30px 60px rgba(0,0,0,0.5)' }}
                >
                  <img
                    src="/imageme.png.png"
                    alt="Andrea Scardaci"
                    loading="eager"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating card — top left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="hidden lg:block absolute -left-14 top-10 bg-white/[0.06] backdrop-blur-xl border border-white/15 rounded-2xl p-4 text-white"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-full bg-brand-accent/30 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-[11px] text-white/40 uppercase tracking-wider">Sito online</p>
                    <p className="text-sm font-medium">In 7 giorni</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating badge — bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.5 }}
                className="hidden lg:block absolute -bottom-6 left-8 bg-brand-accent rounded-2xl px-5 py-3 text-white"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                  <p className="text-[11px] text-white/60 uppercase tracking-wider">Disponibile ora</p>
                  <p className="text-sm font-medium mt-0.5">Accetta nuovi clienti</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-white/25 text-[10px] tracking-[0.25em] uppercase font-light">Scorri</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-brand-accent"
            />
          </div>
        </motion.div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────── */}
      <div className="bg-brand-dark py-5 overflow-hidden border-t border-white/5">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="flex gap-10 whitespace-nowrap w-max"
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

      {/* ── COSA INCLUDE ──────────────────────────────── */}
      <section className="section-padding bg-brand-dark text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="eyebrow mb-4 block">Ogni progetto</span>
            <h2 className="text-3xl md:text-5xl text-white">Cosa include ogni sito web</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Veloce per definizione',
                desc: 'Tempi di caricamento ottimizzati al millisecondo. I tuoi visitatori non aspetteranno mai.',
              },
              {
                icon: Palette,
                title: 'Design su misura',
                desc: 'Nessun template generico. Ogni sito è progettato attorno all\'identità visiva della tua attività.',
              },
              {
                icon: Search,
                title: 'SEO già incluso',
                desc: 'Struttura tecnica ottimizzata per Google fin dal primo giorno, senza costi aggiuntivi.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="card-bento p-10 group cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 group-hover:bg-brand-accent/20 flex items-center justify-center mb-8 transition-colors">
                  <item.icon className="w-5 h-5 text-brand-accent" />
                </div>
                <h3 className="text-2xl text-white font-bold mb-3">{item.title}</h3>
                <p className="text-white/45 text-base leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHI SONO ──────────────────────────────────── */}
      <section className="section-padding bg-brand-dark text-white overflow-hidden relative border-t border-white/5">
        <motion.div
          animate={{ x: [0, 25, 0], y: [0, -25, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute top-0 right-0 w-[550px] h-[550px] bg-brand-accent/10 rounded-full blur-[150px] pointer-events-none"
        />
        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
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
      <section className="section-padding bg-brand-dark text-white border-t border-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <span className="eyebrow mb-4 block">Come lavoro</span>
            <h2 className="text-3xl md:text-5xl text-white">
              Dal primo contatto al sito online
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Parliamo', desc: 'Capisco la tua attività, i tuoi obiettivi e cosa vuoi comunicare ai tuoi clienti.', icon: '💬' },
              { step: '02', title: 'Progetto', desc: 'Realizzo un design moderno e professionale su misura per la tua identità visiva.', icon: '✦' },
              { step: '03', title: 'Online', desc: 'Il tuo sito è live, ottimizzato per tutti i dispositivi e pronto ad acquisire clienti.', icon: '🚀' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="relative p-10 rounded-3xl bg-brand-accent hover:bg-brand-accent/90 border border-brand-accent transition-all group overflow-hidden"
              >
                <span className="absolute top-6 right-8 text-white/15 text-6xl font-medium select-none">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-xl mb-8">
                  {item.icon}
                </div>
                <h3 className="text-2xl text-white font-black mb-3">{item.title}</h3>
                <p className="text-white text-lg leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO PREVIEW ─────────────────────────── */}
      <section className="section-padding bg-brand-paper">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-14"
          >
            <Link
              to="/esempi"
              className="group relative inline-flex items-center gap-3 bg-brand-dark text-white px-10 py-5 rounded-full font-medium text-base overflow-hidden hover:bg-brand-accent transition-colors duration-300"
              style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.15)' }}
            >
              <motion.span
                className="absolute inset-0 bg-brand-accent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.35 }}
              />
              <span className="relative z-10">Vedi tutti i lavori</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────── */}
      <section className="section-padding bg-brand-paper border-t border-brand-dark/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <span className="eyebrow mb-4 block">Perché investire online</span>
            <h2 className="text-3xl md:text-5xl text-brand-dark">
              Il tuo sito lavora per te, 24h su 24
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((benefit, index) => {
              const Icon = icons[benefit.icon];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl bg-white border border-brand-dark/[0.06] hover:border-brand-accent/25 hover:shadow-xl hover:shadow-brand-accent/5 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-brand-accent" />
                  </div>
                  <h3 className="text-2xl text-brand-dark mb-3">{benefit.title}</h3>
                  <p className="text-brand-dark/40 text-lg leading-relaxed font-light">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OFFERTE / PRICING ─────────────────────────── */}
      <section className="section-padding bg-brand-dark text-white overflow-hidden relative">
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute bottom-0 left-0 w-[450px] h-[450px] bg-brand-accent/15 rounded-full blur-[130px] pointer-events-none"
        />
        <div className="container-custom relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
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
              ].map((offer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className={`relative rounded-3xl p-8 flex flex-col transition-all ${
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
                  <ul className="space-y-2 mb-8 flex-1">
                    {offer.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-3 text-sm text-white/60 font-light">
                        <Check className="w-4 h-4 text-brand-accent flex-shrink-0" />
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
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Custom offer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-dashed border-white/15 p-8 sm:p-10 flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-6"
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
          </motion.div>

          {/* ── SUPPORTO (elevated panel on the same dark canvas) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] sm:rounded-[3rem] bg-brand-dark-elevated border border-white/[0.06] overflow-hidden p-8 sm:p-12 md:p-20 mt-16 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-8 lg:gap-14"
          >
            <motion.div
              animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden lg:block absolute -top-20 -right-20 w-[400px] h-[400px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none"
            />

            <div className="relative z-10 mx-auto lg:mx-0 shrink-0 w-16 h-16 rounded-2xl bg-brand-accent/15 border border-brand-accent/30 flex items-center justify-center">
              <LifeBuoy className="w-7 h-7 text-brand-accent" />
            </div>

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
              className="relative z-10 mx-auto lg:mx-0 shrink-0 inline-flex items-center justify-center gap-2 bg-brand-accent text-white px-8 py-4 rounded-full font-medium text-sm hover:bg-white hover:text-brand-dark transition-all whitespace-nowrap"
            >
              Scopri il supporto
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] sm:rounded-[3rem] bg-brand-accent overflow-hidden p-10 sm:p-16 md:p-24 text-center"
            style={{ boxShadow: '0 0 80px rgba(34,197,94,0.25), 0 40px 80px rgba(0,0,0,0.1)' }}
          >
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 9, repeat: Infinity }}
              className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2] }}
              transition={{ duration: 7, repeat: Infinity, delay: 1 }}
              className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-[100px] pointer-events-none"
            />
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

    </div>
  );
};

export default Home;
