import {db} from "./dbInitialize.js"
import { Timestamp, FieldValue} from "firebase-admin/firestore"
import { v4 as uuidv4 } from 'uuid';

// update the testimonials

//delete the testimonials


//insert the testimonials
export async function insertFirstTestimonial(name,company,url,userId){
    const docRef  = db.collection(userId)
    const resp = await docRef.add({
        testimonial: `${company} Testimonial Wall`,
        accepted:0,pending:0,views:0,status:0
    })
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

export async function getallUserTestimonials(userId){
    const docRef = db.collection(userId)
    const resp = await docRef.get();
    let testimonials = []
    resp.forEach((doc)=>{
        const data = doc.data()
        data && testimonials.push(data);
    })
    return testimonials
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

