const mongoose = require('mongoose')

const{Schema} = mongoose

const subCategorySchema = new Schema({
    
    subCategory:{
        type:String,
        required:true
    }
})

const SubCategory = mongoose.model('SubCategory',subCategorySchema)
module.exports = SubCategory