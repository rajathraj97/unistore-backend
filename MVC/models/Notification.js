const mongoose = require('mongoose')

const {Schema} = mongoose

const notificationSchema = new Schema({
    notification:{
        type:String,
        enum:['Order-Created','Service-Created'],
        required:true
    },
    userid:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    isViewed:{
        type:Boolean,
        default:false
    }
})

const Notification = mongoose.model('notification',notificationSchema)
module.exports = Notification 