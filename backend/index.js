import express from 'express'
import cors from "cors"
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import router from './routes/index.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
// routes 


app.use('/api',router)

const PORT = 8080 || process.env.PORT

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log('connected to db')
        console.log(`Server is running`)
    })
})

