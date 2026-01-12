const { mongoose } = require('../db')
const { Schema } = mongoose

const TradeSchema = new Schema({
  cowId: { type: Schema.Types.ObjectId, ref: 'Cow', required: true },
  seller: { type: String },
  buyer: { type: String },
  price: { type: Number },
  date: { type: Date, default: Date.now }
}, { timestamps: true })

module.exports = mongoose.model('Trade', TradeSchema)
