import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ArrowUpRight, Instagram, Mail, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

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

  const lightHeader = isHome && !scrolled && !isOpen;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || isOpen ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="container-custom flex justify-between items-center">
          <Link to="/" className={`text-2xl font-serif font-medium tracking-tight transition-colors duration-300 ${lightHeader ? 'text-white' : 'text-brand-dark'}`}>
            Andrea <span className="text-brand-accent" style={{ fontWeight: 500 }}>Scardaci</span>
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
            className={`md:hidden relative w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isOpen || !lightHeader ? 'bg-brand-dark/5' : 'bg-white/10'
            }`}
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className={isOpen || !lightHeader ? 'text-brand-dark w-5 h-5' : 'text-white w-5 h-5'} />
            ) : (
              <span className="flex flex-col items-end gap-[5px]">
                <span className={`block h-[2px] w-5 rounded-full ${!lightHeader ? 'bg-brand-dark' : 'bg-white'}`} />
                <span className={`block h-[2px] w-3.5 rounded-full ${!lightHeader ? 'bg-brand-accent' : 'bg-brand-accent'}`} />
                <span className={`block h-[2px] w-5 rounded-full ${!lightHeader ? 'bg-brand-dark' : 'bg-white'}`} />
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-brand-dark md:hidden">
          <div className="h-full flex flex-col justify-between pt-32 pb-10 px-8 overflow-y-auto">
            <div>
              <span className="eyebrow mb-4 block">
                Menu
              </span>
              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <div key={link.path} className="border-b border-white/10 py-4">
                    <Link
                      to={link.path}
                      className={`flex items-center justify-between text-3xl font-light ${
                        location.pathname === link.path ? 'text-brand-accent' : 'text-white'
                      }`}
                    >
                      {link.name}
                      <ArrowUpRight className="w-6 h-6 opacity-30" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 pt-10">
              <Link
                to="/lavoriamo-insieme"
                className="bg-brand-accent text-white text-center px-6 py-5 rounded-2xl font-medium text-lg"
              >
                Iniziamo a lavorare insieme
              </Link>
              <div className="flex items-center justify-center gap-4">
                <a href="https://www.instagram.com/andrea.webdesign" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://mail.google.com/mail/?view=cm&to=andreascardacibusiness@gmail.com" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
