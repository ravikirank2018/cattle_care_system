const { mongoose } = require('../db')
const { Schema } = mongoose

const HealthMetricSchema = new Schema({
  cowId: { type: Schema.Types.ObjectId, ref: 'Cow', required: true },
  timestamp: { type: Date, required: true },
  temperature: { type: Number },
  appetite: { type: String },
  mobility: { type: String },
  notes: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('HealthMetric', HealthMetricSchema)
