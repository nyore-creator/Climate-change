const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Submission = require('../models/Submission');
const auth = require('../middleware/auth');

//new submission (clients)
router.post(
  '/',
  [
    body('country').notEmpty().withMessage('country required'),
    body('hotspots')
      .optional()
      .customSanitizer(value => (Array.isArray(value) ? value : [value])) 
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

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

module.exports = router;
