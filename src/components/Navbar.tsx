import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowUpRight, Instagram, Mail, X } from 'lucide-react';

/** Builds a smooth cubic-bezier path through a series of points (Catmull-Rom → Bezier). */
const smoothPath = (points: [number, number][]) => {
  let d = `M ${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
  }
  return d;
};

/** One wavy strand: a sine wave whose amplitude pinches in toward `pinchX`, so many
 * strands drawn together read as converging threads — like the reference image. */
const wavePath = (width: number, baseY: number, amplitude: number, freq: number, phase: number, pinchX: number) => {
  const samples = 36;
  const points: [number, number][] = [];
  for (let i = 0; i <= samples; i++) {
    const x = (i / samples) * width;
    const envelope = 1 - 0.72 * Math.exp(-(((x - pinchX) / (width * 0.16)) ** 2));
    const y = baseY + amplitude * envelope * Math.sin((x / width) * Math.PI * 2 * freq + phase);
    points.push([x, y]);
  }
  return smoothPath(points);
};

const WAVE_WIDTH = 260;
const WAVE_HEIGHT = 66;
const WAVE_LINES = 13;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const waveLines = useMemo(() => {
    const mid = (WAVE_LINES - 1) / 2;
    return Array.from({ length: WAVE_LINES }, (_, i) => {
      const baseY = 6 + (i * (WAVE_HEIGHT - 12)) / (WAVE_LINES - 1);
      const amplitude = 10 + 5 * Math.sin(i * 0.75);
      const phase = i * 0.13;
      const opacity = 0.1 + 0.26 * (1 - Math.abs(i - mid) / mid);
      return {
        d: wavePath(WAVE_WIDTH, baseY, amplitude, 1.15, phase, WAVE_WIDTH * 0.58),
        opacity,
      };
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Chi Sono', path: '/chi-sono' },
    { name: 'Esempi', path: '/esempi' },
    { name: 'Lavoriamo Insieme', path: '/lavoriamo-insieme' },
    { name: 'Supporto', path: '/supporto' },
    { name: 'Contatti', path: '/contatti' },
  ];

  const lightHeader = !scrolled && !isOpen;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || isOpen ? 'bg-white/90 backdrop-blur-md py-2.5 md:py-4 shadow-sm' : 'bg-transparent py-3 md:py-6'
        }`}
      >
        <div className="container-custom flex justify-between items-center">
          <Link to="/" className={`flex items-baseline gap-1 md:gap-1.5 text-base md:text-2xl tracking-tight transition-colors duration-300 ${lightHeader ? 'text-white' : 'text-brand-dark'}`}>
            <span className="font-thin">Andrea</span>
            <span className="font-light text-brand-accent">Scardaci</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-light tracking-wide transition-colors hover:text-brand-accent ${
                  lightHeader
                    ? 'text-white/80'
                    : location.pathname === link.path ? 'text-brand-accent' : 'text-brand-dark/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/lavoriamo-insieme"
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center group ${
                lightHeader
                  ? 'bg-white/10 border border-white/25 text-white hover:bg-brand-accent hover:border-brand-accent'
                  : 'bg-brand-dark text-white hover:bg-brand-accent'
              }`}
            >
              Inizia Ora
              <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Toggle — thin uneven bars, premium editorial feel */}
          <button
            className={`md:hidden relative w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isOpen || !lightHeader ? 'bg-brand-dark/5' : 'bg-white/10'
            }`}
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className={isOpen || !lightHeader ? 'text-brand-dark w-4 h-4' : 'text-white w-4 h-4'} />
            ) : (
              <span className="flex flex-col items-end gap-[4px]">
                <span className={`block h-[1.5px] w-4 rounded-full ${!lightHeader ? 'bg-brand-dark' : 'bg-white'}`} />
                <span className={`block h-[1.5px] w-3 rounded-full ${!lightHeader ? 'bg-brand-accent' : 'bg-brand-accent'}`} />
                <span className={`block h-[1.5px] w-4 rounded-full ${!lightHeader ? 'bg-brand-dark' : 'bg-white'}`} />
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-brand-dark md:hidden overflow-hidden"
          >
            {/* Ambient glow + dot grid — echoes the hero */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 120% 55% at 50% -10%, rgba(34,197,94,0.18) 0%, transparent 65%)' }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
            />
            <motion.div
              animate={{ x: [0, 20, 0], y: [0, -16, 0] }}
              transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/3 -right-24 w-72 h-72 bg-brand-accent/20 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="relative h-full flex flex-col justify-between pt-32 pb-10 px-8 overflow-y-auto">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="eyebrow mb-6 block"
                >
                  Menu
                </motion.span>
                <div className="flex flex-col">
                  {navLinks.map((link, i) => {
                    const active = location.pathname === link.path;
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="border-b border-white/10"
                      >
                        <Link
                          to={link.path}
                          className="group flex items-center gap-4 py-3"
                        >
                          <span className={`text-xs font-light tabular-nums transition-colors ${active ? 'text-brand-accent' : 'text-white/25'}`}>
                            0{i + 1}
                          </span>
                          <span className={`flex-1 text-2xl font-thin tracking-tight transition-colors ${active ? 'text-brand-accent' : 'text-white'}`}>
                            {link.name}
                          </span>
                          {active && (
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" style={{ boxShadow: '0 0 8px rgba(34,197,94,0.8)' }} />
                          )}
                          <span
                            className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                              active
                                ? 'bg-brand-accent border-brand-accent'
                                : 'border-white/15 group-active:border-brand-accent group-active:bg-brand-accent'
                            }`}
                          >
                            <ArrowUpRight className={`w-3.5 h-3.5 transition-transform duration-300 ${active ? 'text-white' : 'text-white/50 group-active:text-white group-active:translate-x-0.5 group-active:-translate-y-0.5'}`} />
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + navLinks.length * 0.06 + 0.1, duration: 0.4 }}
                className="flex flex-col gap-6 pt-10"
              >
                <div className="-mx-8 flex items-center justify-center py-3">
                  <svg width="100%" height={WAVE_HEIGHT} viewBox={`0 0 ${WAVE_WIDTH} ${WAVE_HEIGHT}`} preserveAspectRatio="none" fill="none" style={{ filter: 'drop-shadow(0 0 14px rgba(255,255,255,0.06))' }}>
                    <defs>
                      <linearGradient id="waveFade" x1="0" y1="0" x2={WAVE_WIDTH} y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                        <stop offset="15%" stopColor="#fff" stopOpacity="0.55" />
                        <stop offset="85%" stopColor="#fff" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Minimal wavy line field — many thin strands pinching toward one point */}
                    {waveLines.map((line, i) => (
                      <motion.path
                        key={i}
                        d={line.d}
                        stroke="url(#waveFade)"
                        strokeOpacity={line.opacity}
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.45 + i * 0.035, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ))}
                  </svg>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <a href="https://www.instagram.com/andrea.webdesign" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:border-brand-accent hover:text-brand-accent transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://mail.google.com/mail/?view=cm&to=andreascardacibusiness@gmail.com" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:border-brand-accent hover:text-brand-accent transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
