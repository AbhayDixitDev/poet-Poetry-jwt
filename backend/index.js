const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')


app.use(cookieParser())
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Database connected');
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(cors({
    
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))



const poetRoute = require("./Routes/PoetRoute")
const visitorRoute = require("./Routes/VisitorRoute")
app.use('/poet',poetRoute)
app.use('/visitor',visitorRoute)

app.listen(8000,()=>{
    console.log('Server started on port 8000');
    
})