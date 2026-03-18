import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32">
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mb-20">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-brand-dark">
              Contattami
            </h1>
            <p className="text-xl text-brand-dark/60 leading-relaxed">
              Se vuoi informazioni o un preventivo per il tuo sito web, scrivimi. Ti risponderò il prima possibile.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-7 h-7 text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-brand-dark">Email</h3>
                  <p className="text-lg text-brand-dark/60">andreagaetanoscardaci04@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-7 h-7 text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-brand-dark">Telefono</h3>
                  <p className="text-lg text-brand-dark/60">+39 392 296 5248</p>
                </div>
              </div>

              <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
                <div className="flex items-center space-x-4 mb-4">
                  <MessageCircle className="w-8 h-8 text-emerald-600" />
                  <h3 className="text-xl font-bold text-emerald-900">WhatsApp</h3>
                </div>
                <p className="text-emerald-800/70 mb-6">
                  Preferisci scrivermi su WhatsApp? È il modo più veloce per ricevere una risposta.
                </p>
                <a
                  href="https://wa.me/393922965248"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all"
                >
                  Scrivimi su WhatsApp
                </a>
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
                  <h3 className="text-3xl font-serif font-bold mb-4 text-brand-dark">Grazie!</h3>
                  <p className="text-brand-dark/60 text-lg">
                    Il tuo messaggio è stato inviato correttamente.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-brand-accent font-bold hover:underline"
                  >
                    Invia un altro messaggio
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-dark uppercase tracking-widest">Nome Completo</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Mario Rossi"
                      className="w-full px-6 py-4 rounded-xl bg-brand-accent-light/30 border-transparent focus:bg-white focus:border-brand-accent focus:ring-0 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-dark uppercase tracking-widest">Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="mario.rossi@email.com"
                      className="w-full px-6 py-4 rounded-xl bg-brand-accent-light/30 border-transparent focus:bg-white focus:border-brand-accent focus:ring-0 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-dark uppercase tracking-widest">Messaggio</label>
                    <textarea 
                      required
                      rows={6}
                      placeholder="Come posso aiutarti?"
                      className="w-full px-6 py-4 rounded-xl bg-brand-accent-light/30 border-transparent focus:bg-white focus:border-brand-accent focus:ring-0 transition-all resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-brand-dark text-white py-5 rounded-xl font-bold text-lg hover:bg-brand-accent transition-all shadow-xl shadow-brand-dark/20 flex items-center justify-center group"
                  >
                    Invia Messaggio
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

export default Contact;
