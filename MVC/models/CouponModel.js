const mongoose = require('mongoose')
const {Schema} = mongoose

const couponModel = new Schema({
    name:{
        type:String,
        requird:true
    },
    price:{
        type:Number,
        required:true
    },
    validity:{
        type:Date,
        required:true
    }
})

const Coupon = mongoose.model('Coupons',couponModel)
module.exports = Coupon