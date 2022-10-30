import {db} from "./dbInitialize.js"
import { Timestamp, FieldValue} from "firebase-admin/firestore"
import { v4 as uuidv4 } from 'uuid';


export async function insertTestimonial(title,body,rating,name,userId,testimonialWallName){
    const docRef  = db.collection(userId).doc("testimonials")
    const resp = await docRef.set({
        title,body,name,rating,linked:[testimonialWallName]
    })
    return resp;
    // console.log(resp) 
}


export async function insertTwitterData(tweetData,userId,id){
    const docRef = db.collection(userId).doc(id);
    const data = await docRef.get();
    let testimonialData = data.data()?.data;
    if(!testimonialData){
        testimonialData = [];
    }
    const resp = await docRef.set({data:[...testimonialData,tweetData]});
    return resp;
}

export async function isTweetAlreadyExists(tweetId,userId,id){
    const docRef = db.collection(userId).doc(id);
    const data = await docRef.get();
    const testimonialData = data.data()?.data;
    if(!testimonialData){
        return false;
    }
    for (let i =0;i<testimonialData?.length;i++){
        if(testimonialData[i].tweetId === tweetId){
            return true
        }
    }
    return false
}

export async function getTestimonailData(userId,id){
    const docRef = db.collection(userId).doc(id);
    const data = await docRef.get();
    const testimonialData = data.data()?.data;
    return testimonialData;
}