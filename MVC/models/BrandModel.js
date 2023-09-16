const mongoose = require('mongoose')

const {Schema} = mongoose

const brandSchema = new Schema({
    brand:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

const Brand = mongoose.model('Brand',brandSchema)

module.exports = Brand