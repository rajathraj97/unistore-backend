const Category = require("../models/CategoryModel");
const pick = require("../../node_modules/lodash/pick");
const categoryctlr = {};

categoryctlr.create = async (req, res) => {
  try {
    const body = pick(req.body, ["category"]);
    const category = await new Category(body);
    const categoryDoc = await category.save();
    res.json(categoryDoc);
  } catch (e) {
    res.json(e);
  }
};

categoryctlr.delete = async (req, res) => {
  try {
   const id = req.params.id
    const category = await Category.findByIdAndDelete(id);
    res.json(category);
  } catch (e) {
    res.json(e);
  }
};

categoryctlr.get = async (req,res) =>{
  try{
    const category = await Category.find({})
    res.json(category)
  }
  catch(e){
    res.json(e)
  }
}

module.exports = categoryctlr;
