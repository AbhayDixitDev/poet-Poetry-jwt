const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    comment:String,
    visitor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Visitor"
    },
    poem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Poem"
    }
})

module.exports = mongoose.model("Review",ReviewSchema)