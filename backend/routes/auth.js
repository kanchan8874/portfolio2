const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Admin Login
router.post('/admin/login', async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ 
        error: 'Password is required' 
      });
    }

    // Get admin password hash from environment
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    
    if (!adminPasswordHash) {
      console.error('ADMIN_PASSWORD_HASH not set in environment');
      return res.status(500).json({ 
        error: 'Server configuration error' 
      });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, adminPasswordHash);

    if (!isValid) {
      return res.status(401).json({ 
        error: 'Invalid password' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        admin: true,
        timestamp: Date.now()
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: '24h' // Token expires in 24 hours
      }
    );

    res.json({
      success: true,
      token,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Login failed' 
    });
  }
});

// Verify token (for frontend to check if still valid)
router.get('/admin/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        valid: false,
        error: 'No token provided' 
      });
    }

    const token = authHeader.substring(7);
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ 
          valid: false,
          error: 'Invalid or expired token' 
        });
      }
      
      res.json({ 
        valid: true,
        admin: decoded 
      });
    });
  } catch (error) {
    res.status(500).json({ 
      valid: false,
      error: 'Verification failed' 
    });
  }
});

module.exports = router;

