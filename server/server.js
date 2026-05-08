import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import User from './models/user.js'
import Transaction from './models/transaction.js'
import authMiddleware from './middleware/authMiddleware.js'



const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/finance-tracker-app'
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

const app = express()
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key'

app.use(
  cors({
    origin: ['http://localhost:5173','http://localhost:5174'],
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
    const users = await User.find().select("email username -_id");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body

    console.log(req.body)

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email and password are required' })
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    console.log(hashedPassword)

    const user = await User.create({ username, email, password: hashedPassword })
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    if (error.code === 11000) {
      const field = error.keyValue ? Object.keys(error.keyValue)[0] : 'email'
      return res.status(409).json({ message: `${field} already exists` })
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
      console.warn(`[Auth] Login failed - user not found: ${email}`)
      return res.status(404).json({ message: 'User not found' })
    }

    // Support legacy plaintext passwords by migrating them to bcrypt on successful login
    let isMatch = false
    try {
      const pw = user.password || ''
      const isBcryptHash = typeof pw === 'string' && /^\$2[aby]\$/.test(pw)
      if (isBcryptHash) {
        isMatch = await bcrypt.compare(password, pw)
      } else {
        // legacy plaintext stored — compare directly and upgrade
        if (password === pw) {
          isMatch = true
          try {
            user.password = await bcrypt.hash(password, SALT_ROUNDS)
            await user.save()
            console.info(`[Auth] Migrated plaintext password to bcrypt for ${email}`)
          } catch (saveErr) {
            console.error(`[Auth] Failed to migrate password for ${email}:`, saveErr)
          }
        } else {
          isMatch = false
        }
      }
    } catch (pwErr) {
      console.error(`[Auth] Error checking password for ${email}:`, pwErr)
      return res.status(500).json({ message: 'Server error during authentication' })
    }

    if (!isMatch) {
      console.warn(`[Auth] Login failed - invalid credentials: ${email}`)
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // include username in token payload
    const token = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      JWT_SECRET,
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
    console.log(req.body)
    const { amount, type, category, date, description, paymentMethod } = req.body

    // Basic validation aligned with schema
    const allowedTypes = ['income', 'expense']
    const allowedPayments = ['cash', 'card', 'upi', 'bank']

    if (amount == null || isNaN(Number(amount)) || Number(amount) < 0) {
      return res.status(400).json({ message: 'amount must be a non-negative number' })
    }
    if (!type || !allowedTypes.includes(type)) {
      return res.status(400).json({ message: `type is required and must be one of: ${allowedTypes.join(', ')}` })
    }
    if (!category || !String(category).trim()) {
      return res.status(400).json({ message: 'category is required' })
    }
    // if (description && String(description).length > 200) {
    //   return res.status(400).json({ message: 'description must be 200 characters or less' })
    // }
    if (paymentMethod && !allowedPayments.includes(paymentMethod)) {
      return res.status(400).json({ message: `paymentMethod must be one of: ${allowedPayments.join(', ')}` })
    }

    const txDate = date ? new Date(date) : undefined

    const transaction = await Transaction.create({
      userId: req.userId,
      amount: Number(amount),
      type,
      category: String(category).trim(),
      description: description ? String(description).trim() : undefined,
      paymentMethod: paymentMethod || undefined,
      date: txDate || undefined,
    })

    return res.status(201).json({ message: 'Transaction added successfully', transaction })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

app.get('/api/transactions', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId })
      .sort({ date: -1 })

    return res.status(200).json({
      message: 'Transactions fetched successfully',
      transactions
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

app.delete('/api/transactions/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid transaction id' })
    }

    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: id,
      userId: req.userId
    })

    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    return res.status(200).json({
      message: 'Transaction deleted successfully',
      transaction: deletedTransaction
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

app.listen(port, () => {
  console.log('Server listening at http://localhost:' + port)
})