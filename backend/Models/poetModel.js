const mongoose = require('mongoose')

const PoetSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

module.exports = mongoose.model("Poet",PoetSchema)