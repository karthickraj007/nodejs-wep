const express = require("express")
const cors = require("cors")
const {app} = require("../DataBase/index.js")
const router = require("../Routes/index.js")
app.use(express.json())
app.use(cors())


app.use("/product", router)



