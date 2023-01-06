import express from "express"
import axios from "axios"
import { getTestimoniallWallData, isWallNameAlreadyExits, updateTestimonialWallName } from "../Controller/testimonialWalls.js";

export const TestimonialWallRoute = express.Router()

TestimonialWallRoute.get("/get-data",async (req,res)=>{
    const {user_id,wall_id} = req.query;
    const response = await getTestimoniallWallData(user_id,wall_id)
    res.send(response)
})

TestimonialWallRoute.put("/update-wall-name",async (req,res)=>{
    const {wall_name,user_id,wall_id} = req.body;
    if(await isWallNameAlreadyExits(wall_name,user_id,wall_id)){
        res.send({status:"wall Name Already Exists"})
        return
    }
    const response = await updateTestimonialWallName(wall_name,user_id,wall_id);
    res.send({status:"updated"})
})