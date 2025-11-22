require('dotenv').config();
const nodemailer = require('nodemailer');

// Create transporter
function createTransporter() {
  const emailFrom = process.env.EMAIL_FROM;
  const emailPassword = process.env.EMAIL_PASSWORD;
  const emailHost = process.env.EMAIL_HOST;
  const emailPort = process.env.EMAIL_PORT;

  if (emailFrom && emailPassword && emailHost && emailPort) {
    return nodemailer.createTransport({
      host: emailHost,
      port: Number(emailPort),
      secure: Number(emailPort) === 465,
      auth: {
        user: emailFrom,
        pass: emailPassword,
      },
    });
  }

  console.error('❌ Email configuration missing!');
  console.error('Required: EMAIL_FROM, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT');
  process.exit(1);
}

const transporter = createTransporter();

// Test email
const testEmail = 'kanchankushwaha65520@gmail.com';

const mailOptions = {
  from: process.env.EMAIL_FROM,
  to: testEmail,
  subject: 'Portfolio Contact Form Test',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Portfolio Contact Form Test</h2>
      <p>Hi Kanchan,</p>
      <p>Your email service is working successfully! 🚀</p>
      <p style="margin-top: 20px; color: #666;">
        This is a test email from your portfolio backend.
      </p>
    </div>
  `,
  text: 'Hi Kanchan,\n\nYour email service is working successfully! 🚀\n\nThis is a test email from your portfolio backend.',
};

console.log('📧 Sending test email...');
console.log(`From: ${process.env.EMAIL_FROM}`);
console.log(`To: ${testEmail}`);

transporter.sendMail(mailOptions)
  .then((info) => {
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Failed to send test email:');
    console.error(error);
    process.exit(1);
  });

