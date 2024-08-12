const mongoose = require("mongoose")


const schema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        require:true,
        uniqued:true
    },
    Password:{
        type:String,
        required:true
    },
    ConfirmPassword:{
        type:String,
        required:true
    }
})

const registerModel = mongoose.model("list", schema, "list")


module.exports = registerModel