const asyncHandler = require("express-async-handler");
const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
});
 
const openAIController = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
 
  try {
    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required." });
      }
     
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 700,
      }, {
        headers: {
            Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
            'Content-Type': 'application/json',
        }
      });
     
      console.log(completion.choices[0]);
      res.json(completion.choices[0]);
  } catch(error) {
    throw new Error(error);
  }
});
 
module.exports = { openAIController };