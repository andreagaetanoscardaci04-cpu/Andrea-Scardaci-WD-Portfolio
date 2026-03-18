import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Search, Image, Phone, ArrowRight, Star, Globe, Zap, Palette, Clock } from 'lucide-react';
import { PROJECTS, BENEFITS } from '../constants';
import ProjectCard from '../components/ProjectCard';

const Home = () => {
  const icons: Record<string, any> = { ShieldCheck, Search, Image, Phone };

  const marqueeItems = [
    'Design Moderno', 'Siti Web Veloci', 'SEO Ottimizzato',
    'Mobile First', 'Alta Qualità', 'Prezzi Accessibili',
    'Palestre', 'Personal Training', 'Attività Locali',
  ];

  return (
    <div className="overflow-hidden">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-brand-dark overflow-hidden">

        {/* Radial spotlight from top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 110% 65% at 50% -5%, rgba(34,197,94,0.18) 0%, transparent 65%)',
          }}
        />

        {/* Animated orbs — desktop only (too GPU-heavy on mobile) */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute top-1/4 right-1/3 w-[650px] h-[650px] bg-brand-accent/25 rounded-full blur-[150px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 35, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="hidden lg:block absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-brand-accent/15 rounded-full blur-[130px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="hidden lg:block absolute -top-32 -left-32 w-[420px] h-[420px] bg-emerald-400/8 rounded-full blur-[100px] pointer-events-none"
        />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        <div className="container-custom relative z-10 pt-36 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-brand-accent/30 bg-brand-accent/10"
              >
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-brand-accent inline-block"
                  style={{ boxShadow: '0 0 8px rgba(34,197,94,0.8)' }}
                />
                <Zap className="w-3 h-3 text-brand-accent" />
                <span className="text-brand-accent text-xs uppercase tracking-[0.2em] font-medium">
                  Siti Web Professionali
                </span>
              </motion.div>

              <div className="mb-8 space-y-1">
                {['Un sito web', 'per far crescere', 'la tua attività.'].map((line, i) => (
                  <motion.h1
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-5xl md:text-7xl leading-[1.05] ${i === 1 ? 'text-brand-accent' : 'text-white'}`}
                  >
                    {line}
                  </motion.h1>
                ))}
              </div>

              {/* Mobile-only image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="lg:hidden relative aspect-square rounded-3xl overflow-hidden mb-8 shadow-2xl"
                style={{ boxShadow: '0 0 50px rgba(34,197,94,0.15), 0 30px 60px rgba(0,0,0,0.5)' }}
              >
                <img
                  src="/imageme.png.png"
                  alt="Andrea Scardaci"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="text-xl text-white lg:text-white/40 mb-10 max-w-md leading-relaxed"
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
                  style={{ boxShadow: '0 0 30px rgba(34,197,94,0.4), 0 4px 15px rgba(34,197,94,0.2)' }}
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
                  className="border border-white/15 text-white/80 px-8 py-5 lg:py-4 rounded-full font-medium text-base lg:text-sm flex items-center justify-center gap-2 hover:bg-white/5 hover:text-white transition-all"
                >
                  Guarda i miei lavori
                </Link>
              </motion.div>

              {/* Mini features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="flex flex-wrap items-center gap-3 mt-14 pt-10 border-t border-white/10"
              >
                {[
                  { icon: Zap, label: 'Sito online in 7 giorni' },
                  { icon: Palette, label: 'Design su misura' },
                  { icon: Search, label: 'SEO incluso' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <item.icon className="w-3.5 h-3.5 text-brand-accent" />
                    <span className="text-sm text-white/60 tracking-wide">{item.label}</span>
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
                  className="relative rounded-3xl overflow-hidden w-full h-full shadow-2xl"
                  style={{ boxShadow: '0 0 50px rgba(34,197,94,0.15), 0 30px 60px rgba(0,0,0,0.5)' }}
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
                className="hidden lg:block absolute -left-14 top-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-white"
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
          <span className="text-white/25 text-[10px] tracking-[0.25em] uppercase">Scorri</span>
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
      <div className="bg-brand-dark py-5 overflow-hidden border-y border-brand-accent/10">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="flex gap-10 whitespace-nowrap w-max"
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="text-xs uppercase tracking-[0.2em] text-white/30 font-medium flex items-center gap-10"
            >
              {item}
              <span className="w-1 h-1 rounded-full bg-brand-accent inline-block" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── COSA INCLUDE ──────────────────────────────── */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-brand-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">Ogni progetto</span>
            <h2 className="text-3xl md:text-5xl text-brand-dark">Cosa include ogni sito web</h2>
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
                className="p-10 rounded-3xl bg-brand-accent/10 border border-brand-accent/20 hover:bg-brand-accent/20 hover:border-brand-accent/40 transition-all group cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/20 group-hover:bg-brand-accent/30 flex items-center justify-center mb-8 transition-colors">
                  <item.icon className="w-5 h-5 text-brand-accent" />
                </div>
                <h3 className="text-2xl text-brand-dark mb-3">{item.title}</h3>
                <p className="text-brand-dark/60 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHI SONO ──────────────────────────────────── */}
      <section className="section-padding bg-brand-dark text-white overflow-hidden relative">
        <motion.div
          animate={{ x: [0, 25, 0], y: [0, -25, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute top-0 right-0 w-[550px] h-[550px] bg-brand-accent/10 rounded-full blur-[150px] pointer-events-none"
        />
        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-accent text-sm uppercase tracking-[0.2em] font-medium mb-6 block">Chi sono</span>
            <h2 className="text-4xl md:text-6xl mb-8 leading-tight text-white">
              Andrea Scardaci
            </h2>
            <div className="space-y-5 text-white text-lg leading-relaxed mb-10">
              <p>
                Sono un web designer freelance con una missione chiara: portare le attività locali italiane nel mondo digitale con{' '}
                <span className="font-bold">eleganza e professionalità</span>.
              </p>
              <p>
                Non mi limito a "fare siti". Creo vetrine digitali che riflettono l'anima della tua attività, che sia una palestra storica, un moderno studio di personal training o un centro yoga.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mb-10">
              {['Web Design', 'UI/UX', 'SEO', 'Mobile First', 'Performance'].map((tag) => (
                <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 text-white/40 text-xs tracking-wider">
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
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
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
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <span className="text-brand-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">Come lavoro</span>
            <h2 className="text-3xl md:text-5xl text-brand-dark">
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
                <h3 className="text-2xl text-white mb-3">{item.title}</h3>
                <p className="text-white/80 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO PREVIEW ─────────────────────────── */}
      <section className="section-padding bg-brand-accent-light/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-brand-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">Portfolio</span>
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
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <span className="text-brand-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">Perché investire online</span>
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
                  className="p-8 rounded-3xl border border-brand-dark/5 hover:border-brand-accent/20 hover:shadow-xl hover:shadow-brand-accent/5 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-brand-accent" />
                  </div>
                  <h3 className="text-2xl text-brand-dark mb-3">{benefit.title}</h3>
                  <p className="text-brand-dark/40 text-lg leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRICE ─────────────────────────────────────── */}
      <section className="section-padding bg-brand-dark text-white overflow-hidden relative">
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute bottom-0 left-0 w-[450px] h-[450px] bg-brand-accent/15 rounded-full blur-[130px] pointer-events-none"
        />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-accent text-sm uppercase tracking-[0.2em] font-medium mb-6 block">Pricing</span>
              <h2 className="text-4xl md:text-5xl mb-8 leading-tight text-white">
                Alta qualità, senza i costi delle agenzie.
              </h2>
              <p className="text-white/40 text-xl leading-relaxed mb-10">
                Grazie all'utilizzo di strumenti moderni e intelligenza artificiale posso offrire siti web professionali a una frazione del costo di un'agenzia tradizionale.
              </p>
              <Link
                to="/lavoriamo-insieme"
                className="inline-flex items-center gap-2 bg-brand-accent text-white px-8 py-4 rounded-full font-medium text-sm hover:bg-white hover:text-brand-dark transition-all"
              >
                Richiedi un preventivo
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Agenzia Web Tradizionale</p>
                  <p className="text-white text-lg">Preventivo medio</p>
                  <p className="text-white/35 text-xs mt-1">+ spese di gestione</p>
                </div>
                <p className="text-red-400 text-2xl font-semibold">€1.500+</p>
              </div>
              <div className="bg-brand-accent/20 border border-brand-accent/30 rounded-2xl p-6 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-brand-accent text-white text-xs px-3 py-1 rounded-full">
                  Il mio prezzo
                </div>
                <div>
                  <p className="text-brand-accent text-xs uppercase tracking-widest mb-1">Andrea Scardaci</p>
                  <p className="text-white text-lg">Qualità premium</p>
                  <p className="text-white/35 text-xs mt-1">+ spese di gestione</p>
                </div>
                <p className="text-brand-accent text-2xl font-semibold">€497</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] bg-brand-accent overflow-hidden p-16 md:p-24 text-center"
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
              <h2 className="text-4xl md:text-6xl text-white mb-6">
                Iniziamo a lavorare insieme?
              </h2>
              <p className="text-white/60 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
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
