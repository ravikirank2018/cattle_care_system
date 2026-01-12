const jwt = require('jsonwebtoken')
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret'

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[0] === 'Bearer' ? authHeader.split(' ')[1] : null
  if (!token) return res.status(401).json({ message: 'Missing token' })

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    // Attach minimal user info and validate tokenVersion if present
    const userDoc = await User.findById(payload.sub).select('-passwordHash')
    if (!userDoc) return res.status(401).json({ message: 'Invalid token user' })
    if (typeof payload.tv !== 'undefined' && (payload.tv || 0) !== (userDoc.tokenVersion || 0)) {
      return res.status(401).json({ message: 'Token has been revoked' })
    }
    req.user = { id: payload.sub, role: payload.role }
    req.userDoc = userDoc
    next()
  } catch (err) {
    console.error('Auth error', err)
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

function requireRole(role) {
  return function (req, res, next) {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
    if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden' })
    return next()
  }
}

module.exports = { authenticateToken, requireRole }
