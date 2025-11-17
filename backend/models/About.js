const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    required: true
  },
  shortBio: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  degree: {
    type: String,
    default: ''
  },
  freelance: {
    type: String,
    default: 'Available'
  },
  resume: {
    type: String,
    default: ''
  },
  highlights: [{
    type: String
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('About', aboutSchema);

