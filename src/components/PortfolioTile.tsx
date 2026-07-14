import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioTileProps {
  title: string;
  image: string;
  link?: string;
  index: number;
}

/** Premium square portfolio block — full-bleed photo, title only, single click-through. */
const PortfolioTile: React.FC<PortfolioTileProps> = ({ title, image, link, index }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="group relative block aspect-square rounded-[1.5rem] sm:rounded-[1.75rem] overflow-hidden"
    style={{ boxShadow: '0 24px 50px -18px rgba(10,14,12,0.4)' }}
  >
    <img
      src={image}
      alt={title}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.25)' }}
    />

    <span className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-colors duration-300">
      <ArrowUpRight className="w-4 h-4 text-white" />
    </span>

    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
      <h3 className="font-luxury text-white text-base sm:text-lg md:text-xl leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
        {title}
      </h3>
    </div>
  </motion.a>
);

export default PortfolioTile;
