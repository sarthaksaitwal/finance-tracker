import express from 'express'
import mongoose from 'mongoose'
import User from './models/user.js'

mongoose
  .connect('mongodb://127.0.0.1:27017/finance-tracker-app')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
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

app.listen(port, () => {
  console.log('Server listening at http://localhost:' + port)
})