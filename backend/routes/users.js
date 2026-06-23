import express from 'express'
import { getProducts, getProductById } from '../controllers/products.js'
import { register, login, logout, getUser, getToken, contact, forgotPasswordUser, resetPasswordUser, addAddress } from '../controllers/users.js'

const UsersRouter = express.Router()

UsersRouter.post('/register', register)
UsersRouter.post('/login', login)
UsersRouter.post('/logout', logout)
UsersRouter.get('/get-user', getUser)
UsersRouter.get('/get-token', getToken)
UsersRouter.post('/contact', contact)
UsersRouter.post('/forgot-password', forgotPasswordUser)
UsersRouter.post('/reset-password', resetPasswordUser)
UsersRouter.post('/add-address', addAddress)

export default UsersRouter