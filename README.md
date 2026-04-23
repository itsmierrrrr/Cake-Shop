# Cake Shop Website

A modern cake shop web app with a React + Vite frontend and a lightweight Express + MongoDB auth API.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS
- React Router
- Framer Motion
- Sonner (toast notifications)
- Express + Mongoose + JWT for authentication

## Features

- Responsive storefront with Home, Shop, Product Details, Cart, Checkout, About, and Contact pages
- Client-side filtering in shop (category, flavor, and max price)
- Cart state management with Context API and quantity controls
- Light and dark theme toggle with persistence
- Route transition animations and loading skeletons
- Auth flow with Sign Up, Sign In, and token-based session restore
- Protected checkout route that redirects unauthenticated users to Sign In
- Frontend product catalog from local data (`src/data/cakes.ts`)

## Prerequisites

- Node.js 18+
- npm
- MongoDB instance (local or hosted)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create backend env file from template:

```bash
copy .env.example .env
```

3. Update `.env` values:

- `MONGODB_URI` your MongoDB connection string
- `JWT_SECRET` any strong secret value
- `PORT` backend port (default `4000`)
- `CLIENT_ORIGIN` frontend origin (default `http://localhost:5173`)
- `GOOGLE_CLIENT_ID` OAuth client ID from Google Cloud Console
- `GOOGLE_CLIENT_SECRET` OAuth client secret from Google Cloud Console
- `GOOGLE_CALLBACK_URL` frontend callback URL (example `http://localhost:5173/auth/google/callback`)

4. Optional frontend env (`.env.local`):

```bash
VITE_API_URL=http://localhost:4000
```

If `VITE_API_URL` is not set, the frontend defaults to `http://localhost:4000`.

## Run

Start frontend only:

```bash
npm run dev
```

Start backend only:

```bash
npm run server
```

Start frontend + backend together:

```bash
npm run dev:full
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:4000` by default.

## Available Scripts

- `npm run dev` start Vite dev server
- `npm run server` start Express server with nodemon
- `npm run dev:full` run frontend and backend concurrently
- `npm run build` type-check and build production assets
- `npm run preview` preview built frontend
- `npm run lint` run ESLint

## Auth API

Base URL: `http://localhost:4000/api/auth`

- `POST /signup` create user account
- `POST /signin` authenticate and return JWT + user info
- `GET /google` start Google OAuth flow
- `POST /google/exchange` exchange Google auth code for JWT
- `GET /google/callback` legacy backend callback endpoint (still supported)
- `GET /me` return current user (requires `Authorization: Bearer <token>`)

Health check endpoint: `GET /api/health`

## Project Structure

```text
.
|-- public/
|-- server/
|   |-- index.js
|   |-- models/
|   \-- routes/
|-- src/
|   |-- components/
|   |   |-- common/
|   |   |-- shop/
|   |   \-- ui/
|   |-- context/
|   |-- data/
|   |-- hooks/
|   |-- lib/
|   |-- pages/
|   |-- types/
|   \-- utils/
|-- index.html
|-- package.json
\-- vite.config.ts
```
