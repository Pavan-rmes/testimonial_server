import {db} from "./dbInitialize.js"
import { Timestamp, FieldValue} from "firebase-admin/firestore"
import { v4 as uuidv4 } from 'uuid';


export async function insertUser(email){
    const docRef  = db.collection('login')
    const resp = await docRef.add({
        email:email,
        timeStamp:FieldValue.serverTimestamp()
    })
    console.log(resp)
}

export async function isUserExists(email){
    let userId;
    const docRef  = db.collection('login')
    const resp = await docRef.where("email",'==',email).get();
    if(resp.empty){
        return false;
    }
    resp.forEach((doc)=>{
        userId =doc.id;
    })
    return userId;
}
