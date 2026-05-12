import { fileURLToPath } from 'url';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

// Tab 1 — Candidate applies with CV
app.post('/api/apply', upload.single('cv'), async (req, res) => {
  const { name, email, phone, message } = req.body;
  const cvFile = req.file;

  if (!name || !email || !cvFile) {
    return res.status(400).json({ error: 'Name, email, and CV are required.' });
  }

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New CV Application — ${name}`,
      html: `
        <h2>New candidate application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || '—'}</p>
        <p><strong>Message:</strong> ${message || '—'}</p>
      `,
      attachments: [
        {
          filename: cvFile.originalname,
          content: cvFile.buffer,
        },
      ],
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Resend error:', err.message);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

// Tab 2 — Caregiver request
app.post('/api/request-staff', async (req, res) => {
  const { firstName, lastName, address, phone, email, organisation, roleType, purpose, serviceDuration, startDate, requirements } = req.body;

  if (!firstName || !lastName || !email || !roleType) {
    return res.status(400).json({ error: 'First name, last name, email and role type are required.' });
  }

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Caregiver Request — ${firstName} ${lastName} (${roleType})`,
      html: `
        <h2>New caregiver request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Phone:</strong> ${phone || '—'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organisation:</strong> ${organisation || '—'}</p>
        <p><strong>Role needed:</strong> ${roleType}</p>
        <p><strong>Purpose:</strong> ${purpose || '—'}</p>
        <p><strong>Service duration:</strong> ${serviceDuration || '—'}</p>
        <p><strong>Start date:</strong> ${startDate || '—'}</p>
        <p><strong>Requirements:</strong> ${requirements || '—'}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Resend error:', err.message);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

export default app;
