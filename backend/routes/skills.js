const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const { authenticateAdmin } = require('../middleware/auth');

// GET all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, category: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET skills by category
router.get('/category/:category', async (req, res) => {
  try {
    const skills = await Skill.find({ category: req.params.category }).sort({ order: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create skill (Admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update skill (Admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE skill (Admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

