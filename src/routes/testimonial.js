import express, { response } from "express";
import dotenv from "dotenv"
import {isUserExists} from "../Controller/login.js"
import {getallUserTestimonialwalls, insertFirstTestimonial, insertTestimonialWall, isTestimonialExists} from "../Controller/testimonialWalls.js"
import { getTestimonailData, insertTestimonialData, isTweetAlreadyExists,updateTestimonialStatus } from "../Controller/testimonials.js";
import { getDataFromTwitter } from "../Integrations/Twitter.js";

dotenv.config()

export const TestimonialRoute  = express.Router();


//Testimonial Wall for new Signup User
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

//New Testimonialwall from the Ui
TestimonialRoute.post("/new-testimonial",async(req,res)=>{
    const {title,body,rating,name,userId,testimonialWallName} = req.body;
    if(!title && !body && !rating && !name && !testimonialWallName){
        res.send({status:"data incomplete"})
        return;
    }

    // get What is the testimonialWallName

    await insertTestimonialWall(title,body,rating,name,userId,testimonialWallName);
    response = {status:"successful"}    
    res.send(response);

})

//Get All Tesimonial Walls of the User
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





//get  the New testimonial data from twitter
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
    const response = await insertTestimonialData(tweetData,id);
    res.send(response)
})


//get all the updated tweets
TestimonialRoute.get("/all-testimonials",async (req,res)=>{
    const {id} = req.query;
    if(!id){
        res.send({status:"id or Url is missing"})
        return;
    }
    const response = await getTestimonailData(id);
    res.send(response)
})


//Update the Testimonial Active Status
TestimonialRoute.post("/testimonial-status",async (req,res)=>{
    const {wall_id,doc_id,isAccepted} = req.body;
    console.log(wall_id,doc_id,isAccepted)
    if(!wall_id || !doc_id ||!isAccepted){
        res.send({status:"id or doc_id is missing"})
        return;
    }
    const response = await updateTestimonialStatus(wall_id,doc_id,isAccepted);
    console.log(response)
    res.send(response)
})