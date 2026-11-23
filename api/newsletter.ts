// Newsletter signup → Brevo double opt-in.
//
// Runs as a Vercel Function in production (POST /api/newsletter) and is reused
// by server.ts for local development, so there is a single implementation.
//
// Brevo sends the subscriber a confirmation email; they are added to the list
// only after clicking the link (GDPR-friendly double opt-in).
//
// Required env vars (server-side only, never prefix with VITE_):
//   BREVO_API_KEY          – Brevo → SMTP & API → API keys
//   BREVO_LIST_ID          – numeric id of the newsletter list
//   BREVO_DOI_TEMPLATE_ID  – numeric id of the double opt-in confirmation template
//   NEWSLETTER_REDIRECT_URL – page shown after the subscriber confirms
//                             (e.g. https://yourdomain.com/newsletter?confermato=1)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export async function POST(request: Request): Promise<Response> {
  let payload: { email?: unknown; website?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Richiesta non valida.' }, 400);
  }

  // Honeypot field: real users never fill it, bots usually do.
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return json({ ok: true });
  }

  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return json({ error: 'Inserisci un indirizzo email valido.' }, 400);
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);
  const redirectionUrl = process.env.NEWSLETTER_REDIRECT_URL;

  if (!apiKey || !listId || !templateId || !redirectionUrl) {
    console.error('newsletter: missing Brevo configuration env vars');
    return json({ error: 'Iscrizione momentaneamente non disponibile.' }, 500);
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        includeListIds: [listId],
        templateId,
        redirectionUrl,
      }),
    });

    if (!res.ok) {
      console.error('newsletter: Brevo error', res.status, await res.text());
      return json({ error: 'Iscrizione non riuscita. Riprova tra poco.' }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error('newsletter: request to Brevo failed', err);
    return json({ error: 'Iscrizione non riuscita. Riprova tra poco.' }, 502);
  }
}
