import React, { useLayoutEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import { ContactModalProvider } from './context/ContactModalContext';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import StartWorking from './pages/StartWorking';
import Contact from './pages/Contact';
import Supporto from './pages/Supporto';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Feedback from './pages/Feedback';

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

// The feedback page is a hidden, link-only questionnaire — it skips the
// marketing Navbar/Footer entirely so it reads as a standalone form, not a
// page of the main site.
const AppShell = () => {
  const { pathname } = useLocation();
  const isStandalone = pathname === '/feedback';

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        {!isStandalone && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chi-sono" element={<About />} />
            <Route path="/esempi" element={<Portfolio />} />
            <Route path="/lavoriamo-insieme" element={<StartWorking />} />
            <Route path="/supporto" element={<Supporto />} />
            <Route path="/contatti" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
        {!isStandalone && <Footer />}
      </div>
      {!isStandalone && <ContactModal />}
    </>
  );
};

export default function App() {
  return (
    <Router>
      <ContactModalProvider>
        <AppShell />
      </ContactModalProvider>
    </Router>
  );
}
