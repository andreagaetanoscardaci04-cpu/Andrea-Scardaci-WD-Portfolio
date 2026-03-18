import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Layout, Globe, Send, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_64i9n0o';
const TEMPLATE_ID = 'template_aqri8cp';
const PUBLIC_KEY = 'n4quzZkXOEwGK9cfX';

const StartWorking = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY);
      setSubmitted(true);
    } catch (err: any) {
      console.error('EmailJS error:', err);
      setError('Errore nell\'invio. Riprova o scrivimi direttamente via email.');
    } finally {
      setSending(false);
    }
  };

  const steps = [
    {
      title: 'Parliamo della tua attività',
      description: 'Capisco i tuoi obiettivi, il tuo stile e cosa vuoi comunicare ai tuoi clienti.',
      icon: MessageSquare
    },
    {
      title: 'Progetto il tuo sito web',
      description: 'Realizzo un design moderno e professionale su misura per la tua attività.',
      icon: Layout
    },
    {
      title: 'Mettiamo online il sito',
      description: 'Il tuo sito è pronto per essere visitato dai tuoi clienti su ogni dispositivo.',
      icon: Globe
    }
  ];

  return (
    <div className="pt-32">
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mb-20">
            <h1 className="text-3xl md:text-7xl font-serif font-bold mb-8 text-brand-dark">
              Iniziamo a lavorare insieme
            </h1>
            <p className="text-base md:text-xl text-brand-dark/60 leading-relaxed">
              Il processo è semplice e trasparente. Mi occupo di tutto io, così tu puoi concentrarti sulla tua attività.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="w-20 h-20 rounded-3xl bg-brand-accent/10 flex items-center justify-center mb-8">
                  <step.icon className="w-10 h-10 text-brand-accent" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-brand-dark">{step.title}</h3>
                <p className="text-brand-dark/60 text-sm md:text-lg leading-relaxed">{step.description}</p>
                
                {index < 2 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full border-t-2 border-dashed border-brand-accent/20 -z-10" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-8 text-brand-dark">
                Raccontami il tuo progetto
              </h2>
              <p className="text-lg text-brand-dark/70 mb-10 leading-relaxed">
                Compila il modulo con i tuoi dati e quelli della tua attività. Ti ricontatterò entro 24 ore per fissare una chiamata conoscitiva gratuita.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="font-medium text-brand-dark">Consulenza gratuita iniziale</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="font-medium text-brand-dark">Preventivo chiaro e senza sorprese</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="font-medium text-brand-dark">Tempi di consegna rapidi</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl border border-brand-accent/5">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold mb-4 text-brand-dark">Messaggio Inviato!</h3>
                  <p className="text-brand-dark/60 text-lg">
                    Grazie per avermi contattato. Ti risponderò il prima possibile.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-brand-accent font-bold hover:underline"
                  >
                    Invia un altro messaggio
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-dark uppercase tracking-widest">Nome</label>
                      <input
                        required
                        type="text"
                        name="from_name"
                        placeholder="Il tuo nome"
                        className="w-full px-6 py-4 rounded-xl bg-brand-accent-light/30 border-transparent focus:bg-white focus:border-brand-accent focus:ring-0 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-dark uppercase tracking-widest">Attività</label>
                      <input
                        required
                        type="text"
                        name="business"
                        placeholder="Nome della tua palestra/studio"
                        className="w-full px-6 py-4 rounded-xl bg-brand-accent-light/30 border-transparent focus:bg-white focus:border-brand-accent focus:ring-0 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-dark uppercase tracking-widest">Email</label>
                    <input
                      required
                      type="email"
                      name="reply_to"
                      placeholder="la-tua@email.com"
                      className="w-full px-6 py-4 rounded-xl bg-brand-accent-light/30 border-transparent focus:bg-white focus:border-brand-accent focus:ring-0 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-dark uppercase tracking-widest">Messaggio</label>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      placeholder="Raccontami brevemente di cosa hai bisogno..."
                      className="w-full px-6 py-4 rounded-xl bg-brand-accent-light/30 border-transparent focus:bg-white focus:border-brand-accent focus:ring-0 transition-all resize-none"
                    ></textarea>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-brand-dark text-white py-5 rounded-xl font-bold text-lg hover:bg-brand-accent transition-all shadow-xl shadow-brand-dark/20 flex items-center justify-center group disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? 'Invio in corso...' : 'Richiedi informazioni'}
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartWorking;
