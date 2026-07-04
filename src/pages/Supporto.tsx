import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Check, Sparkles, Layers, Hammer, CalendarClock, Wallet } from 'lucide-react';

const Supporto = () => {
  const tiers = [
    {
      name: 'Low-tier',
      price: '30-50€',
      unit: 'a modifica',
      icon: Sparkles,
      items: [
        'Sistemazione o aggiunta di recensioni',
        'Modifica di una sezione',
        'Cambiamento di 1-2 animazioni',
        'Cambio colori',
        'Sostituzione immagini',
      ],
    },
    {
      name: 'Mid-tier',
      price: '75-100€',
      unit: 'a modifica',
      icon: Layers,
      popular: true,
      items: [
        'Sostituzione di un\'intera sezione',
        'Cambiamento del look generale del sito',
        'Modifica di più sezioni',
        'Aggiunta o sostituzione di video / animazioni complesse',
      ],
    },
    {
      name: 'High-tier',
      price: '125-150€',
      unit: 'a modifica',
      icon: Hammer,
      items: [
        'Inserimento di nuove offerte, inclusa creazione grafica',
        'Cambiamento profondo o rifacimento di una pagina',
        'Più piccole modifiche raggruppate insieme',
      ],
    },
  ];

  return (
    <div className="pt-32">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="section-padding pb-0">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="eyebrow mb-6 block">Supporto</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-brand-dark leading-[1.05]">
              Assistenza su misura, non un canone fisso.
            </h1>
            <p className="text-xl text-brand-dark/50 font-light leading-relaxed">
              Il tuo sito è online, ma la tua attività continua a crescere e cambiare. Niente abbonamenti obbligatori: paghi solo le modifiche di cui hai davvero bisogno, quando ne hai bisogno.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TIERS ────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-16"
          >
            <h2 className="text-3xl md:text-5xl text-brand-dark font-bold mb-4">Modifiche singole</h2>
            <p className="text-brand-dark/50 text-lg font-light leading-relaxed">
              Ogni richiesta viene classificata in una delle tre fasce, in base alla complessità e al tempo richiesto.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className={`relative rounded-3xl p-8 flex flex-col transition-all ${
                  tier.popular
                    ? 'bg-brand-accent/10 border border-brand-accent/40'
                    : 'bg-white border border-brand-dark/[0.06] hover:border-brand-dark/15'
                }`}
                style={{ boxShadow: tier.popular ? '0 20px 40px rgba(34,197,94,0.08)' : '0 10px 30px rgba(0,0,0,0.04)' }}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-accent text-white text-xs px-4 py-1 rounded-full whitespace-nowrap">
                    Più richiesto
                  </div>
                )}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${tier.popular ? 'bg-brand-accent/20' : 'bg-brand-accent/10'}`}>
                  <tier.icon className="w-5 h-5 text-brand-accent" />
                </div>
                <p className="text-xs uppercase tracking-widest mb-3 text-brand-dark/40 font-light">{tier.name}</p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-brand-dark">{tier.price}</span>
                  <span className="text-brand-dark/40 text-sm ml-1 font-light">{tier.unit}</span>
                </div>
                <ul className="space-y-3 flex-1">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-brand-dark/60 font-light">
                      <Check className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACCHETTI LONG-TERM ──────────────────────── */}
      <section className="section-padding bg-brand-dark text-white overflow-hidden relative">
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute bottom-0 left-0 w-[450px] h-[450px] bg-brand-accent/15 rounded-full blur-[130px] pointer-events-none"
        />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-16"
          >
            <span className="eyebrow mb-4 block">Per chi modifica spesso</span>
            <h2 className="text-3xl md:text-5xl text-white font-bold mb-4">Pacchetti a lungo termine</h2>
            <p className="text-white/40 text-lg font-light leading-relaxed">
              Se prevedi di aggiornare spesso il sito, un pacchetto ti conviene: paghi meno rispetto alle modifiche singole e distribuisci il valore come preferisci tra le tre fasce.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="rounded-3xl p-8 bg-brand-accent/[0.12] border border-brand-accent/40 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/30 flex items-center justify-center mb-6">
                <CalendarClock className="w-5 h-5 text-brand-accent" />
              </div>
              <p className="text-xs uppercase tracking-widest mb-3 text-brand-accent font-light">Pacchetto annuale</p>
              <div className="mb-4">
                <span className="text-4xl font-black text-white">300€</span>
                <span className="text-white/40 text-sm ml-1 font-light">/anno</span>
              </div>
              <p className="text-white/60 text-sm font-light leading-relaxed mb-6 flex-1">
                Equivalente a <span className="text-white font-normal">450€ di modifiche</span> da usare durante l'anno, combinando liberamente le fasce low, mid e high-tier in base a ciò che ti serve davvero.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-sm text-white/60 font-light">
                  <Check className="w-4 h-4 text-brand-accent flex-shrink-0" />
                  150€ di valore extra incluso rispetto al prezzo delle modifiche singole
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60 font-light">
                  <Check className="w-4 h-4 text-brand-accent flex-shrink-0" />
                  Un unico pagamento, nessuna sorpresa
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl p-8 card-bento flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <Wallet className="w-5 h-5 text-brand-accent" />
              </div>
              <p className="text-xs uppercase tracking-widest mb-3 text-white/40 font-light">Pagamento mensile</p>
              <div className="mb-4">
                <span className="text-4xl font-black text-white">30€</span>
                <span className="text-white/40 text-sm ml-1 font-light">/mese</span>
              </div>
              <p className="text-white/60 text-sm font-light leading-relaxed mb-6 flex-1">
                Stessa flessibilità del pacchetto annuale, ripartita in comode rate mensili invece di un pagamento unico anticipato.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-sm text-white/60 font-light">
                  <Check className="w-4 h-4 text-brand-accent flex-shrink-0" />
                  Nessun impegno anticipato
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60 font-light">
                  <Check className="w-4 h-4 text-brand-accent flex-shrink-0" />
                  Disdici quando vuoi
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] sm:rounded-[3rem] bg-brand-accent overflow-hidden p-10 sm:p-16 md:p-24 text-center"
            style={{ boxShadow: '0 0 80px rgba(34,197,94,0.25), 0 40px 80px rgba(0,0,0,0.1)' }}
          >
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 9, repeat: Infinity }}
              className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] pointer-events-none"
            />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-6xl text-white mb-6">
                Non sai di che fascia hai bisogno?
              </h2>
              <p className="text-white/60 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed font-light">
                Scrivimi cosa vorresti cambiare sul tuo sito: ti dico subito a quale fascia appartiene e quanto costa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contatti"
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-accent px-10 py-4 rounded-full font-medium hover:bg-brand-dark hover:text-white transition-all"
                >
                  Scrivimi ora
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Supporto;
