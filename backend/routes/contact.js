const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

function createTransporter() {
  const hasExplicitTransport = process.env.EMAIL_HOST || process.env.EMAIL_SERVICE;
  const hasAuth = process.env.EMAIL_USER && process.env.EMAIL_PASS;

  if (hasExplicitTransport && hasAuth) {
    if (process.env.EMAIL_HOST) {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 465,
        secure: process.env.EMAIL_SECURE ? process.env.EMAIL_SECURE === 'true' : true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }

    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  console.warn('⚠️ Email transport not fully configured. Using JSON transport for local development.');
  return nodemailer.createTransport({
    jsonTransport: true,
  });
}

const transporter = createTransporter();

// POST send contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    };

    const info = await transporter.sendMail(mailOptions);

    if (info.message) {
      console.log('📬 Captured email payload (development JSON transport):', info.message.toString());
    }

    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;

