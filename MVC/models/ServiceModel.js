const mongoose = require('mongoose')
const{Schema} = mongoose

const serviceModel = new Schema({
    userid:{
        type:Schema.Types.ObjectId,
        required:true
    },
    trackingnumber:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    price:{
        type:Schema.Types.Mixed,
        default:"to-be-updated"
    },
    shippingid:{
        type:String
    },
    itemanalysis:{
        type:String,
        
    },
    serviceAccepted:{
        type:Boolean,
        default:false
    },
    diagnose:{
        type:Boolean,
        default:false
    },
    repaired:{
        type:Boolean,
        default:false
    },
    productRecived:{
        type:Boolean,
        default:false
    },
    paymentStatus:{
        type:String,
        default:'pending',
        enum:['pending','paid']
    },
    model:{
        type:String,
        required:true
    },
    serviceDeclined:{
        type:Boolean,
        default:false
    },
    courier:{
        type:String,
        required:true
    }
},{timestamps:true})

const Service = mongoose.model('Service',serviceModel)
module.exports = Service