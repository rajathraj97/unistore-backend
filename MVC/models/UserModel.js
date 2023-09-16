const mongoose = require('../../node_modules/mongoose')

const {Schema} = mongoose

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:['admin','user','staff'],
        default:'user'
    },
    otp:{
        type:Number
    },
    isLocked:{
        type:String,
        default:"no"
    },
    attempts:{
        type:Number,
        default:4
    }
},{timestamps:true})

const User = mongoose.model('UserModel',userSchema)

module.exports = User
