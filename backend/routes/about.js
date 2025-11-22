const express = require('express');
const router = express.Router();
const About = require('../models/About');
const { authenticateAdmin } = require('../middleware/auth');

// GET about info
router.get('/', async (req, res) => {
  try {
    console.log('📥 GET /api/about - Fetching about data');
    let about = await About.findOne();
    if (!about) {
      console.log('⚠️ No about data found, creating default...');
      // Create default if none exists
      about = new About({
        name: 'Kanchan Kushwaha',
        title: 'Full Stack Developer',
        tagline: 'Creating seamless, scalable web applications',
        bio: 'I\'m a MERN Full Stack Developer...',
        profileImage: '/assets/image.png'
      });
      await about.save();
      console.log('✅ Default about data created');
    } else {
      console.log(`✅ About data found: ${about.name}`);
    }
    res.json(about);
  } catch (error) {
    console.error('❌ Error in GET /api/about:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT update about (Admin only)
router.put('/', authenticateAdmin, async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About(req.body);
    } else {
      Object.assign(about, { ...req.body, updatedAt: Date.now() });
    }
    await about.save();
    res.json(about);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

