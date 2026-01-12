const express = require('express');
const router = express.Router();

const Trade = require('../models/Trade')

// List trades
router.get('/', async (req, res) => {
  const list = await Trade.find().sort({ date: -1 }).lean()
  res.json(list)
})

// Create trade
router.post('/', async (req, res) => {
  const { cowId, seller, buyer, price, date } = req.body
  try {
    const t = await Trade.create({ cowId, seller, buyer, price, date: date || Date.now() })
    res.status(201).json(t)
  } catch (err) { res.status(400).json({ error: err.message }) }
})

module.exports = router;
