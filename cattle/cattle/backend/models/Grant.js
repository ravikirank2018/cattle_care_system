const { mongoose } = require('../db')
const { Schema } = mongoose

const GrantSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number },
  description: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Grant', GrantSchema)
