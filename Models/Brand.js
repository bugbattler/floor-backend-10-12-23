
const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
    brand_name:{type:String,required:true,trim:true,unique:true},
    slug:{type:String,required:true,trim:true,unique:true},
    brandLogo:{type:String},
},{timestamps:true})

module.exports = mongoose.model("brand", brandSchema);