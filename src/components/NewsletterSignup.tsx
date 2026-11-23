import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, MailCheck } from 'lucide-react';

type Status = 'idle' | 'sending' | 'done' | 'error';

// Email signup form for the Brevo newsletter (POST /api/newsletter).
// Brevo then sends a confirmation email (double opt-in).
const NewsletterSignup = ({ compact = false }: { compact?: boolean }) => {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Iscrizione non riuscita. Riprova tra poco.');
      setStatus('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Iscrizione non riuscita. Riprova tra poco.');
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center gap-4"
        role="status"
      >
        <div className="w-14 h-14 rounded-full bg-brand-accent/15 text-brand-accent flex items-center justify-center">
          <MailCheck className="w-7 h-7" />
        </div>
        <p className="text-white text-xl font-medium">Quasi fatto: controlla la tua email.</p>
        <p className="text-white/50 font-light max-w-md">
          Ti ho inviato un messaggio di conferma. Clicca il link al suo interno per completare l'iscrizione
          (se non lo trovi, guarda nello spam o in "Promozioni").
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${compact ? 'max-w-lg' : 'max-w-xl'} mx-auto`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="newsletter-email" className="sr-only">Indirizzo email</label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="La tua email"
          className="flex-1 px-6 py-4 text-base rounded-full bg-white/[0.06] border border-white/15 text-white placeholder:text-white/35 focus:outline-none focus:border-brand-accent focus:bg-white/[0.09] transition-all"
        />
        {/* Honeypot: hidden from people, often filled by bots. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
          aria-hidden="true"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex items-center justify-center gap-2 bg-brand-accent text-white px-8 py-4 rounded-full font-medium disabled:opacity-60 transition-opacity"
          style={{ boxShadow: '0 0 24px rgba(34,197,94,0.3)' }}
        >
          {status === 'sending' ? 'Invio…' : 'Iscriviti'}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {status === 'error' && (
        <p className="mt-3 text-sm text-red-400 text-center" role="alert">{error}</p>
      )}

      <p className="mt-4 text-xs text-white/40 text-center leading-relaxed">
        Iscrivendoti accetti di ricevere la newsletter. Puoi disiscriverti in qualsiasi momento con un clic.
        Dettagli nella <Link to="/privacy-policy" className="underline hover:text-white/70">Privacy Policy</Link>.
      </p>
    </form>
  );
};

export default NewsletterSignup;
