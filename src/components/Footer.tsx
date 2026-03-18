import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link to="/" className="text-3xl font-serif font-medium mb-6 block">
              Andrea <span className="text-brand-accent">Scardaci</span>
            </Link>
            <p className="text-white/60 max-w-md mb-8 leading-relaxed">
              Realizzo siti web professionali per palestre, studi fitness e attività locali in Italia. 
              Alta qualità, design moderno e prezzi imbattibili.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/andrea.webdesign" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://mail.google.com/mail/?view=cm&to=andreascardacibusiness@gmail.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Link Rapidi</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/chi-sono" className="hover:text-white transition-colors">Chi Sono</Link></li>
              <li><Link to="/esempi" className="hover:text-white transition-colors">Esempi di siti</Link></li>
              <li><Link to="/lavoriamo-insieme" className="hover:text-white transition-colors">Lavoriamo Insieme</Link></li>
              <li><Link to="/contatti" className="hover:text-white transition-colors">Contatti</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Contatti</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
                </svg>
                andreascardacibusiness@gmail.com
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-brand-accent" />
                +39 392 296 5248
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Andrea Scardaci. Tutti i diritti riservati.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
