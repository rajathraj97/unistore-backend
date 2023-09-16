const Product = require('../models/ProductsModel')
const pick = require('../../node_modules/lodash/pick')
var AWS = require('aws-sdk');
const s3Uploadv2 = require('../../AWS/s3Service')
const productCtlr = {}

productCtlr.create = async(req,res)=>{
    try{
        
        const body = pick(req.body,['name','info','details','category','brand','price','warrenty','stock','file','subCategory','gst','description','minTracking'])
        console.log(body,'info')
        console.log(body.info,'body info')
        const product = new Product(body)
        const file = req.file
        console.log(req.body.file,'file')
        const result = await s3Uploadv2(file)
        product.image = result.Location
        product.info = JSON.parse(body.info)
        const userDoc = await product.save()
        res.json(userDoc)
    }
    catch(e){
       console.log(e)
    }
}

productCtlr.update = async(req,res)=>{
    try{
        const id = req.params.id
        const body = pick(req.body,['stock'])
       
        const productDoc = await Product.findByIdAndUpdate(id,body,{new:true})
        res.json(productDoc)
    }
    catch(e){
        res.json(e)
    }
}

productCtlr.delete = async(req,res)=>{
    try{
        const id= req.params.id
        const producDoc = await Product.findByIdAndDelete(id,{new:true})
        res.json(producDoc)
    }
    catch(e){
        res.json(e)
    }
}

productCtlr.get = async(req,res)=>{
    try{
        const userDoc = await Product.find({})
        res.json(userDoc)
    }
    catch(e){
        res.json(e)
    }
}

productCtlr.deleteQuantity = async(req,res) =>{
    try{
        console.log('recived')
        const id = req.params.id
        const body = req.body
        const deletedQuantity = await Product.findByIdAndUpdate({_id:id},{$inc:{stock:(-body.quantity)}},{new:true})
        console.log(deletedQuantity)
        res.json(deletedQuantity)
        
        
    }
    catch(e){

    }
}

productCtlr.getOne = async(req,res) =>{
    try{
        const id = req.params.id
        const userDoc = await Product.find({_id:id})
        console.log(userDoc,'user')
        res.json(userDoc)
    }
    catch(e){
        res.json(e)
    }
}

module.exports = productCtlr