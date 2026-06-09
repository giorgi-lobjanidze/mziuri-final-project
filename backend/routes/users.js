import express from 'express'
import { getProducts, getProductById } from '../controllers/products.js'
import { register, login, contact, forgotPasswordUser, resetPasswordUser } from '../controllers/users.js'

const UsersRouter = express.Router()

UsersRouter.post('/register', register)
UsersRouter.post('/login', login)
UsersRouter.post('/contact', contact)
UsersRouter.post('/forgot-password', forgotPasswordUser)
UsersRouter.post('/reset-password', resetPasswordUser) 

export default UsersRouter