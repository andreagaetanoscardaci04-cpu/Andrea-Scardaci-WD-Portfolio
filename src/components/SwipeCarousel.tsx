import React, { useRef, useState, Children } from 'react';

interface SwipeCarouselProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
  cardWidth?: string;
}

const SwipeCarousel: React.FC<SwipeCarouselProps> = ({ children, theme = 'light', cardWidth = '82%' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || items.length < 2) return;
    const cardStep = el.scrollWidth / items.length;
    const index = Math.round(el.scrollLeft / cardStep);
    setActive(Math.min(items.length - 1, Math.max(0, index)));
  };

  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardStep = el.scrollWidth / items.length;
    el.scrollTo({ left: cardStep * index, behavior: 'smooth' });
  };

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-6 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {items.map((child, i) => (
          <div key={i} className="snap-center shrink-0" style={{ width: cardWidth }}>
            {child}
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <div className="flex justify-center gap-2 mt-7">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Vai all'elemento ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i
                  ? 'w-6 bg-brand-accent'
                  : `w-1.5 ${theme === 'dark' ? 'bg-white/25' : 'bg-brand-dark/15'}`
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SwipeCarousel;
