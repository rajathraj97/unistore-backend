const Service = require("../models/ServiceModel");
const pick = require("../../../node_modules/lodash/pick");
const serviceCtlr = {};

serviceCtlr.create = async (req, res) => {
  try {
    const body = pick(req.body, [
      "userid",
      "trackingnumber",
      "description",
      "serviceAccepted",
      "diagnose",
      "repaired",
      "productRecived",
      "model",
      "price",
      "serviceDeclined",
      "shippingid",
      "courier"
    ]);
    console.log(body, "in create service");
    const service = new Service(body);
    const serviceDoc = await service.save();
    res.json(serviceDoc);
  } catch (e) {
    res.json(e);
  }
};

serviceCtlr.update = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const body = pick(req.body, [
      "price",
      "shippingid",
      "itemanalysis",
      "serviceAccepted",
      "serviceDeclined",
      "diagnose",
      "repaired",
      "productRecived",
      "shippingid",
      "paymentStatus"
    ]);
    console.log(req.body);
    const serviceDoc = await Service.findByIdAndUpdate(id, body, { new: true });
    res.json(serviceDoc);
  } catch (e) {
    res.json(e);
  }
};

serviceCtlr.get = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "in service");

    if (id.length > 1) {
      const doc = await Service.find({ userid: id });
      console.log(doc, "ctlr data");
      res.json(doc);
    }
  } catch (e) {
    res.json(e);
  }
};

serviceCtlr.display = async (req, res) => {
  try {
    const service = await Service.find();
    res.json(service);
  } catch (e) {
    res.json(e);
  }
};

serviceCtlr.updatePayment = async(req,res) =>{
  try{
    const body = pick(req.body,['paymentStatus'])
    const id = req.params.id
    const data = await Service.findByIdAndUpdate({_id:id},{paymentStatus:body.paymentStatus},{new:true})
    res.json(data)
  }
  catch(e){
    res.json(e)
  }
}

module.exports = serviceCtlr;
