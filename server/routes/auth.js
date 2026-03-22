import bcrypt from 'bcryptjs'
import express from 'express'
import jwt from 'jsonwebtoken'

import { User } from '../models/User.js'

const router = express.Router()

function createToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

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

router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.json({ user: { name: user.name, email: user.email } })
})

export default router
