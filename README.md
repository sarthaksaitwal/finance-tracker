# Finance Tracker

Finance Tracker is a full-stack personal finance dashboard for tracking income, expenses, and spending trends. The app includes authentication, transaction management, summary cards, charts, and a settings page with theme controls.

## Features

- User authentication with JWT-based login and registration
- Dashboard with quick-add transaction form, summary cards, and recent activity
- Transactions view with search and income/expense filters
- Analytics view with trend and category charts
- Dark mode toggle and basic account preferences
- Backend API backed by MongoDB and Express

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Recharts
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

## Project Structure

- `fintrack/` - Vite React frontend
- `server/` - Express + MongoDB API

## Prerequisites

- Node.js 18 or newer
- MongoDB running locally or a MongoDB connection string

## Setup

### 1. Install frontend dependencies

```bash
cd fintrack
npm install
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Configure environment variables

Create a `.env` file in `server/` with values similar to:

```env
MONGO_URI=mongodb://127.0.0.1:27017/finance-tracker-app
JWT_SECRET=your_secret_key
PORT=3000
SALT_ROUNDS=10
```

If the frontend needs a custom API URL, create a `.env` file in `fintrack/`:

```env
VITE_API_BASE=http://localhost:3000
```

## Running the App

Start the backend first:

```bash
cd server
node server.js
```

Then start the frontend in a separate terminal:

```bash
cd fintrack
npm run dev
```

The frontend runs on Vite’s default development port, and the backend listens on port `3000` unless overridden.

## Available Scripts

### Frontend

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build locally

### Backend

The backend currently exposes `server.js` directly. Run it with:

```bash
node server.js
```

## API Overview

- `POST /api/auth/register` - Create a new user
- `POST /api/auth/login` - Log in and receive a JWT
- `GET /api/transactions` - Fetch the current user’s transactions
- `POST /api/transactions` - Add a transaction
- `DELETE /api/transactions/:id` - Delete a transaction

## Notes

- The frontend stores the auth token in `localStorage`.
- Transaction totals and charts are derived from the API response.
- Currency formatting is currently INR-based in the client.