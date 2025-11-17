const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { authenticateAdmin } = require('../middleware/auth');

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET featured testimonials
router.get('/featured', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ featured: true }).sort({ order: 1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create testimonial (Admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update testimonial (Admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE testimonial (Admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

