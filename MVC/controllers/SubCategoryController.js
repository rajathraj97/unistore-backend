const SubCategory = require('../models/SubCategoryModel')

const pick = require('../../node_modules/lodash/pick')
const subCategoryCtlr = {}

subCategoryCtlr.create = async(req,res) =>{
    try{
        const body = pick(req.body,['subCategory','category'])
        const subCategory = new SubCategory(body)
        await subCategory.save()
        res.json(subCategory)
    }
    catch(e){
        res.json(e)
    }
}

subCategoryCtlr.delete = async(req,res) =>{
    try{
        const id = req.params.id
        const deleteSubCategory = await SubCategory.findByIdAndDelete(id)
        res.json(deleteSubCategory)
    }
    catch(e){
        res.json(e)
    }
}

subCategoryCtlr.get = async(req,res) =>{
    try{
        const subCategory = await SubCategory.find()
        res.json(subCategory)
    }
    catch(e){
        res.json(e)
    }
}

module.exports = subCategoryCtlr
