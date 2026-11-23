import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { POST as newsletterSignup } from './api/newsletter';
import { POST as sendEmail } from './api/send-email';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

// Both API routes reuse the Vercel Function handlers so local dev and production behave the same.
const forward = (handler: (req: Request) => Promise<Response>, url: string) =>
  async (req: express.Request, res: express.Response) => {
    const response = await handler(
      new Request(`http://localhost${url}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(req.body ?? {}),
      }),
    );
    res.status(response.status).type('application/json').send(await response.text());
  };

app.post('/api/send-email', forward(sendEmail, '/api/send-email'));
app.post('/api/newsletter', forward(newsletterSignup, '/api/newsletter'));

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
