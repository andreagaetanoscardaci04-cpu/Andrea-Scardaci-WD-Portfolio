import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, businessName, businessType, message, source } = req.body ?? {};

  if (!name || !email) {
    res.status(400).json({ error: 'Nome ed email sono obbligatori.' });
    return;
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Nuova richiesta dal sito${businessType ? ` — ${businessType}` : ''}`,
      text: [
        `Nome: ${name}`,
        `Email: ${email}`,
        businessName ? `Attività: ${businessName}` : null,
        businessType ? `Tipo attività: ${businessType}` : null,
        source ? `Origine: ${source}` : null,
        message ? `\nMessaggio:\n${message}` : null,
      ].filter(Boolean).join('\n'),
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('send-email failed:', err);
    res.status(500).json({ error: 'Invio email fallito.' });
  }
});

if (process.env.NODE_ENV === 'production') {
  const distDir = path.resolve(__dirname, 'dist');
  app.use(express.static(distDir));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
