const express = require('express');
const conn = require("./db");
const env = require('dotenv');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

// routes

const userRoutes = require('./Routes/auth')
const adminRoutes = require('./Routes/Admin/auth')
// const catagoryRoutes = require('./Routes/Catagories')
const ProductRoutes = require('./Routes/productRout')
const catRoutes = require('./Routes/category')
const brand = require('./Routes/Brandrout')
const cart = require('./Routes/Cart')
// const CartRoutes = require('./Routes/Cart')
// const wishRoutes = require('./Routes/wishlist')
// const TimeSlotRoutes = require('./Routes/TimeSlot')

// create connection with DB
conn.connectDB()


app.use(cors());
env.config();
app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use('/public', express.static(path.join(__dirname,'uploads')));

app.use('/api', userRoutes)
app.use('/api', adminRoutes)
// app.use('/api', catagoryRoutes)
app.use('/api', ProductRoutes)
app.use('/api', catRoutes)
app.use('/api', brand)
app.use('/api',cart )
// app.use('/api', CartRoutes)
// app.use('/api', wishRoutes)
// app.use('/api', TimeSlotRoutes)
// app.use('/order',require("./Routes/Order"));
app.use('/api',require("./Routes/Address"));
// app.use('/location',require("./Routes/Location"));
// app.use('/review',require("./Routes/Review"));
// app.use('/api',require("./Routes/Poster"));
// app.use('/api',require("./Routes/OrderSetting"));


app.listen(process.env.PORT , ()=>{
    console.log(`server running successfully on port http://localhost:${process.env.PORT}`);
})