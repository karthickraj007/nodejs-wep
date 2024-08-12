const express = require("express");
const router = express.Router();
const registerModel = require("../model/register.js")
const userModel = require("../model/user.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const token = require("../middelware/index.js")


router.post("/signin", async (req, res)=>{
    try{
        const{FirstName, LastName, Email, Password, ConfirmPassword} = req.body
        if(Password === ConfirmPassword){
            const hashedPassword = await bcrypt.hash(Password, 10)
            const data = await registerModel.create({
                FirstName:FirstName,
                LastName:LastName,
                Email:Email,
                Password:hashedPassword,
                ConfirmPassword:hashedPassword
            })
            
            res.status(200).send({message:"signin sucessfully"})
        }
        else{
            res.status(404).send({message:"password mismatch"})
        
        }
    
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
   
})

router.post("/login", async (req, res)=>{
    try{
        const {Email, Password} = req.body
        const user = await registerModel.findOne({Email:Email})
        if(user){
            const data = await bcrypt.compare(Password, user.Password)
            if(data){
                const payload = user.Email
                const token = jwt.sign(payload, "fhewfjqfbfj3i23")
                res.status(200).send({message:"login sucessfully", Token:token})
            }
            else{
                res.status(404).send({message:"password incorrect"})
            }
        }
        else{
            res.status(404).send({message:"user not found"})
        }
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
   
})

router.get("/allusers",  async (req, res)=>{
    try{
        console.log("request recieved")
        const data = await userModel.find()
        res.status(200).send(data)
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})

router.post("/addItem",  async (req,res)=>{
    try{
        const {name, description, createdat} = req.body
        const user = await userModel.create({
            name:name,
            description: description,
            createdat:createdat
        })
        res.status(200).send({message:"Item added sucessfully"})
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})

router.put("/updateItem/:id",  async (req, res)=>{
    try{
        const {id} = req.params
        const user = await userModel.findOne({_id : id})
        if(user){
            const {name, description} = req.body
            await userModel.updateOne({_id:id},{$set:{name:name, description:description}})
            res.status(200).send({message:"Item added sucessfully"})
        }
        else{
            res.status(404).send({message:"id is not found"})
        }
    }
    catch(err){
        res.status(500).send({message:err.message})
    }

})

router.delete("/deleteItem/:id",  async (req, res)=>{
    try{
        const {id} = req.params
        const user = await userModel.findOne({_id : id})
        if(user){
            await userModel.deleteOne({_id:id})
            res.status(200).send({message:"Item deleted sucessfully"})
        }
        else{
            res.status(404).send({message:"id is not found"})
        }
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})


router.get("/search",  async (req, res)=>{
    try{
        const {name} = req.query
        console.log(name)
        if (!name) {
            return res.status(400).send({ message: "Missing search parameter" });
          }
          else{
            const item =  await userModel.find({name:name})
        res.status(200).send(item) 
          }
          
    
    }
    catch(err){
        res.status(500).send({message:err})
    }
   
})

router.get("/sort",  async (req, res)=>{
    try{
        console.log(req.query)
        const {name} = req.query
        if( name === 'recent'){
            const item =  await userModel.find().sort({createdat : -1})
            console.log(item)
            res.status(200).send(item) 
        }
        else{
            return res.status(400).send({ message: "Invalid sort parameter" });
        }
         
    
    }
    catch(err){
        res.status(500).send({message:err})
    }
})


module.exports = router