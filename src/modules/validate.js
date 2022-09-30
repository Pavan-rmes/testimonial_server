// import { client } from "../index.js";
import {allOtps} from "../DB/otps.js"


export function isEmailValid(email){
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email)
        return false;

    if(email.length>254)
        return false;

    var valid = emailRegex.test(email);

    if(!valid)
        return false;
}

// export async function isUserAlreadyExists(email){
//     const result = await client.db('node-task5').collection("user-privacy").findOne({email:email})
//     return result;
// }

export async function checkIfOtp(email,newOtp){
    for(let i = 0;i<allOtps.length;i++){
        const otp = allOtps[i];
        if(otp.email === `${email}`){
            otp.validOtp = newOtp;
            return;
        }
    }
    const newRecord = {email:`${email}`,validOtp:newOtp}
    allOtps.push(newRecord)
}


export async function verifytheOtp(email,newOtp){

    for(let i = 0;i<allOtps.length;i++){
        const otp = allOtps[i];
        if(otp.email === `${email}` && otp.validOtp === newOtp){
            return({status:"success"});
        }
        else if(otp.email === `${email}` && otp.validOtp !== newOtp){
            return({status:"Invalid"})
        }
    }
    return({status:"Error"})
}