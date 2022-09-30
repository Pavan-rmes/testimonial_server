import express, { response } from "express";
import dotenv from "dotenv"
import {isUserExists} from "../Controller/login.js"
import {getallUserTestimonials, insertFirstTestimonial, isTestimonialExists} from "../Controller/testimonials.js"

dotenv.config()

export const TestimonialRoute  = express.Router();

TestimonialRoute.post("/new",async(req,res)=>{
    const {name,company,url,userId} = req.body;
    if(!name && !company && !url){
        res.send({status:"data incomplete"})
        return;
    }
    if(!userId){
        res.send({status:"logout"})
        return;
    }

    // const userId = await isUserExists(email);
    let response = {status:"already exists"}
    //Check testimonial exists
    if (! await isTestimonialExists(userId,"nike1 Testimonial Wall1")){
        await insertFirstTestimonial(name,company,url,userId);
        response = {status:"successful"}
    }
    
    res.send(response);

})

TestimonialRoute.get("/all",async (req,res)=>{
    
    const {userId} = req.query;

    
    // const userId = await isUserExists(email);

    console.log(userId)
    let testimonials = await getallUserTestimonials(userId);

    res.send(testimonials)
})