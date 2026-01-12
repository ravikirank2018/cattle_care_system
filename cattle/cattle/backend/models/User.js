const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  profilePhotoUrl: { type: String },
  phone: { type: String },
  twoFactorEnabled: { type: Boolean, default: false },
  tokenVersion: { type: Number, default: 0 },
  linkedAccounts: { google: { type: String }, github: { type: String } },
  lastLogin: { type: Date },
  emailVerified: { type: Boolean, default: false },
  preferences: { notificationsEmail: { type: Boolean, default: true }, pushNotifications: { type: Boolean, default: true }, profileVisibility: { type: String, enum: ['public','private','contacts'], default: 'public' }, dataSharingConsent: { type: Boolean, default: false } },
  language: { type: String, default: 'en' },
  theme: { type: String, enum: ['light','dark','system'], default: 'system' },
  accessibility: { fontSize: { type: String, default: 'normal' }, highContrast: { type: Boolean, default: false } },
  timezone: { type: String },
  voiceAssistantEnabled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

UserSchema.set('toJSON', {
  transform(doc, ret) {
    delete ret.passwordHash
    return ret
  }
})

module.exports = mongoose.model('User', UserSchema)
