import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv"
import cors from "cors"
import {signupRouter} from "./routes/signup.js"
import { TestimonialRoute } from "./routes/testimonial.js";
import {db} from "./Controller/dbInitialize.js"
import { GoogleReviews } from "./routes/google.js";
import { TestimonialWallRoute } from "./routes/testimonialWall.js";

dotenv.config()


const app = express()
app.use(cors({ origin: true, credentials: true }))

app.use(express.json())
app.use("/signup",signupRouter)
app.use("/testimonial",TestimonialRoute)
app.use("/google-reviews",GoogleReviews)
app.use("/testimonialWalls",TestimonialWallRoute)

app.get("/",async (req,res)=>{res.send("Hello from social proof app")})

const PORT = process.env.PORT || 9000
// const MONGO_DB = process.env.MONGO_DB

// async function DbConnection(){
//     const client = new MongoClient(MONGO_DB)
//     await client.connect()
//     console.log("Data base connected")
//     return client;
// }

// export const client = await DbConnection();

app.listen(PORT,()=>console.log(`App is listening on ${PORT}`))