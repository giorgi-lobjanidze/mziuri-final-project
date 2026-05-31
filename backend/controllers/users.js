import User from '../models/user.js'
import jwt from 'jsonwebtoken'

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  console.log('register hit:', req.body)
  try {
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already in use' })

    const user = await User.create({ firstName, lastName, email, password })
    res.status(201).json({ message: 'Registered successfully', id: user._id })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  console.log('login hit:', req.body)
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid email or password' })

    const match = await user.matchPassword(password)
    if (!match) return res.status(401).json({ message: 'Invalid email or password' })

    res.json({
      token: generateToken(user._id),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}