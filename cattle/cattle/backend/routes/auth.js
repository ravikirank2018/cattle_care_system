const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret'
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d'

const { validatePassword } = require('../utils/password')

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' })
    const pwdErr = validatePassword(password)
    if (pwdErr) return res.status(400).json({ message: pwdErr })

    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ message: 'Email already registered' })

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({ name, email, passwordHash })
    await user.save()

    const token = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES })

    res.json({ token, user: user.toJSON() })
  } catch (err) {
    console.error('Register error', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' })

    // update lastLogin
    user.lastLogin = new Date()
    await user.save()

    // sign token including tokenVersion so tokens can be invalidated by bumping tokenVersion
    const token = jwt.sign({ sub: user._id, role: user.role, tv: user.tokenVersion || 0 }, JWT_SECRET, { expiresIn: JWT_EXPIRES })

    res.json({ token, user: user.toJSON() })
  } catch (err) {
    console.error('Login error', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
