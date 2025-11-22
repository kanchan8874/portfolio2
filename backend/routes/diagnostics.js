const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const About = require('../models/About');
const Social = require('../models/Social');
const Testimonial = require('../models/Testimonial');

// GET database diagnostics
router.get('/', async (req, res) => {
  try {
    const diagnostics = {
      database: {
        connected: mongoose.connection.readyState === 1,
        state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown',
        name: mongoose.connection.name,
        host: mongoose.connection.host,
      },
      collections: {
        projects: await Project.countDocuments(),
        skills: await Skill.countDocuments(),
        about: await About.countDocuments(),
        socials: await Social.countDocuments(),
        testimonials: await Testimonial.countDocuments(),
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        port: process.env.PORT,
        frontendUrl: process.env.FRONTEND_URL,
        hasMongoUri: !!process.env.MONGODB_URI,
      },
      timestamp: new Date().toISOString(),
    };

    res.json(diagnostics);
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router;

