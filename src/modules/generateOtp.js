export function generateNewOtp(){
    var newOtp = Math.floor(1000 + Math.random() * 9000);
    return newOtp;
}