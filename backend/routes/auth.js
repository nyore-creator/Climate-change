const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || "changeme-secret"; // fallback for dev

// =========================
// REGISTER
// =========================
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ success: false, msg: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      user = new User({ name, email, passwordHash });
      await user.save();

      const payload = { userId: user.id };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY || '7d' });

      res.json({
        success: true,
        token,
        user: { id: user.id, name: user.name, email: user.email }
      });
    } catch (err) {
      console.error('Register error:', err.message);
      res.status(500).json({ success: false, msg: 'Server error' });
    }
  }
);

// =========================
// LOGIN
// =========================
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ success: false, msg: 'Invalid credentials' });
      }

      const payload = { userId: user.id };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY || '7d' });

      res.json({
        success: true,
        token,
        user: { id: user.id, name: user.name, email: user.email }
      });
    } catch (err) {
      console.error('Login error:', err.message);
      res.status(500).json({ success: false, msg: 'Server error' });
    }
  }
);

module.exports = router;
