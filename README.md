# Velvet Crumb - Premium Cake Shop Website

A clean, modern cake shop web app built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and shadcn-style UI components.

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui-style reusable components
- Lucide React icons
- React Router
- Sonner toast notifications

## Features

- Premium pastel bakery UI with responsive design
- Home, Shop, Product Details, Cart, Checkout, About, Contact pages
- Product filtering by category, flavor, and max price
- Cart functionality with quantity control and total calculation (Context API)
- Dark and light mode toggle with localStorage persistence
- Smooth route transitions and subtle hover animations
- Loading skeleton states
- Toast notifications for actions
- Fake API-style cake data source
- Lazy loaded images with hover zoom effect
- MongoDB-backed authentication (Sign Up, Verify, Sign In)
- Checkout protection: only verified users can place orders

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Run With Auth + MongoDB

1. Copy env template and set values:

```bash
copy .env.example .env
```

2. Ensure MongoDB is running locally (or update `MONGODB_URI` in `.env` to your hosted MongoDB URL).

3. Start both frontend and backend:

```bash
npm run dev:full
```

4. Open `http://localhost:5173`.

## Auth Flow

1. Click **Sign Up**.
2. Submit name, email, and password.
3. Enter the verification code.
: In development, the code is returned by the API and shown via toast.
4. Sign in.
5. Access Checkout and place order.

If a user is not verified, sign-in is blocked and checkout remains protected.

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  components/
    common/
    shop/
    ui/
  context/
  data/
  hooks/
  lib/
  pages/
  types/
  utils/
  App.tsx
  index.css
  main.tsx
server/
  index.js
  models/
  routes/
```
