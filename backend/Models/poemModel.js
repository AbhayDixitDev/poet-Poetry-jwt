const mongoose = require('mongoose')

const PoemSchema = new mongoose.Schema({
    title:String,
    description:String,
    poster:String,
    poet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Poet"
    }
})

module.exports = mongoose.model("Poem",PoemSchema)