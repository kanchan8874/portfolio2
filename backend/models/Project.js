const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  longDescription: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    required: true
  },
  techStack: [{
    type: String
  }],
  category: {
    type: String,
    default: 'web'
  },
  liveLink: {
    type: String,
    default: ''
  },
  githubLink: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);

