const mongoose = require('mongoose')
const{Schema} = mongoose

const enquireyModel = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true,
        max:9999999999
    }
})

const Enquiry = mongoose.model("Enquiry",enquireyModel)
module.exports = Enquiry