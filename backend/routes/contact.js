const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

function createTransporter() {
  const emailFrom = process.env.EMAIL_FROM;
  const emailPassword = process.env.EMAIL_PASSWORD;
  const emailHost = process.env.EMAIL_HOST;
  const emailPort = process.env.EMAIL_PORT;

  // Check if all required email config is present
  if (emailFrom && emailPassword && emailHost && emailPort) {
    return nodemailer.createTransport({
      host: emailHost,
      port: Number(emailPort),
      secure: Number(emailPort) === 465, // true for 465, false for other ports like 587
      auth: {
        user: emailFrom,
        pass: emailPassword,
      },
    });
  }

  return null; // Return null if not configured
}

// Create transporter on module load
let transporter = createTransporter();

// Log email configuration status on server start
console.log('\n📧 Email Configuration Status:');
console.log('   EMAIL_FROM:', process.env.EMAIL_FROM ? `✅ ${process.env.EMAIL_FROM}` : '❌ Missing');
console.log('   EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✅ Set' : '❌ Missing');
console.log('   EMAIL_HOST:', process.env.EMAIL_HOST || '❌ Missing');
console.log('   EMAIL_PORT:', process.env.EMAIL_PORT || '❌ Missing');
console.log('   CONTACT_EMAIL:', process.env.CONTACT_EMAIL || '❌ Missing (will use default)');

if (transporter) {
  console.log('✅ SMTP transport configured successfully\n');
} else {
  console.warn('⚠️ SMTP transport NOT configured. Emails will NOT be sent!');
  console.warn('   Please add to backend/.env file:');
  console.warn('   EMAIL_FROM=your_email@gmail.com');
  console.warn('   EMAIL_PASSWORD=your_app_password');
  console.warn('   EMAIL_HOST=smtp.gmail.com');
  console.warn('   EMAIL_PORT=587');
  console.warn('   CONTACT_EMAIL=kanchankushwaha65520@gmail.com\n');
}

// POST send contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Recreate transporter in case .env was updated
    transporter = createTransporter();

    // Check if transporter is configured
    if (!transporter) {
      console.error('❌ Cannot send email: SMTP not configured');
      return res.status(500).json({ 
        error: 'Email service is not configured. Please contact the administrator.',
        message: 'Your message was received but could not be sent via email.'
      });
    }

    // Set recipient email - use CONTACT_EMAIL or default to kanchankushwaha65520@gmail.com
    const recipientEmail = process.env.CONTACT_EMAIL || 'kanchankushwaha65520@gmail.com';
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: recipientEmail,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin-top: 20px;">
            <p><strong style="color: #333;">Name:</strong> ${name}</p>
            <p><strong style="color: #333;">Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
            <p><strong style="color: #333;">Message:</strong></p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
              <p style="margin: 0; white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This email was sent from your portfolio contact form.</p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    };

    console.log(`\n📧 Attempting to send contact form email:`);
    console.log(`   To: ${recipientEmail}`);
    console.log(`   From: ${name} (${email})`);
    console.log(`   Subject: Portfolio Contact: ${name}`);

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Contact form email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Response: ${info.response || 'Email queued for delivery'}\n`);

    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('\n❌ Email sending failed:');
    console.error('   Error:', error.message);
    if (error.code) console.error('   Error Code:', error.code);
    if (error.response) console.error('   SMTP Response:', error.response);
    
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST test email endpoint
router.post('/test', async (req, res) => {
  try {
    // Recreate transporter in case .env was updated
    transporter = createTransporter();

    if (!transporter) {
      return res.status(500).json({ 
        error: 'SMTP not configured',
        message: 'Please check your .env file and ensure EMAIL_FROM, EMAIL_PASSWORD, EMAIL_HOST, and EMAIL_PORT are set.'
      });
    }

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

    console.log(`\n📧 Sending test email to: ${testEmail}`);
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Test email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Response: ${info.response || 'Email queued for delivery'}\n`);

    res.json({ 
      message: 'Test email sent successfully!',
      to: testEmail,
      messageId: info.messageId
    });
  } catch (error) {
    console.error('\n❌ Test email failed:');
    console.error('   Error:', error.message);
    if (error.code) console.error('   Error Code:', error.code);
    if (error.response) console.error('   SMTP Response:', error.response);
    
    res.status(500).json({ 
      error: 'Failed to send test email',
      details: error.message 
    });
  }
});

module.exports = router;

