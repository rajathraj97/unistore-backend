const Spare = require('../models/SpareParts')
const pick = require('../../node_modules/lodash/pick')
const s3Uploadv2 = require('../../AWS/s3Service')
const spareCtlr = {}

spareCtlr.create = async(req,res)=>{
    try{
        const body = pick(req.body,['name','category','productDetails','warrenty','compactableModels','price','stock','file','description'])
        console.log(body)
        const spare = new Spare(body)
        const file = req.file
        const result = await s3Uploadv2(file)
        spare.image = result.Location
        spare.ProductDetails = JSON.parse(body.productDetails)
        spare.compactableModels = JSON.parse(body.compactableModels)
        const userDoc = await spare.save()
        console.log(userDoc,'doc')
        res.json(userDoc)
    }
    catch(e){
        res.json(e)
    }
}

spareCtlr.update = async(req,res)=>{
    try{
        const id=req.params.id
        const body = pick(req.body,['stock'])
        const product = await Spare.findByIdAndUpdate(id,body,{new:true})
        res.json(product)
    }
    catch(e){
        res.json(e)
    }
}

spareCtlr.delete = async(req,res)=>{
    try{
        const id = req.params.id
        const spareDoc = await Spare.findByIdAndDelete({_id:id})
        res.json(spareDoc)
    }
    catch(e){
        res.json(e)
    }
}

spareCtlr.get = async(req,res)=>{
    try{
        const spares = await Spare.find({})
        res.json(spares)
    }
    catch(e){
        res.json(e)
    }
}

spareCtlr.getOne = async(req,res) =>{
    try{
        const id = req.params.id
        const data = await Spare.find({_id:id})
        res.json(data)
    }
    catch(e){
        res.json(e)
    }
}

module.exports = spareCtlr