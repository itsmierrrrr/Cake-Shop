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

- Fully responsive storefront with Home, Shop, Product Details, Cart, Wishlist, Checkout, About, Contact, and FAQ pages
- Advanced client-side filtering with category, flavor, price range, sorting, and instant search functionality
- Smart cart state management using Context API with quantity controls, persistent storage, and animated cart interactions
- Light, dark, and system theme toggle with seamless persistence and smooth UI transitions
- Modern route transition animations, loading skeletons, staggered reveals, and micro-interactions using Framer Motion
- Complete authentication flow with Sign Up, Sign In, Forgot Password, form validation, and token-based session restore
- Secure protected checkout route redirecting unauthenticated users to Sign In while preserving navigation state
- Dynamic frontend product catalog powered by local TypeScript data (src/data/cakes.ts) with scalable architecture for future API integration

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
copy .env.example
```

3. Update `.env` values:

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
- `POST /google` verify frontend Google ID token and return JWT + user info
- `GET /me` return current user (requires `Authorization: Bearer <token>`)

Protected API examples:

- `GET /api/profile` return current user profile (requires JWT)
- `GET /api/data` example protected data endpoint (requires JWT)

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
