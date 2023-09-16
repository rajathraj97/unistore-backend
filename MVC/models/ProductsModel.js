const mongoose = require('mongoose')

const{Schema} = mongoose

const productsModel = new Schema({
    name:{
        type:String,
        required:true
    },
    info:{
        type:[
            {productinfo:String,productvalue:String}
        ],
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    subCategory:{
        type:Schema.Types.ObjectId,
        ref:"SubCategory",
        required:true
    },
    brand:{
        type:Schema.Types.ObjectId,
        ref:'Brand',
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    warrenty:{
        type:String,
        default:'1 year'
    },
    stock:{
        type:Number,
        required:true
    },
    gst:{
        type:Number,
        required:true,
    
    },
    description:{
        type:String,
        required:true
    },
    minTracking:{
        type:Number,
        required:true
    },
    image:[
        {type:String}
    ]

},{timestamps:true})

const Product = mongoose.model('Product',productsModel)
module.exports = Product