const Cart = require('../models/CartModel')
const pick = require('../../../node_modules/lodash/pick')
const Spare = require('../models/SpareParts')
const cartCtlr = {}

cartCtlr.add = async(req,res)=>{
    try{
        const body = pick(req.body,['productid','userid','quantity','address','pincode'])
        const cart = new Cart(body)
        const cartDoc =await cart.save()
        res.json(cartDoc)
    }
    catch(e){
        res.json(e)
    }
}

cartCtlr.update = async(req,res)=>{
    try{
        const id = req.params.id
        const body = pick(req.body,['quantity','address','pincode'])
        const spareDoc = await Cart.updateMany({userid:id},body,{new:true})
        res.json(spareDoc)
    }
    catch(e){
        res.json(e)
    }
}

cartCtlr.delete = async(req,res)=>{
    try{
        const id=req.params.id
        console.log(id,'in node')
        const spareDoc = await Cart.findByIdAndDelete({_id:id})
        console.log(spareDoc)
        req.json(spareDoc)
    }
    catch(e){
        res.json(e)
    }
}

cartCtlr.find = async(req,res) =>{
    try{
        const id = req.params.id
        const data = await Cart.find({userid:id})
        console.log(data,'in controller')
        res.json(data)
    }
    catch(e){

    }
}

cartCtlr.get= async(req,res)=>{
    try{
        const spareDoc = await Cart.find({})
        res.json(spareDoc)
    }
    catch(e){
        res.json(e)
    }
}

cartCtlr.deleteAfterPayment = async(req,res) =>{
    try{
        const id = req.params.id
        console.log(id,'id')
        const cart = await Cart.deleteMany({userid:id})
        res.json(cart)
    }
    catch(e){
        res.json(e)
    }
}


module.exports = cartCtlr