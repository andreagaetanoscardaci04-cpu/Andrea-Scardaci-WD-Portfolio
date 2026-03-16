import React from 'react';
import { motion } from 'motion/react';
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

      {/* Testimonial Placeholder */}
      <section className="section-padding bg-brand-accent-light/30">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-brand-dark italic">
              "Andrea ha capito perfettamente lo spirito della mia palestra. Il sito è bellissimo e i clienti mi fanno continuamente i complimenti per la semplicità con cui trovano le informazioni."
            </h2>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" alt="Client" referrerPolicy="no-referrer" />
              </div>
              <div className="text-left">
                <p className="font-bold text-brand-dark">Marco Rossi</p>
                <p className="text-brand-dark/60 text-sm">Titolare, FitLife Studio</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
