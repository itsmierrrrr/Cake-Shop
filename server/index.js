import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 4000)
const mongoUri = process.env.MONGODB_URI
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

if (!mongoUri) {
  console.error('Missing MONGODB_URI. Add it to your .env file.')
  process.exit(1)
}

if (!process.env.JWT_SECRET) {
  console.error('Missing JWT_SECRET. Add it to your .env file.')
  process.exit(1)
}

app.use(
  cors({
    origin: clientOrigin,
    credentials: false,
  }),
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRoutes)

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Auth server running on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error)
    process.exit(1)
  })
