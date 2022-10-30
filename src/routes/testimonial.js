import express, { response } from "express";
import dotenv from "dotenv"
import {isUserExists} from "../Controller/login.js"
import {getallUserTestimonialwalls, insertFirstTestimonial, isTestimonialExists} from "../Controller/testimonialWalls.js"
import { getTestimonailData, insertTestimonial, insertTwitterData, isTweetAlreadyExists } from "../Controller/testimonials.js";
import { getDataFromTwitter } from "../Integrations/Twitter.js";

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

TestimonialRoute.post("/new-testimonial",async(req,res)=>{
    const {title,body,rating,name,userId,testimonialWallName} = req.body;
    if(!title && !body && !rating && !name && !testimonialWallName){
        res.send({status:"data incomplete"})
        return;
    }

    // get What is the testimonialName

    await insertTestimonial(title,body,rating,name,userId,testimonialWallName);
    response = {status:"successful"}    
    res.send(response);

})



TestimonialRoute.get("/getNewTweet",async (req,res)=>{
    const {url,id,userId} = req.query;
    console.log(url)
    if(!url){
        res.send({status:"Url needed"})
        return;
    }
    const tweetData = await getDataFromTwitter(url);
    if(await isTweetAlreadyExists(tweetData.tweetId,userId,id)){
        res.send({status:"Tweet already Exists"})
        return;
    }

    if(!tweetData){
        res.send({status:"Tweet not found"})
        return;
    }
    tweetData.status = 0;
    const response = await insertTwitterData(tweetData,userId,id);
    res.send(response)
})

TestimonialRoute.get("/all-testimonials",async (req,res)=>{
    const {id,userId} = req.query;
    if(!id || !userId){
        res.send({status:"id or Url is missing"})
        return;
    }
    const response = await getTestimonailData(userId,id);
    res.send(response)
})

TestimonialRoute.get("/all",async (req,res)=>{
    
    const {userId} = req.query;

    if(!userId){
        res.send({status:"need user Id"});
        return;
    }
    // const userId = await isUserExists(email);

    console.log(userId)
    let testimonials = await getallUserTestimonialwalls(userId);

    res.send(testimonials)
})