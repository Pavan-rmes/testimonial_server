import bcrypt from "bcrypt"


export async function hashingPasswd(password){
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    return(hashPassword)
}

export async function verifyPassword(password,DbPassword){
    const response = await bcrypt.compare(password,DbPassword)
    return response;
}