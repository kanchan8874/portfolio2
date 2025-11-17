const express = require('express');
const router = express.Router();
const ContactInfo = require('../models/ContactInfo');
const { authenticateAdmin } = require('../middleware/auth');

// GET contact info
router.get('/', async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    if (!contactInfo) {
      // Create default if none exists
      contactInfo = new ContactInfo({
        email: process.env.CONTACT_EMAIL || process.env.EMAIL_USER || '',
        location: '',
        availability: 'Available'
      });
      await contactInfo.save();
    }
    res.json(contactInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update contact info (Admin only)
router.put('/', authenticateAdmin, async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    if (!contactInfo) {
      contactInfo = new ContactInfo(req.body);
    } else {
      Object.assign(contactInfo, { ...req.body, updatedAt: Date.now() });
    }
    await contactInfo.save();
    res.json(contactInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

