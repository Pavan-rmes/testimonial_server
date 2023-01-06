import {db} from "./dbInitialize.js"
import { Timestamp, FieldValue} from "firebase-admin/firestore"
import { v4 as uuidv4 } from 'uuid';





export async function insertTestimonialData(data,id){
    const docRef = db.collection(id);
    // const data = await docRef.get();
    // let testimonialData = data.data()?.data;
    // if(!testimonialData){
    //     testimonialData = [];
    // }
    data.acceptedStatus = 0;
    const resp = await docRef.add({data:data});
    return resp;
}

export async function isTweetAlreadyExists(tweetId,userId,id){
    const docRef = db.collection(id);
    const data = await docRef.get();
    let isDuplicate = false;
    data.forEach((doc)=>{
        if (doc.data()?.data?.tweetId === tweetId){
            isDuplicate = true
        }
    })
    return isDuplicate
}

export async function getTestimonailData(id){
    const docRef = db.collection(id);
    const data = await docRef.get();
    const testimonialData = [];
    data.forEach(doc=>{
        let documentData = doc.data()?.data;
        console.log(doc?.id)
        documentData.documentId=doc.id
        testimonialData.push(documentData)
    })
    // const testimonialData = data.data()?.data;
    return testimonialData;
}

export async function updateTestimonialStatus(wall_id,doc_id,val){
    const docRef = db.collection(wall_id).doc(doc_id);
    const resp = await docRef.update({'data.acceptedStatus':val})
    return resp
}