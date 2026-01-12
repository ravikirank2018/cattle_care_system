const express = require('express');
const router = express.Router();

const Cow = require('../models/Cow')

// List cows (protected)
const { authenticateToken } = require('../middleware/auth')
router.get('/', authenticateToken, async (req, res) => {
  const all = await Cow.find().sort({ createdAt: -1 }).lean()
  res.json(all)
})

// Get a cow
router.get('/:id', async (req, res) => {
  try {
    const cow = await Cow.findById(req.params.id).lean()
    if (!cow) return res.status(404).json({ error: 'Not found' })
    res.json(cow)
  } catch (err) { res.status(400).json({ error: 'Invalid id' }) }
})

// Create a cow
router.post('/', async (req, res) => {
  const { tag, age, healthStatus, owner } = req.body
  try {
    const newCow = await Cow.create({ tag, age, healthStatus: healthStatus || 'unknown', owner })
    res.status(201).json(newCow)
  } catch (err) { res.status(400).json({ error: err.message }) }
})

module.exports = router;
