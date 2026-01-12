// Prediction service stub
// Replace the mock logic here with a real ML model integration.
// Example integration points:
//  - Load a TensorFlow SavedModel (tfjs-node) and call predict
//  - Call an external prediction microservice or serverless function
//  - Use Python-based model via a subprocess or RPC

function simplePredict(features = {}) {
  const temp = Number(features.temperature || 37);
  if (temp > 39) return { risk: 'high', score: 0.95 };
  if (temp > 38) return { risk: 'medium', score: 0.6 };
  return { risk: 'low', score: 0.1 };
}

module.exports = { simplePredict };
