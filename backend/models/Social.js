const mongoose = require('mongoose');

const socialSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#3b82f6'
  },
  order: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Social', socialSchema);

