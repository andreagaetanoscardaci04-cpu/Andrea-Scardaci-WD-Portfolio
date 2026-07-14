import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ArrowLeft, Send, CheckCircle2, Dumbbell, Activity, PersonStanding, Waves, Flame, User, MoreHorizontal, ChevronRight } from 'lucide-react';
import { useContactModal } from '../context/ContactModalContext';

const BUSINESS_TYPES = [
  { label: 'Palestra', icon: Dumbbell },
  { label: 'Centro Fitness', icon: Activity },
  { label: 'Studio Pilates', icon: PersonStanding },
  { label: 'Studio Yoga', icon: Waves },
  { label: 'CrossFit', icon: Flame },
  { label: 'Studio PT', icon: User },
];

const OTHER_TYPE = { label: 'Altro tipo di attività', icon: MoreHorizontal };

type Step = 'type' | 'details' | 'success';

const ContactModal: React.FC = () => {
  const { isOpen, source, closeModal } = useContactModal();

  const [step, setStep] = useState<Step>('type');
  const [businessType, setBusinessType] = useState('');
  const [customType, setCustomType] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', businessName: '', message: '' });

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStep('type');
        setBusinessType('');
        setCustomType('');
        setShowCustomInput(false);
        setForm({ name: '', email: '', businessName: '', message: '' });
        setError('');
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const selectType = (label: string) => {
    if (label === OTHER_TYPE.label) {
      setShowCustomInput(true);
      return;
    }
    setBusinessType(label);
    setStep('details');
  };

  const confirmCustomType = () => {
    if (!customType.trim()) return;
    setBusinessType(customType.trim());
    setStep('details');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          businessName: form.businessName,
          businessType,
          message: form.message,
          source,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStep('success');
    } catch {
      setError("Errore nell'invio. Riprova o scrivimi direttamente via email.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-sm" onClick={closeModal} />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-2xl"
          >
            <button
              onClick={closeModal}
              aria-label="Chiudi"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-brand-dark/[0.05] hover:bg-brand-dark/10 flex items-center justify-center text-brand-dark/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {step === 'type' && (
              <div>
                <span className="eyebrow mb-3 block">Iniziamo</span>
                <h3 className="font-luxury text-2xl sm:text-3xl text-brand-dark mb-2 leading-tight pr-10">
                  Che tipo di attività hai?
                </h3>
                <p className="text-brand-dark/45 font-light mb-8">
                  Scegli l'opzione più vicina alla tua attività, così posso prepararti una proposta su misura.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  {BUSINESS_TYPES.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      onClick={() => selectType(label)}
                      className="group flex flex-col items-start gap-3 p-4 rounded-2xl border border-brand-dark/[0.08] hover:border-brand-accent/40 hover:bg-brand-accent/5 transition-all text-left"
                    >
                      <span className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0 group-hover:bg-brand-accent/15 transition-colors">
                        <Icon className="w-5 h-5 text-brand-accent" />
                      </span>
                      <span className="text-sm font-medium text-brand-dark leading-snug">{label}</span>
                    </button>
                  ))}
                </div>

                {!showCustomInput ? (
                  <button
                    onClick={() => selectType(OTHER_TYPE.label)}
                    className="group w-full flex items-center gap-3 p-4 rounded-2xl border border-dashed border-brand-dark/15 hover:border-brand-accent/40 hover:bg-brand-accent/5 transition-all text-left"
                  >
                    <span className="w-10 h-10 rounded-full bg-brand-dark/[0.05] flex items-center justify-center shrink-0 group-hover:bg-brand-accent/15 transition-colors">
                      <OTHER_TYPE.icon className="w-5 h-5 text-brand-dark/50 group-hover:text-brand-accent transition-colors" />
                    </span>
                    <span className="text-sm font-medium text-brand-dark">{OTHER_TYPE.label}</span>
                    <ChevronRight className="w-4 h-4 text-brand-dark/30 ml-auto" />
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl border border-brand-accent/30 bg-brand-accent/5"
                  >
                    <label className="text-xs font-medium text-brand-dark/70 uppercase tracking-widest mb-2 block">
                      Che attività hai?
                    </label>
                    <div className="flex gap-2">
                      <input
                        autoFocus
                        type="text"
                        value={customType}
                        onChange={(e) => setCustomType(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && confirmCustomType()}
                        placeholder="Es. barbiere, ristorante..."
                        className="flex-1 px-4 py-3 text-sm rounded-xl bg-white border border-brand-dark/10 focus:border-brand-accent focus:ring-0 transition-all"
                      />
                      <button
                        onClick={confirmCustomType}
                        disabled={!customType.trim()}
                        className="px-5 rounded-xl bg-brand-dark text-white text-sm font-medium hover:bg-brand-accent transition-colors disabled:opacity-40"
                      >
                        Ok
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {step === 'details' && (
              <div>
                <button
                  onClick={() => setStep('type')}
                  className="inline-flex items-center gap-1.5 text-brand-dark/40 hover:text-brand-accent text-sm font-medium mb-5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {businessType}
                </button>

                <span className="eyebrow mb-3 block">Ultimo passo</span>
                <h3 className="font-luxury text-2xl sm:text-3xl text-brand-dark mb-6 leading-tight pr-10">
                  Raccontami di te
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-brand-dark/70 uppercase tracking-widest">Nome</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Il tuo nome"
                        className="w-full px-4 py-3.5 text-sm rounded-xl bg-brand-paper border-transparent focus:bg-white focus:border-brand-accent focus:ring-0 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-brand-dark/70 uppercase tracking-widest">Nome attività</label>
                      <input
                        type="text"
                        value={form.businessName}
                        onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
                        placeholder="Facoltativo"
                        className="w-full px-4 py-3.5 text-sm rounded-xl bg-brand-paper border-transparent focus:bg-white focus:border-brand-accent focus:ring-0 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-brand-dark/70 uppercase tracking-widest">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="la-tua@email.com"
                      className="w-full px-4 py-3.5 text-sm rounded-xl bg-brand-paper border-transparent focus:bg-white focus:border-brand-accent focus:ring-0 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-brand-dark/70 uppercase tracking-widest">Messaggio</label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Raccontami brevemente di cosa hai bisogno... (facoltativo)"
                      className="w-full px-4 py-3.5 text-sm rounded-xl bg-brand-paper border-transparent focus:bg-white focus:border-brand-accent focus:ring-0 transition-all resize-none"
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-brand-dark text-white py-4 rounded-xl font-medium text-base hover:bg-brand-accent transition-all shadow-xl shadow-brand-dark/20 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? 'Invio in corso...' : 'Invia richiesta'}
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            )}

            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-luxury text-3xl text-brand-dark mb-4">Grazie!</h3>
                <p className="text-brand-dark/50 font-light text-lg mb-8">
                  Ho ricevuto la tua richiesta. Ti risponderò entro 48 ore.
                </p>
                <button
                  onClick={closeModal}
                  className="text-brand-accent font-medium hover:underline"
                >
                  Chiudi
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
