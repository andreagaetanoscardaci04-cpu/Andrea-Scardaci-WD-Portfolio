import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cookie } from 'lucide-react';

const PrivacyPolicy = () => {
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
            <span className="eyebrow mb-6 block">Informativa</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-brand-dark leading-[1.05]">
              Privacy &amp; Cookie Policy
            </h1>
            <p className="text-xl text-brand-dark/50 font-light leading-relaxed mb-10">
              Qui trovi tutte le informazioni su come vengono trattati i tuoi dati personali e su come viene utilizzato questo sito.
            </p>

            {/* Quick nav */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="#privacy-policy"
                className="inline-flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-brand-accent transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                Privacy Policy
              </Link>
              <Link
                to="#cookie-policy"
                className="inline-flex items-center gap-2 border border-brand-dark/15 text-brand-dark px-6 py-3 rounded-full font-medium text-sm hover:border-brand-accent hover:text-brand-accent transition-colors"
              >
                <Cookie className="w-4 h-4" />
                Cookie Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRIVACY POLICY ───────────────────────────── */}
      <section id="privacy-policy" className="section-padding scroll-mt-28">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            className="max-w-3xl"
          >
            <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mb-6">
              <ShieldCheck className="w-5 h-5 text-brand-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-brand-dark">Privacy Policy</h2>

            <div className="space-y-8 text-brand-dark/60 font-light leading-relaxed">
              <div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">Titolare del trattamento</h3>
                <p>
                  Il Titolare del trattamento dei dati raccolti tramite questo sito è Andrea Scardaci, contattabile all'indirizzo email{' '}
                  <a href="mailto:andreascardacibusiness@gmail.com" className="text-brand-accent hover:underline">andreascardacibusiness@gmail.com</a>.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">Quali dati raccogliamo</h3>
                <p>
                  Questo sito non richiede registrazione né raccoglie dati personali durante la normale navigazione. Alcuni dati personali vengono raccolti solo quando compili volontariamente il modulo di contatto o di richiesta informazioni, in particolare: nome, nome dell'attività, indirizzo email e il contenuto del messaggio inviato.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">Finalità del trattamento</h3>
                <p>
                  I dati forniti tramite il modulo di contatto vengono utilizzati esclusivamente per rispondere alle richieste di informazioni, elaborare preventivi personalizzati e gestire l'eventuale rapporto di lavoro che ne consegue. Non vengono utilizzati per finalità di marketing senza un consenso specifico.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">Base giuridica</h3>
                <p>
                  Il trattamento si basa sul consenso espresso nell'invio del modulo (art. 6.1.a GDPR) e, ove applicabile, sull'esecuzione di misure precontrattuali adottate su richiesta dell'interessato (art. 6.1.b GDPR).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">Conservazione dei dati</h3>
                <p>
                  I dati raccolti tramite il modulo di contatto sono conservati per il tempo strettamente necessario a gestire la richiesta e, in caso di instaurazione di un rapporto professionale, per la durata prevista dagli obblighi fiscali e civilistici applicabili.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">Comunicazione dei dati a terzi</h3>
                <p>
                  Il modulo di contatto del sito è gestito attraverso il servizio EmailJS, utilizzato esclusivamente per l'invio tecnico delle email e che agisce in qualità di responsabile del trattamento. I dati non vengono venduti, ceduti o comunicati a terzi per finalità commerciali o di marketing.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">Diritti dell'interessato</h3>
                <p>
                  In qualsiasi momento hai diritto di richiedere l'accesso ai tuoi dati personali, la rettifica, la cancellazione, la limitazione del trattamento, la portabilità dei dati e di opporti al trattamento (artt. 15-22 del Regolamento UE 2016/679). Per esercitare questi diritti puoi scrivere a{' '}
                  <a href="mailto:andreascardacibusiness@gmail.com" className="text-brand-accent hover:underline">andreascardacibusiness@gmail.com</a>. Hai inoltre diritto di proporre reclamo al Garante per la Protezione dei Dati Personali.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">Modifiche alla presente informativa</h3>
                <p>
                  Questa informativa può essere aggiornata nel tempo per riflettere cambiamenti nelle modalità di trattamento dei dati o nella normativa vigente. Ti invitiamo a consultare periodicamente questa pagina.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── COOKIE POLICY ────────────────────────────── */}
      <section id="cookie-policy" className="section-padding bg-brand-paper scroll-mt-28">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            className="max-w-3xl"
          >
            <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mb-6">
              <Cookie className="w-5 h-5 text-brand-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-brand-dark">Cookie Policy</h2>

            <div className="space-y-8 text-brand-dark/60 font-light leading-relaxed">
              <div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">Cosa sono i cookie</h3>
                <p>
                  I cookie sono piccoli file di testo che i siti visitati inviano al browser dell'utente, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti nella visita successiva. Servono, tra le altre cose, a far funzionare correttamente le pagine web o a renderne più efficiente la consultazione.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">Cookie utilizzati da questo sito</h3>
                <p>
                  Questo sito non utilizza cookie di profilazione né cookie di analisi o marketing di terze parti. Vengono utilizzati unicamente eventuali cookie tecnici, strettamente necessari al corretto funzionamento delle pagine, che non richiedono consenso ai sensi della normativa vigente.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">Come gestire i cookie dal browser</h3>
                <p>
                  Puoi in ogni momento gestire o eliminare i cookie già presenti sul tuo dispositivo attraverso le impostazioni del tuo browser (Chrome, Firefox, Safari, Edge). Tieni presente che disabilitare i cookie tecnici potrebbe influire sul corretto funzionamento del sito.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">Aggiornamenti futuri</h3>
                <p>
                  Qualora in futuro venissero introdotti strumenti di analisi statistica o cookie di terze parti, questa pagina sarà aggiornata di conseguenza e, ove richiesto dalla normativa, verrà mostrato un apposito banner per la raccolta del consenso.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default PrivacyPolicy;
