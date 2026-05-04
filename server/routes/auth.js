import bcrypt from 'bcryptjs'
import express from 'express'
import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'

import { User } from '../models/User.js'
import { Order } from '../models/Order.js'

const router = express.Router()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null

function createToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

function toUserPayload(user) {
  return {
    name: user.name,
    email: user.email,
    avatar: user.avatar || null,
  }
}

function getBearerToken(req) {
  const authHeader = req.headers.authorization || ''
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
}

function authMiddleware(req, res, next) {
  const token = getBearerToken(req)

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = payload.sub
    return next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

async function verifyGoogleIdToken(idToken) {
  if (!googleClient || !GOOGLE_CLIENT_ID) {
    throw new Error('Google OAuth is not configured on the server.')
  }

  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  })

  const payload = ticket.getPayload()

  if (!payload?.sub || !payload?.email || !payload.email_verified) {
    throw new Error('Google profile is invalid.')
  }

  return payload
}

async function upsertGoogleUser(payload) {
  const email = payload.email.toLowerCase()
  const displayName = payload.name?.trim() || email.split('@')[0]
  const avatar = payload.picture || null

  let user = await User.findOne({ googleId: payload.sub })
  let isNewUser = false

  if (!user) {
    user = await User.findOne({ email })
  }

  if (!user) {
    user = await User.create({
      name: displayName,
      email,
      googleId: payload.sub,
      avatar,
    })
    isNewUser = true
    return { user, isNewUser }
  }

  if (!user.googleId) {
    user.googleId = payload.sub
  }

  if (!user.name?.trim()) {
    user.name = displayName
  }

  if (!user.avatar && avatar) {
    user.avatar = avatar
  }

  await user.save()
  return { user, isNewUser }
}

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json({ message: 'Name, email, and password are required.' })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' })
  }

  const normalizedEmail = email.trim().toLowerCase()
  const existing = await User.findOne({ email: normalizedEmail })
  if (existing) {
    if (!existing.passwordHash && existing.googleId) {
      return res.status(409).json({ message: 'This email is linked to Google. Please sign in with Google.' })
    }

    return res.status(409).json({ message: 'Account already exists. Please sign in.' })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
  })

  return res.status(201).json({
    message: 'Signup successful. You can now sign in.',
  })
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() })
  if (!user) {
    return res.status(404).json({ message: 'No account found for this email. Please sign up.' })
  }

  if (!user.passwordHash) {
    return res.status(400).json({ message: 'This account uses Google sign-in. Continue with Google to sign in.' })
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash)
  if (!validPassword) {
    return res.status(401).json({ message: 'Incorrect password. Please try again.' })
  }

  const token = createToken(user.id)
  return res.status(200).json({
    token,
    user: { name: user.name, email: user.email },
  })
})

router.post('/google', async (req, res) => {
  try {
    const idToken = typeof req.body?.idToken === 'string' ? req.body.idToken.trim() : ''

    if (!idToken) {
      return res.status(400).json({ message: 'Missing Google ID token.' })
    }

    const payload = await verifyGoogleIdToken(idToken)
    const { user, isNewUser } = await upsertGoogleUser(payload)
    const token = createToken(user.id)

    return res.status(isNewUser ? 201 : 200).json({
      token,
      user: toUserPayload(user),
      isNewUser,
    })
  } catch {
    return res.status(400).json({ message: 'Google authentication failed.' })
  }
})

router.get('/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.json({ user: toUserPayload(user) })
})

router.get('/data', authMiddleware, async (_req, res) => {
  return res.json({
    message: 'Protected data loaded successfully.',
    items: ['Fresh cakes', 'Seasonal cakes', 'Order history'],
  })
})

router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.json({ user: toUserPayload(user) })
})

router.post('/orders', authMiddleware, async (req, res) => {
  try {
    const { items, subtotal, shipping, paymentMethod } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must include at least one item.' })
    }

    const order = await Order.create({
      userId: req.userId,
      items,
      subtotal: Number(subtotal) || 0,
      shipping: Number(shipping) || 0,
      total: Number(subtotal || 0) + Number(shipping || 0),
      paymentMethod: paymentMethod || null,
    })

    return res.status(201).json({ order })
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create order.' })
  }
})

router.get('/orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 })
    return res.json({ orders })
  } catch (err) {
    return res.status(500).json({ message: 'Failed to load orders.' })
  }
})

export default router
