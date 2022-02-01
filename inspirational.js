const schedule = require('node-schedule');
require('dotenv').config();
const {TwitterApi} = require('twitter-api-v2');
const OpenAI = require('openai-api');
const client = new TwitterApi({
    appKey: process.env.twitterappKey,
    appSecret: process.env.twitterappSecret,
    accessToken: process.env.twitteraccessToken,
    accessSecret: process.env.twitteraccessSecret,
});


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let tweet=async () => {
    const response = await openai.createCompletion("text-davinci-001", {
        prompt: "Inspirational quote and author :",
        max_tokens: 250,
    });
    const textToTweet=response.data.choices[0].text;
    const finalText=textToTweet.concat("\n #inspirationalquotes");
    console.log(finalText);
    
    
    client.v1.tweet(finalText).then((val) => {
        console.log(val)
        console.log("success")
    }).catch((err) => {
        console.log(err)
    })
    
    
};



const rule = new schedule.RecurrenceRule();
rule.hour = 8
rule.minute = 0;

const job = schedule.scheduleJob(rule, function(){
    tweet();
});


