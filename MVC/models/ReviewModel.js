const mongoose = require('mongoose')
const{Schema} = mongoose

const reviewSchema = new Schema({
productid:{
type:Schema.Types.ObjectId,
enum:['Product','Spare']
},
userid:{
    type:Schema.Types.ObjectId,
    ref:'User'
},
rating:{
    type:Number,
    required:true
}
},{timestamps:true})

const Review = mongoose.model('Review',reviewSchema)
module.exports = Review