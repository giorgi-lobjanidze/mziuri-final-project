import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  try {
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already in use' })

    const hashedPassword = await bcrypt.hash(password, 11)

    const user = await User.create({ firstName, lastName, email, password: hashedPassword })
    res.status(201).json({ message: 'Registered successfully', id: user._id })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid email or password' })

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' })

    res.json({
      token: generateToken(user._id),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
    console.log('logged in')
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}