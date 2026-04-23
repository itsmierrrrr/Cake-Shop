import bcrypt from 'bcryptjs'
import express from 'express'
import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'

import { User } from '../models/User.js'

const router = express.Router()

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'
const DEFAULT_GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || `${CLIENT_ORIGIN}/auth/google/callback`

function getSafeRedirectPath(path) {
  if (typeof path !== 'string') {
    return '/'
  }

  if (!path.startsWith('/') || path.startsWith('//')) {
    return '/'
  }

  return path
}

function getGoogleOAuthClient(redirectUri = DEFAULT_GOOGLE_CALLBACK_URL) {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !redirectUri) {
    throw new Error('Google OAuth is not configured on the server.')
  }

  return new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectUri)
}

function parseGoogleState(state) {
  if (typeof state !== 'string') {
    return '/'
  }

  try {
    const parsed = JSON.parse(Buffer.from(state, 'base64url').toString('utf8'))
    return getSafeRedirectPath(parsed.redirectPath)
  } catch {
    return '/'
  }
}

async function completeGoogleAuth({ code, state }) {
  const client = getGoogleOAuthClient()
  const { tokens } = await client.getToken(code)

  if (!tokens.id_token) {
    throw new Error('Missing id_token')
  }

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  })

  const payload = ticket.getPayload()
  const email = payload?.email?.toLowerCase()

  if (!email || !payload?.sub || !payload.email_verified) {
    throw new Error('Google profile is invalid')
  }

  let user = await User.findOne({ email })
  const displayName = payload.name?.trim() || email.split('@')[0]

  if (!user) {
    user = await User.create({
      name: displayName,
      email,
      googleId: payload.sub,
    })
  } else if (!user.googleId) {
    user.googleId = payload.sub
    if (!user.name?.trim()) {
      user.name = displayName
    }
    await user.save()
  }

  return {
    token: createToken(user.id),
    redirectPath: parseGoogleState(state),
  }
}

function redirectToClientSignIn(res, params = new URLSearchParams()) {
  const query = params.toString()
  const target = `${CLIENT_ORIGIN}/signin${query ? `?${query}` : ''}`
  return res.redirect(target)
}

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

router.get('/google', (req, res) => {
  try {
    const client = getGoogleOAuthClient()
    const redirectPath = getSafeRedirectPath(req.query.redirect)
    const state = Buffer.from(JSON.stringify({ redirectPath }), 'utf8').toString('base64url')

    const url = client.generateAuthUrl({
      access_type: 'offline',
      scope: ['openid', 'email', 'profile'],
      prompt: 'select_account',
      state,
      redirect_uri: DEFAULT_GOOGLE_CALLBACK_URL,
    })

    return res.redirect(url)
  } catch {
    const params = new URLSearchParams({ error: 'google_not_configured' })
    return redirectToClientSignIn(res, params)
  }
})

router.post('/google/exchange', async (req, res) => {
  try {
    const code = typeof req.body?.code === 'string' ? req.body.code : ''
    const state = typeof req.body?.state === 'string' ? req.body.state : ''

    if (!code) {
      return res.status(400).json({ message: 'Missing Google authorization code.' })
    }

    const result = await completeGoogleAuth({ code, state })
    return res.status(200).json({
      token: result.token,
      redirect: result.redirectPath,
      provider: 'google',
    })
  } catch {
    return res.status(400).json({ message: 'Google authentication failed.' })
  }
})

router.get('/google/callback', async (req, res) => {
  const errorParams = new URLSearchParams({ error: 'google_auth_failed' })

  try {
    const code = typeof req.query.code === 'string' ? req.query.code : ''
    const state = typeof req.query.state === 'string' ? req.query.state : ''
    if (!code) {
      return redirectToClientSignIn(res, errorParams)
    }

    const result = await completeGoogleAuth({ code, state })
    const successParams = new URLSearchParams({
      token: result.token,
      redirect: result.redirectPath,
      provider: 'google',
    })

    return redirectToClientSignIn(res, successParams)
  } catch {
    return redirectToClientSignIn(res, errorParams)
  }
})

router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.json({ user: { name: user.name, email: user.email } })
})

export default router
