const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const mongoOptions = {
  serverSelectionTimeoutMS:
    Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS) || 8000,
};

if (process.env.MONGODB_DB_NAME) {
  mongoOptions.dbName = process.env.MONGODB_DB_NAME;
}

if (process.env.MONGODB_TLS_ALLOW_INVALID_CERT === 'true') {
  mongoOptions.tlsAllowInvalidCertificates = true;
  console.warn('⚠️ tlsAllowInvalidCertificates enabled. Do this only in trusted dev environments.');
}

console.log(`🗄️ Attempting MongoDB connection: ${MONGODB_URI}`);

mongoose
  .connect(MONGODB_URI, mongoOptions)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    console.error(
      '   Checklist: (1) Ensure your Atlas cluster allows this IP, (2) Verify username/password, (3) ' +
        'Use MONGODB_TLS_ALLOW_INVALID_CERT=true only if corporate proxy intercepts TLS.'
    );
  });

// Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/about', require('./routes/about'));
app.use('/api/socials', require('./routes/socials'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/hero', require('./routes/hero'));
app.use('/api/contact-info', require('./routes/contactInfo'));
app.use('/api/contact', require('./routes/contact'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio API is running' });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please:`);
    console.error(`   1. Stop the other process using port ${PORT}`);
    console.error(`   2. Or set a different PORT in your .env file`);
    console.error(`   3. On Windows, find the process: netstat -ano | findstr :${PORT}`);
    console.error(`   4. Kill it: taskkill /F /PID <process_id>`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
    process.exit(1);
  }
});

