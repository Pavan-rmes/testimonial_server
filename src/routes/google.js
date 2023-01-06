import express from "express";
import dotenv from "dotenv";
import { getGoogleBusinessAccounts, getGoogleBusinessReviews } from "../Integrations/Google.js";
import { insertTestimonialData } from "../Controller/testimonials.js";


dotenv.config();

export const GoogleReviews = express.Router();

GoogleReviews.get("/accounts",async (req,res)=>{
    const {account} = req.query;
    const businessAccounts =  await getGoogleBusinessAccounts(account);
    res.send(businessAccounts)
})

GoogleReviews.get("/reviews",async (req,res)=>{
    const {place_id,wall_id} = req.query;
    console.log(place_id)
    const reviews =  await getGoogleBusinessReviews(place_id);
    if(!reviews){
        res.send({status:"Google Api error"})
    }
    console.log(reviews)
    reviews?.forEach(async (review) => {
        await insertTestimonialData(review,wall_id)
    });
    res.send(reviews)
})