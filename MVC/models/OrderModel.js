const mongoose = require('mongoose')

const{Schema} = mongoose

const orderSchema = new Schema({
    products:{
        type:[{productid:Schema.Types.ObjectId,quantity:Number}],
        required:true
    },
    userid:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    address:{
        type:String,
        required:true
    },
    paymentcompleted:{
        type:Boolean,
        required:true,
        default:true
    },
    pincode:{
        type:Number,
        required:true
    },
    shipped:{
        type:Boolean,
        default:false
    },
    trackingid:{
        type:String,
        default:"To be Updated"
    },
    reviewed:{
        type:Boolean,
        default:false
    }

},{timestamps:true}) 

orderSchema.post("save",(doc)=>{})

const Order = mongoose.model('Order',orderSchema)

module.exports = Order