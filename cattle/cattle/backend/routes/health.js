const express = require('express');
const router = express.Router();

const HealthMetric = require('../models/HealthMetric')

// List metrics
router.get('/', async (req, res) => {
  const list = await HealthMetric.find().sort({ timestamp: -1 }).lean()
  res.json(list)
})

// Add metric
router.post('/', async (req, res) => {
  const { cowId, timestamp, temperature, appetite, mobility, notes } = req.body
  if (!cowId || !timestamp) return res.status(400).json({ error: 'cowId and timestamp are required' })
  try {
    const m = await HealthMetric.create({ cowId, timestamp, temperature, appetite, mobility, notes })
    res.status(201).json(m)
  } catch (err) { res.status(400).json({ error: err.message }) }
})

module.exports = router;
