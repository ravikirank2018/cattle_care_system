const { mongoose } = require('../db')
const { Schema } = mongoose

const CowSchema = new Schema({
  tag: { type: String, required: true, unique: true },
  age: { type: Number },
  healthStatus: { type: String, default: 'unknown' },
  owner: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Cow', CowSchema)
