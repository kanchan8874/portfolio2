const express = require('express');
const router = express.Router();
const Social = require('../models/Social');

// GET all socials
router.get('/', async (req, res) => {
  try {
    const socials = await Social.find({ active: true }).sort({ order: 1 });
    res.json(socials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create social
router.post('/', async (req, res) => {
  try {
    const social = new Social(req.body);
    await social.save();
    res.status(201).json(social);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update social
router.put('/:id', async (req, res) => {
  try {
    const social = await Social.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!social) {
      return res.status(404).json({ error: 'Social not found' });
    }
    res.json(social);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE social
router.delete('/:id', async (req, res) => {
  try {
    const social = await Social.findByIdAndDelete(req.params.id);
    if (!social) {
      return res.status(404).json({ error: 'Social not found' });
    }
    res.json({ message: 'Social deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

