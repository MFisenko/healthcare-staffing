import { fileURLToPath } from 'url';
import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Tab 1 — Candidate applies with CV
app.post('/api/apply', upload.single('cv'), async (req, res) => {
  const { name, email, phone, message } = req.body;
  const cvFile = req.file;

  if (!name || !email || !cvFile) {
    return res.status(400).json({ error: 'Name, email, and CV are required.' });
  }

  try {
    await transporter.sendMail({
      from: `"HealLink Careers" <${process.env.SMTP_USER}>`,
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
          contentType: cvFile.mimetype,
        },
      ],
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Mail error:', err.message);
    res.status(500).json({ error: 'Failed to send email. Check your SMTP settings.' });
  }
});

// Tab 2 — Agency requests staff
app.post('/api/request-staff', async (req, res) => {
  const { orgName, contactName, email, phone, roleType, headcount, startDate, requirements } = req.body;

  if (!orgName || !contactName || !email || !roleType) {
    return res.status(400).json({ error: 'Organisation, contact name, email and role type are required.' });
  }

  try {
    await transporter.sendMail({
      from: `"HealLink Staffing" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Staff Request — ${orgName} (${roleType})`,
      html: `
        <h2>New staff request from agency / employer</h2>
        <p><strong>Organisation:</strong> ${orgName}</p>
        <p><strong>Contact:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || '—'}</p>
        <p><strong>Role needed:</strong> ${roleType}</p>
        <p><strong>Headcount:</strong> ${headcount || '—'}</p>
        <p><strong>Start date:</strong> ${startDate || '—'}</p>
        <p><strong>Requirements:</strong> ${requirements || '—'}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Mail error:', err.message);
    res.status(500).json({ error: 'Failed to send email. Check your SMTP settings.' });
  }
});

// Only start the HTTP server when run directly (local dev).
// When imported by Vercel (api/index.js), we just export the app.
const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

export default app;
