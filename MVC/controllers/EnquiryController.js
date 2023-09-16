const Enquiry = require('../models/EnquiryModel')
const pick = require('../../../node_modules/lodash/pick')
const enquiryCtlr = {}

enquiryCtlr.create = async(req,res)=>{
    try{
        const body= pick(req.body,['name','email','description','number'])
        const enquiry = new Enquiry(body)
        const enquiryDoc = await enquiry.save()
        res.json(enquiryDoc)
    }
    catch(e){
        res.json(e)
    }
}

enquiryCtlr.delete = async(req,res)=>{
    try{
        const id = req.params.id
        const deletedoc = await Enquiry.findByIdAndDelete(id)
        res.json(deletedoc)
    }
    catch(e){
        res.json(e)
    }
}

enquiryCtlr.get = async(req,res) =>{
    try{
        const data = await Enquiry.find()
        res.json(data)
    }
    catch(e){
        res.json(e)
    }
}

module.exports = enquiryCtlr