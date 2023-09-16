const Brand = require('../models/BrandModel')
const brandCtlr = {}
const pick = require('../../../node_modules/lodash/pick')

brandCtlr.create = async (req,res)=>{
    try{
        const body = pick(req.body,['brand'])
        const doc = await new Brand(body)
        const userDoc = await doc.save()
        res.json(userDoc)
    }
    catch(e){
        res.json(e)
    }
}

brandCtlr.delete = async(req,res) =>{
    try{
        const id = req.params.id
        const brand = await Brand.findByIdAndDelete(id)
        res.json(brand)

    }catch(e){
        res.json(e)
    }
}

brandCtlr.get = async(req,res) =>{
    try{
        const brand = await Brand.find({})
        res.json(brand)
    }
    catch(e){
        res.status(400).json(e)
    }
}

module.exports = brandCtlr