const express = require("express");
const app = express();
const bodyparser = require('body-parser')
const cors= require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const AdminRoute = require("./Routes/adminRoute");
mongoose.connect(process.env.DBCONN).then(()=>{
    console.log("Database Connected!");
})
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cors());
app.use("/admin", AdminRoute);




app.listen(8000, ()=>{
    console.log("server run on port 8000!");
})