import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit'
import helmet from "helmet";
import compression from 'compression';
import ProductsRouter from './routes/products.js'
// TODO: create these modules and import them:
import connectDB from './db/connection.js'
// import { auth } from './middleware/auth.js'
// import TodosRouter from './routes/todos.js'
// import UsersRouter from './routes/users.js'

const app = express()

dotenv.config()

app.use(express.json())
app.use(cookieParser()); 

app.use(compression())
app.use(helmet())

app.use(cors({
    origin: (origin, callback) => {
        callback(null, origin || '*'); 
    },    
    credentials: true 
}));

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, //5 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later"
})
app.use(limiter)

app.use('/api/products', ProductsRouter) 

// app.use('/api/todos', auth, TodosRouter)  // uncomment after creating auth middleware and TodosRouter
// app.use('/api/users', UsersRouter)         // uncomment after creating UsersRouter

app.listen(3003, () => {
    console.log('server has started')
    connectDB(process.env.CONNECTION_STRING)  // uncomment after creating connectDB
})