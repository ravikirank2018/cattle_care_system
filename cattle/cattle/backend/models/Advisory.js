const { mongoose } = require('../db')
const { Schema } = mongoose

const AdvisorySchema = new Schema({
  title: { type: String, required: true },
  body: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Advisory', AdvisorySchema)
