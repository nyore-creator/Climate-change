const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Submission = require('../models/Submission');
const auth = require('../middleware/auth');

// ✅ Create new submission (clients)
router.post(
  '/',
  [
    body('country').notEmpty().withMessage('Country is required'),
    body('hotspots')
      .optional()
      .customSanitizer(value => (Array.isArray(value) ? value : [value]))
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const sub = new Submission(req.body);
      await sub.save();
      res.status(201).json(sub);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

// ✅ Get all submissions (admin view)
router.get('/', auth, async (req, res) => {
  try {
    const subs = await Submission.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
