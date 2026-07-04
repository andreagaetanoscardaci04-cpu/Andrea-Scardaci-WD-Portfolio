import React from 'react';
import { motion } from 'motion/react';
import { Heart, Zap, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="pb-20 md:pb-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative order-1 lg:order-2"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-brand-dark/[0.06]">
                <img
                  src="/imageme.png.png"
                  alt="Andrea Scardaci"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="order-2 lg:order-1"
            >
              <span className="eyebrow mb-6 block">Chi sono</span>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-brand-dark">
                Chi è Andrea Scardaci
              </h1>
              <div className="space-y-6 text-xl text-brand-dark/60 font-light leading-relaxed">
                <p>
                  Mi chiamo <span className="text-brand-dark font-normal">Andrea Scardaci</span> e sono un web designer freelance con una missione chiara: portare le attività locali italiane nel mondo digitale con eleganza e professionalità.
                </p>
                <p>
                  Non mi limito a "fare siti". Creo vetrine digitali che riflettono l'anima della tua attività, che sia una palestra storica, un moderno studio di personal training o un centro yoga.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Il mio approccio */}
      <section className="section-padding bg-brand-paper">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="eyebrow mb-4 block">Come lavoro</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark">
              Il mio approccio
            </h2>
            <p className="text-xl text-brand-dark/50 font-light">
              Unire innovazione tecnologica e sensibilità artigianale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Innovazione",
                description: "Utilizzo l'intelligenza artificiale e gli strumenti più moderni per abbattere i tempi di produzione mantenendo una qualità altissima.",
                icon: Zap
              },
              {
                title: "Semplicità",
                description: "I miei siti sono facili da usare per te e per i tuoi clienti. Niente complicazioni tecniche inutili.",
                icon: Heart
              },
              {
                title: "Risultati",
                description: "Ogni sito è progettato con un obiettivo: far crescere la tua attività e attirare nuovi clienti.",
                icon: Users
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-10 rounded-3xl border border-brand-dark/[0.06] hover:border-brand-accent/20 transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-8">
                  <item.icon className="w-8 h-8 text-brand-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-brand-dark">{item.title}</h3>
                <p className="text-brand-dark/50 font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perché aiuto attività fisiche */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500&auto=format&fit=crop" className="rounded-2xl border border-brand-dark/[0.06]" alt="Gym" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=500&auto=format&fit=crop" className="rounded-2xl border border-brand-dark/[0.06] mt-8" alt="Fitness" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="eyebrow mb-4 block">Perché le palestre</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-brand-dark">
                Perché aiuto attività fisiche
              </h2>
              <div className="space-y-6 text-lg text-brand-dark/60 font-light leading-relaxed">
                <p>
                  Credo fermamente che le palestre e i centri sportivi siano il cuore pulsante del benessere delle nostre comunità locali.
                </p>
                <p>
                  Spesso queste attività hanno strutture incredibili e professionisti preparati, ma una presenza online che non rende loro giustizia.
                </p>
                <p>
                  Voglio che ogni titolare di palestra possa mostrare con orgoglio la propria attività online, senza dover investire budget enormi che preferirebbe dedicare alla propria struttura.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Come lavoro */}
      <section className="section-padding bg-brand-dark text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 block">Il processo</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Come lavoro con i miei clienti
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                step: "01",
                title: "Ascolto e Analisi",
                description: "Iniziamo con una chiacchierata per capire chi sei, cosa offri e chi sono i tuoi clienti ideali."
              },
              {
                step: "02",
                title: "Progettazione Creativa",
                description: "Creo una bozza del design che rifletta l'identità della tua attività, curando ogni dettaglio visivo."
              },
              {
                step: "03",
                title: "Sviluppo e Ottimizzazione",
                description: "Trasformo il design in un sito web veloce, sicuro e perfetto per essere visualizzato su cellulari e tablet."
              },
              {
                step: "04",
                title: "Lancio e Supporto",
                description: "Mettiamo online il sito e ti insegno come gestirlo in autonomia per le piccole modifiche quotidiane."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-8 items-start py-6 border-t border-white/10 first:border-t-0"
              >
                <span className="text-4xl font-bold text-brand-accent opacity-50 shrink-0">{item.step}</span>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/50 text-lg font-light leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
