import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Chi Sono', path: '/chi-sono' },
    { name: 'Esempi', path: '/esempi' },
    { name: 'Lavoriamo Insieme', path: '/lavoriamo-insieme' },
    { name: 'Contatti', path: '/contatti' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className={`text-2xl font-serif font-medium tracking-tight transition-colors duration-300 ${isHome && !scrolled ? 'text-white' : 'text-brand-dark'}`}>
          Andrea <span className="text-brand-accent" style={{ fontWeight: 500 }}>Scardaci</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-brand-accent ${
                isHome && !scrolled
                  ? 'text-white'
                  : location.pathname === link.path ? 'text-brand-accent' : 'text-brand-dark/70'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/lavoriamo-insieme"
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center group ${
              isHome && !scrolled
                ? 'bg-white/10 border border-white/25 text-white hover:bg-brand-accent hover:border-brand-accent'
                : 'bg-brand-dark text-white hover:bg-brand-accent'
            }`}
          >
            Inizia Ora
            <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className={`md:hidden transition-colors duration-300 ${isHome && !scrolled ? 'text-white' : 'text-brand-dark'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden py-8 px-6 flex flex-col space-y-6"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium ${
                  location.pathname === link.path ? 'text-brand-accent' : 'text-brand-dark'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/lavoriamo-insieme" 
              onClick={() => setIsOpen(false)}
              className="bg-brand-accent text-white px-6 py-4 rounded-xl text-center font-medium"
            >
              Iniziamo a lavorare insieme
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
