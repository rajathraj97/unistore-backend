const User = require('../models/UserModel')
const pick = require('../../node_modules/lodash/pick')
const bcrypt = require('../../node_modules/bcryptjs')
const jwt = require('../../node_modules/jsonwebtoken')
require('dotenv').config()
const accountSid = process.env.ACCOUNT_ID;
const authToken = process.env.AUTH_TOKEN;
const otpGenerator = require('otp-generator')
const client = require('twilio')(accountSid, authToken);

const userCtlr = {}

userCtlr.register = async(req,res)=>{
    try{
        const body = pick(req.body,['username','email','password','address','role','number','pincode'])
        console.log(body)
        const user = new User(body)
        const salt =await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(user.password,salt)
        console.log(hashPassword)
        user.password = hashPassword
        const userDoc = await user.save()
        res.json(userDoc)
        
    }catch(e){
res.status(404).json(e)
    }
}

userCtlr.login = async(req,res) =>{
   try{
    const body = pick(req.body,["email","password"])
    const user =await User.findOne({email:body.email})
    if(user){
      const password = await bcrypt.compare(body.password,user.password)
      if(password){
       const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false })
       const addOtp = await User.findByIdAndUpdate(user._id,{otp:otp},{new:true})
       res.json(pick(user,['_id','email']))
       client.messages.create({
           body: `OTP for Logging In is ${otp}`,
           from:process.env.TWILIO_NUMBER,
           to: `${"+"}${user.number}`
       })
       .then(message => console.log(message.sid))
       .done()
      
      }else{
        res.json({error:"Invalid Password"})
      }
      
    }else{
        res.json({error:"Invalid User"})
    }

   }
   catch(e){

   }
}

userCtlr.verify = async(req,res) =>{
    try{
        const body = pick(req.body,["email","password","otp"])
        const user = await User.findOne({email:body.email})
        if(user){
            const password = bcrypt.compare(body.password,user.password)
            if(password && body.otp == user.otp){
                const tokenData = {
                    username:user.username,
                    _id:user._id,
                    role:user.role,
                    address:user.address,
                    pincode:user.pincode,
                    email:user.email,
                    number:user.number
                    
                }
                const token = jwt.sign(tokenData,process.env.secretcode)
                res.status(200).json(`Bearer ${token}`)
            }else{
                res.status(203).json({error:"otp/password error"})
            }
        }else{
            res.status(203).json({error:"invalid user"})
        }
    }
    catch(e){
        res.status(201).json({error:"invalid otp"})
    }
}

userCtlr.account = async(req,res) =>{
    try{
    const user = await User.findOne({_id:req.user._id})
    res.json(pick(user,['email','username']))
    }catch(e){
        console.log(e)
    }
}

userCtlr.displayUsers = async(req,res) =>{
    try{
        const user = await User.find()
        res.json(user)
    }
    catch(e){
        res.json(e)
    }
}

userCtlr.changeRole = async(req,res) =>{
    try{
        const id = req.params.id
        const body = pick(req.body,['role'])
        const data = await User.findByIdAndUpdate({_id:id},{role:body.role})
        res.json(data)
    }
    catch(e){
        res.json(e)
    }
}

userCtlr.findEmail = async(req,res)=>{
    try{
        const body = pick(req.body,['email'])
        console.log(body)
        const data = await User.findOne({email:body.email})
        console.log(data,'data')
        if(!data){
            res.json({email:"email not found"})
        }else{
        res.json(data)
        }
        
    }
    catch(e){
        res.json(e)
    }
}



module.exports = userCtlr
