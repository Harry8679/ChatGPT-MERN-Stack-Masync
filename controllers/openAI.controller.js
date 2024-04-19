const asyncHandler = require("express-async-handler");
const ContentHistory = require('../models/ContentHistory.model');
const User = require('../models/user.model');
const axios = require('axios');
const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
});
 
const openAIController = asyncHandler(async (req, res) => {
    // console.log(req.user);
    console.log('req.cookies.token', req.cookies.token);
    console.log('------------------------------------------');
    console.log('req', req);
    const {prompt} = req.body
    try {
        const response = await axios.post("https://api.openai.com/v1/completions", {
            model: "gpt-3.5-turbo-instruct",
            prompt: `Generate a blog post for ${prompt}`,
            max_tokens:700
        }, {
            headers: {
                Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
                'Content-Type' : "application/json"
            }
        })
        console.log('------------------------------------------');
        // console.log(response.data);
        // Send the response
        const content = response?.data?.choices[0].text?.trim();
        // Create the history
        const newContent = await ContentHistory.create({
            user: req?.user?._id,
            content,
        });
        // Push the content into the user
        const userFound = await User.findById(req?.user?._id);
        userFound.history.push(newContent?._id);
        await userFound.save();
        res.status(200).json(content);
    } catch (error) {
        throw new Error(error)
    }
})
 
module.exports = { openAIController };