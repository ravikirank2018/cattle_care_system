const express = require('express');
const router = express.Router();

const Advisory = require('../models/Advisory')

// List advisories
router.get('/', async (req, res) => {
  const list = await Advisory.find().sort({ createdAt: -1 }).lean()
  res.json(list)
})

router.post('/', async (req, res) => {
  const { title, body } = req.body
  try {
    const a = await Advisory.create({ title, body })
    res.status(201).json(a)
  } catch (err) { res.status(400).json({ error: err.message }) }
})

module.exports = router;
