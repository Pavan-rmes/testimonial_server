import {db} from "./dbInitialize.js"
import { Timestamp, FieldValue} from "firebase-admin/firestore"
import { v4 as uuidv4 } from 'uuid';

// update the testimonials

//delete the testimonials


//insert the testimonials
export async function insertFirstTestimonial(name,company,url,userId){
    const docRef  = db.collection(userId).doc("testimonialWalls")
    const resp = await docRef.set({walls:[{
        id:uuidv4(),
        wallName: `${company} Testimonial Wall`,
        accepted:0,pending:0,views:0,status:0
    }]})
    return resp;
    // console.log(resp) 
}

export async function isTestimonialExists(userId,testimonial){
    const docRef = db.collection(userId)
    const resp = await docRef.where("testimonial",'==',testimonial).get();
    console.log(resp.empty)
    if(resp.empty){
        return false;
    }
    return true;  

}

export async function insertTestimonialWall(title,body,rating,name,userId,testimonialWallName){
    const docRef  = db.collection(userId).doc("testimonials")
    const resp = await docRef.set({
        title,body,name,rating,linked:[testimonialWallName]
    })
    return resp;
    // console.log(resp) 
}


//get all the testimonial walls for a user
export async function getallUserTestimonialwalls(userId){
    const docRef = db.collection(userId)
    const resp = await docRef.get();
    let testimonialWalls = []
    resp.forEach((doc)=>{
        const data = doc.data()
        data && (testimonialWalls = data.walls);
    })
    return testimonialWalls
}


//check if wallNameAlrady exists
export async function isWallNameAlreadyExits(wall_name,user_id,wall_id){
    let testimonialWalls = await getallUserTestimonialwalls(user_id);
    let isExits = false;
    testimonialWalls.forEach((testimonialWall)=>{
        console.log(testimonialWall)
        if(testimonialWall.wallName == wall_name && testimonialWall.id != wall_id){
            isExits = true
        }
    })
    return isExits

}


//get the testimonialWall name
export async function getTestimoniallWallData(userId,wall_id){
    let testimonialWalls = await getallUserTestimonialwalls(userId);
    let response = {};
    testimonialWalls?.map((testimonialWall)=>{
        console.log(testimonialWall)
        if(testimonialWall.id == wall_id){
            response.wallName = testimonialWall.wallName;
            return
        }
    })
    return response
    
}


//update and set the data
export async function updateTestimonialWallName(wall_name,user_id,wall_id){
    const docRef = await db.collection(user_id).doc("testimonialWalls")
    let testimonialWalls = await getallUserTestimonialwalls(user_id);
    let updatedTestimonialsWallsData = testimonialWalls
    testimonialWalls.forEach((testimonialWall,id)=>{
        if(testimonialWall.id == wall_id){
            updatedTestimonialsWallsData[id].wallName = wall_name;
        }
    })
    console.log(updatedTestimonialsWallsData)
    const response = await docRef.set({walls:updatedTestimonialsWallsData})
    return response
}



// export async function isUserExists(email){
//     const docRef  = db.collection('login')
//     const resp = await docRef.where("email",'==',email).get();
//     if(resp.empty){
//         return false;
//     }
//     resp.forEach((doc)=>{
//         return(doc.id);
//     })
// }

