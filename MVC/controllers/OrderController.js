const Order = require('../models/OrderModel')
const pick = require('../../../node_modules/lodash/pick')
const orderCtlr = { }

orderCtlr.create = async(req,res) =>{
    try{
        console.log(req.body,"body in ctlr")
        const body = pick(req.body,['userid','products','pincode','address','paymentcompleted','shipped',' trackingid','reviewed'])
        if(body.products.length >= 1){
            console.log(body,'order ctlr')
        const order = new Order(body)
        order.save()
        console.log(order,'order response')
        res.json(order)
        }else{
            res.status(200)
        }
    }
    catch(e){
        res.json(e)
        console.log(e,'erroe')
    }
}

orderCtlr.update = async(req,res) =>{
    try{
        const id = req.params.id
        const body = pick(req.body,['shipped','trackingid','reviewed'])
        const update = await Order.findByIdAndUpdate(id,body,{new:true})
        res.json(update)
        
    }
    catch(e){
        res.json(e)
    }
}


orderCtlr.delete = async(req,res) =>{
    try{
        const id = req.params.id
        const deleteProduct = await Order.findByIdAndDelete(id)
        res.json(deleteProduct)
    }
    catch(e){
        res.json(e)
    }
}

orderCtlr.get = async(req,res) =>{
    try{
        const data = await Order.find()
        res.json(data)
    }
    catch(e){
        res.json(e)
    }
}

orderCtlr.getOne = async(req,res)=>{
    try{
        const id = req.params.id
        console.log(id,'userid in get one')
        const data = await Order.find({userid:id})
        res.json(data)
    }
    catch(e){
        res.json(e)
    }
}

module.exports = orderCtlr



