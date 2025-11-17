const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'database', 'tools', 'other'],
    default: 'other'
  },
  proficiency: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  color: {
    type: String,
    default: '#3b82f6'
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Skill', skillSchema);

