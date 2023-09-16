const Notification = require('../models/Notification')
const pick = require('../../node_modules/lodash/pick')

const notificationController = {}

notificationController.createNotification = async(req,res) =>{
    try{
        const body = pick(req.body,['notification','userid','isViewed'])
        const notification = new Notification(body)
        const data = await notification.save()
        res.json(data)

    }
    catch(e){
        res.json(e)
    }
}

notificationController.update = async(req,res) =>{
    try{
    const id = req.params.id
    console.log(id,'notification ctlr')
    const data = await Notification.findByIdAndUpdate({_id:id},{isViewed:true})
    res.json(data)
        
    }
    catch(e){
        res.json(e)
    }
}

notificationController.getNotification = async(req,res) =>{
    try{
        const data = await Notification.aggregate([{$match:{isViewed:false}}])
        res.json(data)
    }
    catch(e){
        res.json(e)
    }
}

module.exports = notificationController