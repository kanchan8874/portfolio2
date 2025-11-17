const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  tagline: {
    type: String,
    required: true
  },
  primaryCTA: {
    text: {
      type: String,
      default: 'Get In Touch'
    },
    link: {
      type: String,
      default: '#contact'
    }
  },
  secondaryCTA: {
    text: {
      type: String,
      default: 'View Projects'
    },
    link: {
      type: String,
      default: '#projects'
    }
  },
  resumeLink: {
    type: String,
    default: ''
  },
  showResumeButton: {
    type: Boolean,
    default: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Hero', heroSchema);

