const express = require('express');
const {
  loginAdmin,
  getMe,
  
} = require('../controllers/admincontroller');
const { protect } = require('../middleware/auth');
const Admin = require('../models/Admin');

const router = express.Router();

// router.post('/register', register); 
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new admin
    admin = new Admin({ email, password });
    await admin.save();

    // Generate JWT
    const token = admin.getSignedJwtToken();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login', loginAdmin);
// router.get('/me', protect, getMe);

module.exports = router;
