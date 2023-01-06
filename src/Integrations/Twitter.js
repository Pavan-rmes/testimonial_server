import dotenv from "dotenv"
import axios from "axios"
dotenv.config();

const twitterApi = process.env.TWITTER_API;
const bearerToken = process.env.BEARER_TOKEN;


export async function getDataFromTwitter(url){
    //get the id of tweet
    let id = getIdFromUrl(url);
    let tweetData = {};
    let author_id;
    if(!(+id)){
        console.log("failed")
        tweetData = false;
        return false;
    }
    await axios.get(`${twitterApi}?ids=${id}&expansions=attachments.media_keys,author_id&user.fields=profile_image_url&media.fields=alt_text,duration_ms,height,media_key,preview_image_url,type,url,variants,width`,{
        headers:{
            Authorization:`Bearer ${bearerToken}`
        }
    })
    .then((data)=>{
        const textData = data?.data?.data[0];
        //auther Id
        author_id = textData?.author_id;
        console.log(author_id)
        if(!author_id){
            return false;
        }
        
        const userdata  = data.data?.includes?.users[0];
        const mediaData = data.data?.includes?.media;
        
        //auther Id
        tweetData.author_id = author_id;
        
        //tweet id
        tweetData.tweetId = id
        //text data
        tweetData.text = (textData?.text)?.split('https://t.co')[0];

        //profile name
        tweetData.name = (userdata?.name);

        // profile image url
        //If the profile pic is not know it will use the default image
        //https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png
        const profile_image_url = (userdata?.profile_image_url).split("_normal.");

        tweetData.profile_image_url = profile_image_url[0]+"."+profile_image_url[1]
        console.log(profile_image_url)

        tweetData.media = [];
        
        //get all images and append them to images
        mediaData?.map((d)=>{
            if(d?.type === "photo"){tweetData.media.push({type:"photo",url:d.url})}
            if(d?.type === "video"){tweetData.media.push({type:"video",preview_image_url:d.preview_image_url,url:d.variants})}
        })

    })
    .catch((e)=>(tweetData=false));
    return tweetData;
    
}

// getDataFromTwitter("https://twitter.com/happyhomens/status/1585020532038471681?s=20&t=Bw2uBKJ7c10Y2he9-zAa7Q")

function getIdFromUrl(url){
    console.log(url)
    const parsedUrl = url.split("/")
    const id = parsedUrl.pop().split("?")[0]
    console.log(id)
    return id
}
