import { client } from "../index.js";

export async function insertUserInToDb(email,hashedPswd,name){
    const response = await client.db('node-task5').collection("user-privacy").insertOne({email,password:hashedPswd,name,active:false})
    return response
}

export async function makeAccountActive(email){
    const response = await client.db('node-task5').collection("user-privacy").updateOne({email:email},{$set:{active:true}})
    return response
}

