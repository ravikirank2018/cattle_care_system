const mongoose = require('mongoose');
const log = console;

async function connect(uri) {
  if (!uri) throw new Error('MONGODB_URI is required');
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    log.log('Connected to MongoDB');
  } catch (err) {
    log.error('MongoDB connection error:', err.message);
    throw err;
  }
}

module.exports = { connect, mongoose };
