import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import cors from 'cors'

import User from './models/user.js'
import Transaction from './models/transaction.js'
import authMiddleware from './middleware/authMiddleware.js'



mongoose
  .connect('mongodb://127.0.0.1:27017/finance-tracker-app')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

const app = express()
const port = 3000

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("email password -_id");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.create({ email, password })
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email
      }
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email already exists' })
    }
    return res.status(500).json({ message: 'Server error', error: error.message })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const isMatch = password === user.password
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'dev_secret_key',
      { expiresIn: '1d' }
    )

    return res.json({
      message: 'Login successful',
      token
    })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

app.post('/api/transactions', authMiddleware, async (req, res) => {
  try {
    const { amount, type, category, date } = req.body

    if (amount == null || !type || !category) {
      return res.status(400).json({
        message: 'amount, type and category are required'
      })
    }

    const transaction = await Transaction.create({
      userId: req.userId,
      amount,
      type,
      category,
      date
    })

    return res.status(201).json({
      message: 'Transaction added successfully',
      transaction
    })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

app.listen(port, () => {
  console.log('Server listening at http://localhost:' + port)
})