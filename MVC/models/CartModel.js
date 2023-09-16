const mongoose = require('mongoose')
const Category = require('./CategoryModel')

const {Schema} = mongoose

const cartSchema = new Schema({
    productid:{
        type:Schema.Types.ObjectId,
        enum:['spares','products'],
        required:true
    },
    userid:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    quantity:{
        type:Number,
        default:1
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
       required:true 
    }
})

const Cart = mongoose.model('Cart',cartSchema)

module.exports = Cart

