import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ExternalLink, Send, Star } from 'lucide-react';

const ACCENT_STYLE = { '--fb-accent': '#3ADB6D' } as React.CSSProperties;

const ENDPOINT = import.meta.env.VITE_FEEDBACK_FORM_ENDPOINT as string | undefined;
const TRUSTPILOT_URL = import.meta.env.VITE_TRUSTPILOT_URL as string | undefined;

const NEW_CONTACTS_OPTIONS = [
  { value: 'si_chiaramente', label: 'Sì, chiaramente' },
  { value: 'qualcosa_si', label: 'Qualcosa sì' },
  { value: 'non_ancora', label: 'Non ancora' },
  { value: 'non_saprei', label: 'Non saprei dire' },
];

const REVIEW_OPTIONS = [
  { value: 'si', label: 'Sì' },
  { value: 'no', label: 'Preferisco di no' },
];

const NEEDS_HELP_OPTIONS = [
  { value: 'si_adesso', label: 'Sì, adesso' },
  { value: 'piu_avanti', label: 'Non adesso ma più avanti' },
  { value: 'per_ora_no', label: 'Per ora no' },
];

const WHEN_OPTIONS = [
  { value: 'entro_un_mese', label: 'Entro un mese' },
  { value: 'uno_tre_mesi', label: 'Tra uno e tre mesi' },
  { value: 'tre_sei_mesi', label: 'Tra tre e sei mesi' },
  { value: 'piu_in_la', label: 'Più in là' },
];

const HELP_TOPICS = [
  { value: 'modifiche_sito', label: 'Modifiche o aggiornamenti al sito' },
  { value: 'social', label: 'Gestione dei social' },
  { value: 'video', label: 'Contenuti video' },
  { value: 'seo', label: 'Essere trovati meglio su Google' },
  { value: 'newsletter', label: 'Email o newsletter ai clienti' },
  { value: 'altro', label: 'Altro' },
];

const REFERRAL_OPTIONS = [
  { value: 'si', label: 'Sì' },
  { value: 'non_al_momento', label: 'Non al momento' },
];

type FormState = {
  businessName: string;
  satisfaction: string;
  communication: string;
  newContacts: string;
  liked: string;
  improve: string;
  wantsReview: string;
  needsHelp: string;
  whenLater: string;
  helpTopics: string[];
  addSomething: string;
  knowsOthers: string;
  referralDetails: string;
  affiliateEmail: string;
  websiteCredit: string;
};

const INITIAL_STATE: FormState = {
  businessName: '',
  satisfaction: '',
  communication: '',
  newContacts: '',
  liked: '',
  improve: '',
  wantsReview: '',
  needsHelp: '',
  whenLater: '',
  helpTopics: [],
  addSomething: '',
  knowsOthers: '',
  referralDetails: '',
  affiliateEmail: '',
  websiteCredit: '',
};

const label = (options: { value: string; label: string }[], value: string) =>
  options.find((o) => o.value === value)?.label || '—';

const SectionTitle: React.FC<{ eyebrow: string; title: string }> = ({ eyebrow, title }) => (
  <div className="mb-6">
    <span className="text-[var(--fb-accent)] text-xs uppercase tracking-[0.25em] font-medium mb-2 block">{eyebrow}</span>
    <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">{title}</h2>
  </div>
);

const FieldLabel: React.FC<{ children: React.ReactNode; required?: boolean }> = ({ children, required }) => (
  <label className="text-sm font-medium text-brand-dark/80 block mb-3 leading-snug">
    {children}
    {required && <span className="text-[var(--fb-accent)]"> *</span>}
  </label>
);

const ScaleField: React.FC<{ value: string; onChange: (v: string) => void; error?: boolean }> = ({ value, onChange, error }) => (
  <div>
    <div className="flex gap-2 sm:gap-3">
      {['1', '2', '3', '4', '5'].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`flex-1 aspect-square rounded-xl border text-lg font-semibold transition-all ${
            value === n
              ? 'bg-[var(--fb-accent)] border-[var(--fb-accent)] text-brand-dark'
              : 'bg-brand-paper border-transparent text-brand-dark/50 hover:border-[var(--fb-accent)]/40'
          }`}
        >
          {n}
        </button>
      ))}
    </div>
    <div className="flex justify-between mt-1.5 px-0.5">
      <span className="text-[11px] text-brand-dark/35">Per niente</span>
      <span className="text-[11px] text-brand-dark/35">Moltissimo</span>
    </div>
    {error && <p className="text-red-500 text-xs mt-2">Seleziona un valore da 1 a 5.</p>}
  </div>
);

const ChoiceField: React.FC<{
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
}> = ({ options, value, onChange, error }) => (
  <div>
    <div className="flex flex-col gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all flex items-center gap-3 ${
            value === o.value
              ? 'bg-[var(--fb-accent)]/10 border-[var(--fb-accent)] text-brand-dark'
              : 'bg-brand-paper border-transparent text-brand-dark/70 hover:border-[var(--fb-accent)]/40'
          }`}
        >
          <span
            className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center ${
              value === o.value ? 'border-[var(--fb-accent)]' : 'border-brand-dark/25'
            }`}
          >
            {value === o.value && <span className="w-2 h-2 rounded-full bg-[var(--fb-accent)]" />}
          </span>
          {o.label}
        </button>
      ))}
    </div>
    {error && <p className="text-red-500 text-xs mt-2">Seleziona un'opzione.</p>}
  </div>
);

const MultiChoiceField: React.FC<{
  options: { value: string; label: string }[];
  values: string[];
  onToggle: (v: string) => void;
}> = ({ options, values, onToggle }) => (
  <div className="flex flex-col gap-2">
    {options.map((o) => {
      const checked = values.includes(o.value);
      return (
        <button
          key={o.value}
          type="button"
          onClick={() => onToggle(o.value)}
          className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all flex items-center gap-3 ${
            checked
              ? 'bg-[var(--fb-accent)]/10 border-[var(--fb-accent)] text-brand-dark'
              : 'bg-brand-paper border-transparent text-brand-dark/70 hover:border-[var(--fb-accent)]/40'
          }`}
        >
          <span
            className={`w-4 h-4 rounded-[5px] border shrink-0 flex items-center justify-center ${
              checked ? 'bg-[var(--fb-accent)] border-[var(--fb-accent)]' : 'border-brand-dark/25'
            }`}
          >
            {checked && <CheckCircle2 className="w-3 h-3 text-brand-dark" strokeWidth={3} />}
          </span>
          {o.label}
        </button>
      );
    })}
  </div>
);

const TextField: React.FC<{
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  rows?: number;
}> = ({ value, onChange, placeholder, rows = 3 }) => (
  <textarea
    rows={rows}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full px-4 py-3.5 text-sm rounded-xl bg-brand-paper border border-transparent focus:bg-white focus:border-[var(--fb-accent)] focus:ring-0 transition-all resize-none"
  />
);

const Feedback: React.FC = () => {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const businessNameRef = useRef<HTMLDivElement>(null);
  const satisfactionRef = useRef<HTMLDivElement>(null);
  const communicationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    const prevTitle = document.title;
    document.title = 'Feedback — Andrea Scardaci';
    return () => {
      document.head.removeChild(meta);
      document.title = prevTitle;
    };
  }, []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleHelpTopic = (value: string) =>
    setForm((f) => ({
      ...f,
      helpTopics: f.helpTopics.includes(value)
        ? f.helpTopics.filter((t) => t !== value)
        : [...f.helpTopics, value],
    }));

  const errors = {
    businessName: !form.businessName.trim(),
    satisfaction: !form.satisfaction,
    communication: !form.communication,
  };
  const hasErrors = errors.businessName || errors.satisfaction || errors.communication;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasErrors) {
      setShowErrors(true);
      const firstErrorRef = errors.businessName
        ? businessNameRef
        : errors.satisfaction
        ? satisfactionRef
        : communicationRef;
      firstErrorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!ENDPOINT) {
      setError('Modulo non configurato correttamente. Contattami direttamente, per favore.');
      return;
    }
    setSending(true);
    setError('');
    try {
      const payload = {
        'Nome attività': form.businessName,
        'Soddisfazione sito (1-5)': form.satisfaction,
        'Comunicazione durante il lavoro (1-5)': form.communication,
        'Nuovi contatti dal sito': label(NEW_CONTACTS_OPTIONS, form.newContacts),
        'Cosa è piaciuto di più': form.liked || '—',
        'Cosa avrei potuto fare meglio': form.improve || '—',
        'Ok firma/credit in fondo al sito': label(REVIEW_OPTIONS, form.websiteCredit),
        'Disponibile a recensione pubblica': label(REVIEW_OPTIONS, form.wantsReview),
        'Bisogno di assistenza': label(NEEDS_HELP_OPTIONS, form.needsHelp),
        'Quando (se più avanti)': form.needsHelp === 'piu_avanti' ? label(WHEN_OPTIONS, form.whenLater) : '—',
        'Su cosa serve una mano': form.helpTopics.length
          ? form.helpTopics.map((t) => label(HELP_TOPICS, t)).join(', ')
          : '—',
        'Altro da aggiungere': form.addSomething || '—',
        'Conosce altri titolari da segnalare': label(REFERRAL_OPTIONS, form.knowsOthers),
        'Dettagli segnalazione': form.knowsOthers === 'si' ? form.referralDetails || '—' : '—',
        'Email per info programma affiliati': form.knowsOthers === 'non_al_momento' ? form.affiliateEmail || '—' : '—',
      };
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch (err) {
      console.error('Feedback submit error:', err);
      setError("Errore nell'invio. Riprova tra qualche istante.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={ACCENT_STYLE} className="min-h-screen bg-[#23262b] py-14 sm:py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <span className="text-[var(--fb-accent)] text-xs uppercase tracking-[0.25em] font-medium mb-4 block">
            Andrea Scardaci
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Come è andata?
          </h1>
          <p className="text-white/55 font-light leading-relaxed">
            Grazie per la fiducia. Due minuti di domande per capire cosa ha funzionato e cosa posso migliorare.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-[1.75rem] shadow-2xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-16 h-16 bg-[var(--fb-accent)]/15 text-[var(--fb-accent)] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-brand-dark">Grazie per il tuo tempo!</h3>
              <p className="text-brand-dark/50 font-light">
                Ho ricevuto le tue risposte. Se hai scelto di lasciare una recensione, ti aspetto su Trustpilot.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div ref={businessNameRef}>
                <FieldLabel required>Nome dell'attività</FieldLabel>
                <input
                  type="text"
                  value={form.businessName}
                  onChange={(e) => set('businessName', e.target.value)}
                  placeholder="Es. Palestra Vittoria"
                  className="w-full px-4 py-3.5 text-sm rounded-xl bg-brand-paper border border-transparent focus:bg-white focus:border-[var(--fb-accent)] focus:ring-0 transition-all"
                />
                {showErrors && errors.businessName && (
                  <p className="text-red-500 text-xs mt-2">Campo obbligatorio.</p>
                )}
              </div>

              <div>
                <SectionTitle eyebrow="Sezione 1" title="La tua esperienza" />
                <div className="space-y-7">
                  <div ref={satisfactionRef}>
                    <FieldLabel required>Quanto sei soddisfatto del sito realizzato?</FieldLabel>
                    <ScaleField
                      value={form.satisfaction}
                      onChange={(v) => set('satisfaction', v)}
                      error={showErrors && errors.satisfaction}
                    />
                  </div>
                  <div ref={communicationRef}>
                    <FieldLabel required>Come valuti la comunicazione durante il lavoro?</FieldLabel>
                    <ScaleField
                      value={form.communication}
                      onChange={(v) => set('communication', v)}
                      error={showErrors && errors.communication}
                    />
                  </div>
                  <div>
                    <FieldLabel>Da quando il sito è online, hai notato nuovi contatti o richieste che arrivano da lì?</FieldLabel>
                    <ChoiceField
                      options={NEW_CONTACTS_OPTIONS}
                      value={form.newContacts}
                      onChange={(v) => set('newContacts', v)}
                    />
                  </div>
                  <div>
                    <FieldLabel>Cosa ti è piaciuto di più del lavoro fatto insieme?</FieldLabel>
                    <TextField
                      value={form.liked}
                      onChange={(v) => set('liked', v)}
                      placeholder="Facoltativo"
                    />
                  </div>
                  <div>
                    <FieldLabel>C'è qualcosa che avrei potuto fare meglio?</FieldLabel>
                    <TextField
                      value={form.improve}
                      onChange={(v) => set('improve', v)}
                      placeholder="Facoltativo"
                    />
                  </div>
                  <div>
                    <FieldLabel>
                      Sto considerando di inserire la mia firma all'interno del tuo sito, in piccolo, in basso, così che chi guarda il sito, se gli capita di scorrere fino in fondo, possa vedere chi l'ha realizzato e il mio portfolio.
                    </FieldLabel>
                    <ChoiceField
                      options={REVIEW_OPTIONS}
                      value={form.websiteCredit}
                      onChange={(v) => set('websiteCredit', v)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <SectionTitle eyebrow="Sezione 2" title="Recensione" />
                <div className="space-y-5">
                  <div>
                    <FieldLabel>Ti andrebbe di lasciare una recensione pubblica?</FieldLabel>
                    <ChoiceField
                      options={REVIEW_OPTIONS}
                      value={form.wantsReview}
                      onChange={(v) => set('wantsReview', v)}
                    />
                  </div>
                  {TRUSTPILOT_URL && (
                    <a
                      href={TRUSTPILOT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-brand-dark text-white py-4 rounded-xl font-medium text-sm hover:bg-[var(--fb-accent)] hover:text-brand-dark transition-all"
                    >
                      <Star className="w-4 h-4" />
                      Lascia la recensione su Trustpilot
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <SectionTitle eyebrow="Sezione 3" title="Cosa serve adesso" />
                <div className="space-y-7">
                  <div>
                    <FieldLabel>Hai bisogno di assistenza sul sito o di altri servizi?</FieldLabel>
                    <ChoiceField
                      options={NEEDS_HELP_OPTIONS}
                      value={form.needsHelp}
                      onChange={(v) =>
                        setForm((f) => ({
                          ...f,
                          needsHelp: v,
                          whenLater: v === 'piu_avanti' ? f.whenLater : '',
                          helpTopics: v === 'si_adesso' || v === 'piu_avanti' ? f.helpTopics : [],
                          addSomething: v === 'si_adesso' || v === 'piu_avanti' ? f.addSomething : '',
                        }))
                      }
                    />
                  </div>
                  {form.needsHelp === 'piu_avanti' && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      <FieldLabel>Indicativamente quando?</FieldLabel>
                      <ChoiceField
                        options={WHEN_OPTIONS}
                        value={form.whenLater}
                        onChange={(v) => set('whenLater', v)}
                      />
                    </motion.div>
                  )}
                  {(form.needsHelp === 'si_adesso' || form.needsHelp === 'piu_avanti') && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      <FieldLabel>Su cosa potrebbe servirti una mano?</FieldLabel>
                      <MultiChoiceField
                        options={HELP_TOPICS}
                        values={form.helpTopics}
                        onToggle={toggleHelpTopic}
                      />
                    </motion.div>
                  )}
                  {(form.needsHelp === 'si_adesso' || form.needsHelp === 'piu_avanti') && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      <FieldLabel>Vuoi aggiungere qualcosa?</FieldLabel>
                      <TextField
                        value={form.addSomething}
                        onChange={(v) => set('addSomething', v)}
                        placeholder="Facoltativo"
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              <div>
                <SectionTitle eyebrow="Sezione 4" title="Segnalazioni" />
                <div className="p-4 rounded-xl bg-[var(--fb-accent)]/10 border border-[var(--fb-accent)]/30 mb-6">
                  <p className="text-sm text-brand-dark/80 font-medium leading-relaxed">
                    Per ogni attività che mi segnali e con cui poi lavoro, ti riconosco 100 euro.
                  </p>
                </div>
                <div className="space-y-5">
                  <div>
                    <FieldLabel>Conosci altri titolari che potrebbero avere bisogno di un sito?</FieldLabel>
                    <ChoiceField
                      options={REFERRAL_OPTIONS}
                      value={form.knowsOthers}
                      onChange={(v) =>
                        setForm((f) => ({
                          ...f,
                          knowsOthers: v,
                          referralDetails: v === 'si' ? f.referralDetails : '',
                          affiliateEmail: v === 'non_al_momento' ? f.affiliateEmail : '',
                        }))
                      }
                    />
                  </div>
                  {form.knowsOthers === 'si' && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      <FieldLabel>Indicami nome dell'attività e come contattarli</FieldLabel>
                      <TextField
                        value={form.referralDetails}
                        onChange={(v) => set('referralDetails', v)}
                        placeholder="Es. Ristorante Da Marco — 333 1234567"
                      />
                    </motion.div>
                  )}
                  {form.knowsOthers === 'non_al_momento' && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      <FieldLabel>
                        Vuoi avere più informazioni sul programma affiliati, anche se non hai contatti al momento? Inserisci qui la tua email: ti invierò più informazioni, che potrai usare in futuro se avrai dei contatti che hanno bisogno o cercavano un sito web.
                      </FieldLabel>
                      <input
                        type="email"
                        value={form.affiliateEmail}
                        onChange={(e) => set('affiliateEmail', e.target.value)}
                        placeholder="La tua email (facoltativo)"
                        className="w-full px-4 py-3.5 text-sm rounded-xl bg-brand-paper border border-transparent focus:bg-white focus:border-[var(--fb-accent)] focus:ring-0 transition-all"
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-brand-dark text-white py-6 rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-[var(--fb-accent)] hover:text-brand-dark transition-all shadow-xl shadow-brand-dark/10 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? 'Invio in corso...' : 'Invia risposte'}
                {!sending && <Send className="w-5 h-5" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
