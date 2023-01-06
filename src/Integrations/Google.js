import dotenv from "dotenv"
import axios from "axios"
dotenv.config();

const googleBusinessApi = process.env.GOOGLE_SEARCH_API
const googleReviewsKey = process.env.GOOGLE_REVIEW_API_KEY
const googleReviewsApi = process.env.GOOGLE_REVIEW_API

export async function getGoogleBusinessAccounts(account){
    let businessAccounts=[];
    await axios.get(`${googleBusinessApi}?query=${account}&key=${googleReviewsKey}`)
    .then((data)=>{data.data?.results?.map((d)=>{businessAccounts.push({name:d.name,rating:d.rating,placeId:d.place_id,reviewsCount:d.user_ratings_total})});})
    .catch((e)=>console.log("google reviews api error"))
    return businessAccounts
}

export async function getGoogleBusinessReviews(place_id){
    let googleReviews;
    let reviews = []
    console.log(`${googleReviewsApi}?place_id=${place_id}&fields=name,rating,reviews,formatted_phone_number&key=${googleReviewsKey}`)
    await axios.get(`${googleReviewsApi}?place_id=${place_id}&fields=name,rating,reviews,formatted_phone_number&key=${googleReviewsKey}`)
    .then((data)=>(googleReviews= data.data))
    .catch((e)=>console.log("google reviews api error"))
    
    //parsing and putting it in the common syntax
    googleReviews?.result?.reviews?.map((r)=>reviews.push({name:r.author_name,text:r.text,profile_image_url:r.profile_photo_url,rating:r.rating}))

    return reviews
}