
const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name:{type:String,required:true,trim:true,unique:true},
    slug:{type:String,required:true,trim:true,unique:true},
    categoryImage:{type:String},
    parentId:{type:String}, 
    parentName:{type:String}, 
    superCatName:{type:String}, 
    Type:{type:String}
},{timestamps:true})

module.exports = mongoose.model("category", categorySchema);