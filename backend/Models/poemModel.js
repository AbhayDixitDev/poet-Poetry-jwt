const mongoose = require('mongoose')

const PoemSchema = new mongoose.Schema({
    title:String,
    description:String,
    poster:String,
    poet:{type:mongoose.Schema.Types.ObjectId,ref:"Poet"},
    reviews:[{type:mongoose.Schema.Types.ObjectId,ref:"Review"}],
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"Visitor"}]
})

module.exports = mongoose.model("Poem",PoemSchema)