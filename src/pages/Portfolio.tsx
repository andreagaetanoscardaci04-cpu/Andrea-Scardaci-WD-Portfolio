import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Layout, Globe } from 'lucide-react';
import { PROJECTS } from '../constants';
import ProjectCard from '../components/ProjectCard';
import HeroBackground from '../components/HeroBackground';

const Portfolio = () => {
  return (
    <div className="pt-32 overflow-hidden">
      {/* Code-generated animated background — same nebula shader as the homepage, shared by every section below. */}
      <HeroBackground className="fixed inset-0 w-full h-full -z-10" />

      <section data-animated-bg-region className="relative section-padding">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mb-20">
            <span className="eyebrow mb-4 block">Portfolio</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
              Esempi di siti web
            </h1>
            <p className="text-xl text-white/50 font-light leading-relaxed">
              Scopri come ho aiutato altre attività locali a migliorare la loro presenza online con design moderni e professionali.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                category={project.category}
                index={index}
                link={project.link}
                theme="dark"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Come funziona */}
      <section data-animated-bg-region className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="eyebrow mb-4 block">Come funziona</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Dal primo contatto al sito online</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { step: '01', icon: MessageSquare, title: 'Parliamo', desc: 'Capisco la tua attività, i tuoi obiettivi e cosa vuoi comunicare ai tuoi clienti.' },
              { step: '02', icon: Layout, title: 'Progetto', desc: 'Realizzo un design moderno e professionale su misura per la tua identità visiva.' },
              { step: '03', icon: Globe, title: 'Online', desc: 'Il tuo sito è live, ottimizzato per tutti i dispositivi e pronto ad acquisire clienti.' },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-10 rounded-3xl bg-white border border-brand-dark/[0.06] hover:border-brand-accent/25 transition-colors group"
              >
                <div className="absolute top-6 right-6 w-9 h-9 rounded-full bg-brand-accent/10 flex items-center justify-center">
                  <span className="text-brand-accent font-bold text-xs">{item.step}</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 group-hover:bg-brand-accent/20 flex items-center justify-center mb-8 transition-colors">
                  <item.icon className="w-5 h-5 text-brand-accent" />
                </div>
                <h3 className="text-2xl text-brand-dark font-bold mb-3">{item.title}</h3>
                <p className="text-brand-dark/45 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
