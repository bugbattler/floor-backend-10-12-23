const mongoose = require("mongoose");

const CostEstSchema = new mongoose.Schema(
  {
  
    name:{type:String,required:true,trim:true,unique:true},
    slug:{type:String,required:true,trim:true,unique:true},
    parentId:{type:String}, 
    parentName:{type:String},
    price:{type:Number},
    type:{type:String}
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("CostEstimation", CostEstSchema);
