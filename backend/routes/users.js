import express from 'express'
import { getProducts, getProductById } from '../controllers/products.js'
import { register, login } from '../controllers/users.js'

const UsersRouter = express.Router()

UsersRouter.post('/register', register)
UsersRouter.post('/login', login)

export default UsersRouter