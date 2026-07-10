import React, { useLayoutEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import StartWorking from './pages/StartWorking';
import Contact from './pages/Contact';
import Supporto from './pages/Supporto';
import PrivacyPolicy from './pages/PrivacyPolicy';

// On a real page change, land instantly in the right spot (top, or the target
// section if the URL has a hash) — no visible scroll animation "through" the
// previous page. This runs in useLayoutEffect, synchronously before the browser
// paints, so the old page's scroll position is never shown against the new
// page's content (which is what caused the "scrolling up" flash). Smooth
// scrolling is reserved for in-page anchor clicks, where the pathname doesn't change.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useLayoutEffect(() => {
    const isPageChange = prevPathname.current !== pathname;
    prevPathname.current = pathname;

    if (hash) {
      const id = hash.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: isPageChange ? 'auto' : 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: isPageChange ? 'auto' : 'smooth' });
    }
  }, [pathname, hash]);
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chi-sono" element={<About />} />
            <Route path="/esempi" element={<Portfolio />} />
            <Route path="/lavoriamo-insieme" element={<StartWorking />} />
            <Route path="/supporto" element={<Supporto />} />
            <Route path="/contatti" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
