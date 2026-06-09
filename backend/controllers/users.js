import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { sendResetPasswordMail, sendContactMail} from '../utills/mailSender.js'

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password + process.env.BCRYPT_PEPPER, 11)

    const user = await User.create({ firstName, lastName, email, password: hashedPassword })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })

    const userObj = user.toObject()
    delete userObj.password

    return res.status(201).json({ data: userObj })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ err: 'Something went wrong' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ err: 'Invalid email or password' })

    const isPasswordValid = await bcrypt.compare(password + process.env.BCRYPT_PEPPER, user.password)
    if (!isPasswordValid) return res.status(400).json({ err: 'Invalid email or password' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })

    const userObj = user.toObject()
    delete userObj.password

    return res.status(200).json({ data: userObj })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ err: 'Something went wrong' })
  }
}

export const logout = (req, res) => {
  try {
    res.clearCookie('token')
    return res.status(200).json({ data: 'User has logged out' })
  } catch (err) {
    return res.status(500).json({ err: 'Something went wrong' })
  }
}

export const getToken = (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) return res.json({ err: 'Please login now!' })

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return res.status(400).json({ msg: 'Please login now!' })
      return res.status(200).json({ data: token })
    })
  } catch (err) {
    return res.status(500).json({ err: 'Something went wrong' })
  }
}

export const getUser = async (req, res) => {
  try {
    const token = req.header('Authorization')
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    const user = await User.findById(decoded.id).select('-password')

    return res.status(200).json({ data: user })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ err: 'Something went wrong' })
  }
}

export const forgotPasswordUser = async (req, res) => {
    try {
        const { email } = req.body;

        let user = await User.findOne({ email: email });
        if(!user) {
            return res.status(400).json({err: "Email is incorrect!"})
        }

        const access_token = jwt.sign({ id: user._id }, process.env.JWT_RESET_PASS_SECRET_KEY, { expiresIn: '15m' });
        const url = `http://localhost:5173/reset-password/${access_token}`  

        await sendResetPasswordMail(email, url)

        return res.status(200).json({ data: "Check your email for further instructions" })
    } catch (err) {
        return res.status(500).json({ err: "Something went wrong" });
    }

}


export const resetPasswordUser = async (req, res) => {
    try {
        const { password } = req.body;
        const token = req.header('Authorization');

        const decoded = jwt.verify(token, process.env.JWT_RESET_PASS_SECRET_KEY);
        const userId = decoded.id;

        const hashedPassword = await bcrypt.hash(password + process.env.BCRYPT_PEPPER, 11)

        await User.findOneAndUpdate({_id: userId}, {
            password: hashedPassword
        })

        return res.status(200).json({ data: "Password successfully changed!" })
    } catch (err) {
      return res.status(500).json({ err: "Something went wrong" });
    }

}

export const contact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    await sendContactMail(email, name, phone, message);
    return res.status(200).json({ data: "Email has sent!" });
  } catch (err) {
    console.error('Contact mail error:', err);
    return res.status(500).json({ err: "Something went wrong" });
  }
};