const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { authenticateToken } = require('../middleware/auth')
const { validatePassword } = require('../utils/password')

// GET /api/users/me
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    console.error('Get profile error', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// PUT /api/users/me
router.put('/me', authenticateToken, async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword, preferences, profilePhotoUrl, phone, language, theme, timezone, voiceAssistantEnabled } = req.body
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    // Update name/email
    if (name) user.name = name
    if (email && email !== user.email) {
      const existing = await User.findOne({ email })
      if (existing && existing._id.toString() !== user._id.toString()) return res.status(409).json({ message: 'Email already in use' })
      user.email = email
      // mark unverified and (in a real app) send verification email
      user.emailVerified = false
    }

    // Update password (require current password)
    if (newPassword) {
      if (!currentPassword) return res.status(400).json({ message: 'Current password is required to change password' })
      const ok = await bcrypt.compare(currentPassword, user.passwordHash)
      if (!ok) return res.status(401).json({ message: 'Current password is incorrect' })
      const pwdErr = validatePassword(newPassword)
      if (pwdErr) return res.status(400).json({ message: pwdErr })
      const salt = await bcrypt.genSalt(10)
      user.passwordHash = await bcrypt.hash(newPassword, salt)
    }

    // Preferences update (partial)
    if (preferences && typeof preferences === 'object') {
      user.preferences = Object.assign({}, user.preferences || {}, preferences)
    }

    // Other optional updates
    if (typeof profilePhotoUrl !== 'undefined') user.profilePhotoUrl = profilePhotoUrl
    if (typeof phone !== 'undefined') user.phone = phone
    if (typeof language !== 'undefined') user.language = language
    if (typeof theme !== 'undefined') user.theme = theme
    if (typeof timezone !== 'undefined') user.timezone = timezone
    if (typeof voiceAssistantEnabled !== 'undefined') user.voiceAssistantEnabled = voiceAssistantEnabled

    await user.save()
    res.json(user.toJSON())
  } catch (err) {
    console.error('Update profile error', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// POST /api/users/me/logoutAll
router.post('/me/logoutAll', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    user.tokenVersion = (user.tokenVersion || 0) + 1
    await user.save()
    res.json({ message: 'Logged out from all devices' })
  } catch (err) {
    console.error('Logout all error', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// POST /api/users/me/link/:provider - placeholder
router.post('/me/link/:provider', authenticateToken, async (req, res) => {
  try {
    const { provider } = req.params
    // In a real app we'd verify the provider token and link accounts; here we accept a providerId in body for demo
    const { providerId } = req.body
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (!providerId) return res.status(400).json({ message: 'providerId required' })
    user.linkedAccounts = user.linkedAccounts || {}
    user.linkedAccounts[provider] = providerId
    await user.save()
    res.json(user.toJSON())
  } catch (err) {
    console.error('Link provider error', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// POST /api/users/me/unlink/:provider - placeholder
router.post('/me/unlink/:provider', authenticateToken, async (req, res) => {
  try {
    const { provider } = req.params
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (user.linkedAccounts && user.linkedAccounts[provider]) {
      user.linkedAccounts[provider] = undefined
      await user.save()
    }
    res.json(user.toJSON())
  } catch (err) {
    console.error('Unlink provider error', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
