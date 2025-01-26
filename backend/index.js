const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Database connected');
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
const poetRoute = require("./Routes/PoetRoute")
app.use('/poet',poetRoute)

app.listen(8000,()=>{
    console.log('Server started on port 8000');
    
})