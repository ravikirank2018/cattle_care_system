const express = require('express');
const router = express.Router();

const { simplePredict } = require('../services/predictService');

// A stub endpoint for disease prediction - returns mock result
router.post('/', (req, res) => {
  // Accept features in body (e.g., temperature, appetite, mobility)
  const features = req.body || {};

  const prediction = simplePredict(features);

  res.json({ features, prediction, note: 'This is a mock prediction. Integrate an ML model to replace this.' });
});

module.exports = router;
