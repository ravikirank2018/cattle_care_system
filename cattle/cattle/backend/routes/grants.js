const express = require('express');
const router = express.Router();

const Grant = require('../models/Grant')

router.get('/', async (req, res) => {
  const list = await Grant.find().sort({ createdAt: -1 }).lean()
  res.json(list)
})

router.post('/', async (req, res) => {
  const { name, amount, description } = req.body
  try {
    const g = await Grant.create({ name, amount, description })
    res.status(201).json(g)
  } catch (err) { res.status(400).json({ error: err.message }) }
})

module.exports = router;
