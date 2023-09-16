const Coupon = require('../models/CouponModel')
const pick = require('../../../node_modules/lodash/pick')
const couponCtlr = {}

couponCtlr.create = async(req,res)=>{
    try{
        const body = pick(req.body,['name','price','validity'])
        const coupon = new Coupon(body)
        const couponDoc = await coupon.save()
        res.json(couponDoc)
    }
    catch(e){
        res.json(e)
    }
}

couponCtlr.delete = async(req,res)=>{
    try{
        const id = req.params.id
        const couponDoc = await Coupon.findByIdAndDelete(id)
        res.json(couponDoc)
    }
    catch(e){
        res.json(e)
    }
}
module.exports=couponCtlr