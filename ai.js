// import Anthropic from "@anthropic-ai/sdk"
import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients a user has and suggests a recipe they could make with some or all of those ingredients. The recipe should be creative and useful but doesn’t need to use every ingredient provided. You may include a few additional ingredients not mentioned, but keep them minimal and relevant. The recipe should be formatted in Markdown for easy presentation, with clear sections such as:
	1.	Title of the dish
	2.	Ingredients list
	3.	Instructions with numbered steps
	4.	Optional notes, such as tips or serving suggestions

Make sure the recipe is easy to follow and can be made with common kitchen tools. Try to keep the instructions simple and concise.Format your response in markdown to make it easier to render to a web page
`
//
// 🚨👉 ALERT: Read message below! You've been warned! 👈🚨
// If you're following along on your local machine instead of
// here on Scrimba, make sure you don't commit your API keys
// to any repositories and don't deploy your project anywhere
// live online. Otherwise, anyone could inspect your source
// and find your API keys/tokens. If you want to deploy
// this project, you'll need to create a backend of some kind,
// either your own or using some serverless architecture where
// your API calls can be made. Doing so will keep your
// API keys private.

// const anthropic = new Anthropic({
//     // Make sure you set an environment variable in Scrimba 
//     // for ANTHROPIC_API_KEY
//     apiKey: process.env.ANTHROPIC_API_KEY,
//     dangerouslyAllowBrowser: true,
// })

// export async function getRecipeFromChefClaude(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")

//     const msg = await anthropic.messages.create({
//         model: "claude-3-haiku-20240307",
//         max_tokens: 1024,
//         system: SYSTEM_PROMPT,
//         messages: [
//             { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
//         ],
//     });
//     return msg.content[0].text
// }

// // Make sure you set an environment variable in Scrimba 
// // for HF_ACCESS_TOKEN


const HF_ACCESS_TOKEN = import.meta.env.VITE_HF_ACCESS_TOKEN;

if (!HF_ACCESS_TOKEN) {
    console.error("HF_ACCESS_TOKEN is not defined. Please check your .env file.");
}

const hf = new HfInference(HF_ACCESS_TOKEN);

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}
