require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function useChat(prompt) {
    const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", 
            content: prompt
        }
    ]
    });
    return completion?.choices[0]?.message
}

module.exports ={
    useChat
}
