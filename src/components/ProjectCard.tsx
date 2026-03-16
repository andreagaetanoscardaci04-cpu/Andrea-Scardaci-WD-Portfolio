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
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-8">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-2 block">
          {category}
        </span>
        <h3 className="text-2xl font-serif font-bold mb-3 text-brand-dark">
          {title}
        </h3>
        <p className="text-brand-dark/60 text-sm mb-6 line-clamp-2">
          {description}
        </p>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-brand-accent font-semibold text-sm group/btn"
          >
            Visualizza sito
            <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        ) : (
          <button className="flex items-center text-brand-dark font-semibold text-sm group/btn">
            Visualizza esempio
            <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

export default ProjectCard;
