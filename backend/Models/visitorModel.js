const mongoose = require('mongoose')

const VisitorSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    avatar:String,
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"Poem"} ]
})

module.exports = mongoose.model("Visitor",VisitorSchema)