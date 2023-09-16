const Review = require('../models/ReviewModel')
const pick = require('../../../node_modules/lodash/pick')
const reviewCtlr = {}

reviewCtlr.create = async(req,res) =>{
    try{
        const body = pick(req.body,['productid','userid','rating','review'])
        const review = new Review(body)
        const userDoc = await review.save()
        res.json(userDoc)

    }
    catch(e){
        res.json(e)
    }
}

reviewCtlr.delete = async(req,res)=>{
    try{
        const id = req.params.id
        const review = await Review.findByIdAndDelete(id)
        res.json(review)
    }
    catch(e){
        res.json(e)
    }
}

reviewCtlr.get = async(req,res) =>{
    try{
        const id = req.params.id
        const userDoc = await Review.find({productid:id})
        res.json(userDoc)
    }
    catch(e){
        res.json(e)
    }
}

module.exports = reviewCtlr