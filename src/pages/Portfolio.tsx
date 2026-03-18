import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Layout, Globe } from 'lucide-react';
import { PROJECTS } from '../constants';
import ProjectCard from '../components/ProjectCard';

const Portfolio = () => {
  return (
    <div className="pt-32">
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mb-20">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-brand-dark">
              Esempi di siti web
            </h1>
            <p className="text-xl text-brand-dark/60 leading-relaxed">
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* Come funziona */}
      <section className="section-padding bg-brand-accent-light/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-brand-accent text-xs uppercase tracking-[0.2em] font-medium mb-4 block">Come funziona</span>
            <h2 className="text-4xl md:text-5xl text-brand-dark">Dal primo contatto al sito online</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', icon: MessageSquare, title: 'Parliamo', desc: 'Capisco la tua attività, i tuoi obiettivi e cosa vuoi comunicare ai tuoi clienti.' },
              { step: '02', icon: Layout, title: 'Progetto', desc: 'Realizzo un design moderno e professionale su misura per la tua identità visiva.' },
              { step: '03', icon: Globe, title: 'Online', desc: 'Il tuo sito è live, ottimizzato per tutti i dispositivi e pronto ad acquisire clienti.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="relative p-10 rounded-3xl bg-white border border-brand-accent/10 hover:border-brand-accent/30 hover:shadow-xl hover:shadow-brand-accent/5 transition-all group overflow-hidden"
              >
                <span className="absolute top-6 right-8 text-brand-accent/15 text-6xl font-medium select-none">{item.step}</span>
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 group-hover:bg-brand-accent/20 flex items-center justify-center mb-8 transition-colors">
                  <item.icon className="w-5 h-5 text-brand-accent" />
                </div>
                <h3 className="text-2xl text-brand-dark mb-3">{item.title}</h3>
                <p className="text-brand-dark/45 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
