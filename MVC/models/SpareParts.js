const mongoose = require('mongoose')
const{Schema} = mongoose

const spareSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        required:true
    },
    ProductDetails:{
        type:[
            {productinfo:String,productvalue:String}
        ]
    },
    warrenty:{
        type:String,
        default:'1 year'
    },
    compactableModels:{
       type:[
        {brand:String,model:String}
       ]
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:[
    {type:String,required:true}
    ]
},{timestamps:true})

spareSchema.pre('save',function(next){
    if(this.price > 0){
        next()
    }
})

const Spare = mongoose.model('Spare',spareSchema)
module.exports = Spare