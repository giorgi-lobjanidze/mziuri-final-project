import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
// TODO: create these modules and import them:
// import { connectDB } from './db/connectDB.js'
// import { auth } from './middleware/auth.js'
// import TodosRouter from './routes/todos.js'
// import UsersRouter from './routes/users.js'

const app = express()

dotenv.config()

app.use(express.json())
app.use(cookieParser()); 

app.use(cors({
    origin: (origin, callback) => {
        callback(null, origin || '*'); 
    },    
    credentials: true 
}));

// app.use('/api/todos', auth, TodosRouter)  // uncomment after creating auth middleware and TodosRouter
// app.use('/api/users', UsersRouter)         // uncomment after creating UsersRouter

app.listen(3003, () => {
    console.log('server has started')
    // connectDB(process.env.CONNECTION_STRING)  // uncomment after creating connectDB
})