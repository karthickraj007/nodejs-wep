const jwt = require("jsonwebtoken")

const token = (req, res, next)=>{
    try{
        const {authorization} = req.headers
        if(authorization){
            const token = authorization.split(" ")[1]
            if(token){
                jwt.verify(token, "fhewfjqfbfj3i23", (err, payload)=>{
                    if(err){
                        res.status(401).json({message: "Invalid token"})
                    }
                    else{
                        console.log(payload)
                        req.user = payload
                        next()
                    }
                })
            }
            else{
                res.status(401).json({message: "token is missing"})
            }
           
        }
        else{
            res.status(404).send({message:"Token required"})
        }
       
    }
    catch(err){
        res.status(500).send(err.message)
    }
}


module.exports = token