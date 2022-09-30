import express from "express";
import { isEmailValid,checkIfOtp,verifytheOtp } from "../modules/validate.js";
import {sendEmilToVerify} from "../modules/email.js"
import { auth } from "../middle-wares/verifyToken.js";
import jwt from "jsonwebtoken"
import {generateNewOtp} from "../modules/generateOtp.js"
import { insertUser,isUserExists } from "../Controller/login.js";
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv"

dotenv.config()

export const signupRouter  = express.Router()

signupRouter.post ("/",async (req,res)=>{

    const {email} = req.body;
    if(!email){
        res.send({status:"Invalid"})
        return;
    }
    if(isEmailValid(email)){
        res.send({status:"Invalid"})
        return;
    }
    //Generate Otp
    const newGeneratedOtp = generateNewOtp();

    //check if otp and update it
    checkIfOtp(email,newGeneratedOtp);
    sendEmilToVerify(email,newGeneratedOtp);
    const userId = await isUserExists(email);
    if(!(await isUserExists(email))){
        res.send({status:"new user"});
        return;
    }

    res.send({status:"success",id:userId})
})


signupRouter.post("/verifyotp",async(req,res)=>{
    
    const {email,otp} = req.body;
    console.log(email,otp)
    const state = await verifytheOtp(email,+otp);
    console.log(state)
    if(state.status === "success"){
        const token = jwt.sign({data:"foo"},process.env.SECRET_KEY,{expiresIn:"300s"})
        res.send({status:"success",id:uuidv4(),token:token})
        return;
    }
    res.send(state)
    //Check if otp is valid and send the status accordingly
})
