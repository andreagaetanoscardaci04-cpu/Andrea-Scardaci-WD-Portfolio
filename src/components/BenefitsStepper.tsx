import React, { useState } from 'react';
import { motion, type PanInfo } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Benefit } from '../types';

interface BenefitsStepperProps {
  items: Benefit[];
  icons: Record<string, React.ComponentType<{ className?: string }>>;
}

const SWIPE_THRESHOLD = 60;

/**
 * Floating card hanging off the video's bottom edge (~10% overlap, 90% on the page background).
 * Swipe left/right to move through the benefits on touch devices; the arrow button covers mouse/desktop.
 */
const BenefitsStepper: React.FC<BenefitsStepperProps> = ({ items, icons }) => {
  const [index, setIndex] = useState(0);
  const current = items[index];
  const Icon = icons[current.icon];

  const advance = () => setIndex((i) => (i + 1) % items.length);
  const back = () => setIndex((i) => (i - 1 + items.length) % items.length);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) advance();
    else if (info.offset.x > SWIPE_THRESHOLD) back();
  };

  return (
    <div className="absolute left-1/2 bottom-0 w-[78%] max-w-[260px] sm:w-[300px] sm:max-w-[300px] -translate-x-1/2 translate-y-[85%] sm:translate-y-[78%]">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.35}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.98 }}
        className="relative rounded-2xl sm:rounded-[1.75rem] bg-white border border-brand-dark/[0.06] p-4 sm:p-5 cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ boxShadow: '0 24px 50px -20px rgba(10,14,12,0.28)' }}
      >
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-start gap-3"
        >
          <span className="w-10 h-10 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-brand-accent" />
          </span>
          <div className="min-w-0">
            <h3 className="font-luxury text-base sm:text-lg text-brand-dark mb-1 leading-tight">{current.title}</h3>
            <p className="text-brand-dark/50 text-xs sm:text-sm leading-snug font-light">{current.description}</p>
          </div>
        </motion.div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-dark/[0.07]">
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Vai al punto ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-brand-accent' : 'w-1.5 bg-brand-dark/15 hover:bg-brand-dark/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={advance}
            aria-label="Prossimo vantaggio"
            className="w-8 h-8 rounded-full bg-brand-dark/[0.06] text-brand-dark flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Swipe affordance — mobile only, hints the card is draggable */}
      <motion.div
        className="flex sm:hidden items-center justify-center gap-1 mt-3 text-brand-dark/25"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronRight className="w-3 h-3" />
        <span className="text-[11px] font-light tracking-wide">Scorri</span>
      </motion.div>
    </div>
  );
};

export default BenefitsStepper;
