
const mongoose = require("mongoose");

const FavSchema = mongoose.Schema({
    userId:{type:String,required:true,trim:true},
    isFev:{type:Boolean},
    product:{type:Array},
},{timestamps:true})

module.exports = mongoose.model("favorites", FavSchema);