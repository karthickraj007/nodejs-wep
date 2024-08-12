require("dotenv").config()
const mongoose = require("mongoose")

const express = require("express")

const app = express()


const port = process.env.PORT || 7000

mongoose.connect(process.env.db_url).then(()=>{
    app.listen(port, ()=>{
        console.log(`server is running on port ${port} `)
    })
}).catch((err)=>{
    console.log(err)
})

module.exports.db = mongoose

module.exports.app = app