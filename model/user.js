const mongoose = require("mongoose")


const schema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true,
   },
   createdat:{
    type:Date,
    required:true
   }
})

const userModel = mongoose.model("userdata", schema, "userdata")


module.exports = userModel