const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

console.log(`🗄️ Connecting MongoDB: ${MONGODB_URI}`);

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });

// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://portfolio2-1-t3ns.onrender.com',
  'http://localhost:3000',
  'http://localhost:3001',
].filter(Boolean); // Remove undefined values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Log CORS configuration
console.log('🌐 CORS Configuration:');
console.log('   Allowed Origins:', allowedOrigins.length > 0 ? allowedOrigins.join(', ') : 'None configured');
console.log('   FRONTEND_URL:', process.env.FRONTEND_URL || 'Not set');

// Routes
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/about', require('./routes/about'));
app.use('/api/socials', require('./routes/socials'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/hero', require('./routes/hero'));
app.use('/api/contact-info', require('./routes/contactInfo'));
app.use('/api/contact', require('./routes/contact'));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio Backend Running' });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
