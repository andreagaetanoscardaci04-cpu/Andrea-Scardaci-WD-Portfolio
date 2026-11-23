// Contact form → email notification via Brevo transactional email.
//
// Runs as a Vercel Function in production (POST /api/send-email) and is reused
// by server.ts for local development, so there is a single implementation.
//
// Env vars (server-side only):
//   BREVO_API_KEY         – same key used by /api/newsletter
//   CONTACT_NOTIFY_EMAIL  – optional, where requests are delivered
//                           (defaults to the business inbox below)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SENDER_EMAIL = 'newsletter@andreascardaciportfolio.com'; // verified on the authenticated domain
const DEFAULT_NOTIFY_EMAIL = 'andreascardacibusiness@gmail.com';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

const field = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request): Promise<Response> {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Richiesta non valida.' }, 400);
  }

  const name = field(payload.name, 120);
  const email = field(payload.email, 254).toLowerCase();
  const businessName = field(payload.businessName, 200);
  const businessType = field(payload.businessType, 120);
  const message = field(payload.message, 5000);
  const source = field(payload.source, 60);

  if (!name || !EMAIL_RE.test(email)) {
    return json({ error: 'Nome ed email sono obbligatori.' }, 400);
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('send-email: missing BREVO_API_KEY');
    return json({ error: 'Invio momentaneamente non disponibile.' }, 500);
  }

  const text = [
    `Nome: ${name}`,
    `Email: ${email}`,
    businessName ? `Attività: ${businessName}` : null,
    businessType ? `Tipo attività: ${businessType}` : null,
    source ? `Origine: ${source}` : null,
    message ? `\nMessaggio:\n${message}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: `${name} (dal sito)`, email: SENDER_EMAIL },
        to: [{ email: process.env.CONTACT_NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL }],
        replyTo: { email, name },
        subject: `Nuova richiesta dal sito${businessType ? ` — ${businessType}` : ''}`,
        textContent: text,
      }),
    });

    if (!res.ok) {
      console.error('send-email: Brevo error', res.status, await res.text());
      return json({ error: 'Invio email fallito.' }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error('send-email: request to Brevo failed', err);
    return json({ error: 'Invio email fallito.' }, 502);
  }
}
