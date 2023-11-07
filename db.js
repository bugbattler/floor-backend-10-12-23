// const mongoose = require('mongoose');
// require('dotenv').config();
// // const db ='mongodb+srv://jolEvents:Jolevents@0701@cluster0.hht1lvo.mongodb.net/jol-events?retryWrites=true&w=majority'
// mongoose.connect("mongodb+srv://ketanbugbattlers:Ketan@cluster0.bdvvyvj.mongodb.net/furniture?retryWrites=true&w=majority");
// // mongoose.connect(`mongodb://localhost:27017/jol_events`);


// module.exports = mongoose;
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config({path:'./config/.env'});
 const {APP_PORT,MONGODB_URI} = process.env;
mongoose.set('strictQuery',true);
const connectDB = ()=>{
    mongoose.connect("mongodb+srv://ketanbugbattlers:" +
    encodeURIComponent("Ketan") +
    "@cluster0.bdvvyvj.mongodb.net/furniture", {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
}
module.exports={connectDB}