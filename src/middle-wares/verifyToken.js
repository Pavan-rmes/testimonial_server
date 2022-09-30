import Jwt from "jsonwebtoken";

const auth = (req,res,next)=>{
    try{
        const token = req.header("x-auth-token")
        Jwt.verify(token,process.env.SECRET_KEY)
        next();
    }
    catch(err){
        res.send({message:"token invalid"})
    }
}

export {auth}