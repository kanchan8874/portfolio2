const express = require('express');
const router = express.Router();
const ContactInfo = require('../models/ContactInfo');

// GET contact info
router.get('/', async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    if (!contactInfo) {
      // Create default if none exists
      contactInfo = new ContactInfo({
        email: 'kanchankushwaha65520@gmail.com',
        location: 'Noida',
        availability: 'Available'
      });
      await contactInfo.save();
    }
    res.json(contactInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update contact info
router.put('/', async (req, res) => {
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

