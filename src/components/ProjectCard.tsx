import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  index: number;
  link?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, category, index, link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative mx-auto w-full max-w-[300px] text-center"
    >
      {/* The circle — pure photo, no text on top of it, so legibility is never a fight with the image */}
      <div className="relative mb-8">
        <span className="absolute -inset-1 rounded-full bg-brand-accent/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div
          className="relative aspect-square rounded-full overflow-hidden"
          style={{ boxShadow: '0 30px 60px -18px rgba(10,14,12,0.35)' }}
        >
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          {/* Glossy highlight — echoes the site's orb-icon sphere treatment */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3), rgba(255,255,255,0) 55%)' }}
          />
        </div>

        {/* Floating accent segment — riding the circle's edge */}
        <span
          className="absolute bottom-1 right-1 sm:bottom-3 sm:right-3 w-11 h-11 rounded-full bg-brand-accent border-[5px] border-white flex items-center justify-center scale-90 group-hover:scale-100 transition-transform z-10"
          style={{ boxShadow: '0 8px 20px rgba(34,197,94,0.4)' }}
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </span>
      </div>

      {/* Caption lives outside the circle entirely — plain type on the page, never fighting a photo for contrast */}
      <span className="text-xs font-light uppercase tracking-[0.2em] text-brand-accent mb-2 block">
        {category}
      </span>
      <h3 className="text-xl font-bold mb-2 text-brand-dark">
        {title}
      </h3>
      <p className="text-brand-dark/50 text-sm font-light mb-5 line-clamp-2 max-w-[240px] mx-auto">
        {description}
      </p>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center text-brand-accent font-semibold text-sm group/btn"
        >
          Visualizza sito
          <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      ) : (
        <button className="inline-flex items-center justify-center text-brand-dark font-semibold text-sm group/btn">
          Visualizza esempio
          <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      )}
    </motion.div>
  );
};

export default ProjectCard;
