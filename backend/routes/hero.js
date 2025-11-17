const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');

// GET hero info
router.get('/', async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      // Create default if none exists
      hero = new Hero({
        name: 'Kanchan Kushwaha',
        title: 'Full Stack Developer',
        tagline: 'Creating seamless, scalable web applications',
        primaryCTA: {
          text: 'Get In Touch',
          link: '#contact'
        },
        secondaryCTA: {
          text: 'View Projects',
          link: '#projects'
        },
        showResumeButton: true
      });
      await hero.save();
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update hero
router.put('/', async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = new Hero(req.body);
    } else {
      Object.assign(hero, { ...req.body, updatedAt: Date.now() });
    }
    await hero.save();
    res.json(hero);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

