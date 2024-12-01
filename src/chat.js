require('dotenv').config();
const OpenAI = require('openai');
const Anthropic = require('@anthropic-ai/sdk');

async function useChat(prompt, model = "gpt-4o-mini") {
    if (model === "gpt-4o-mini") {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {   
                role: "system", 
                content: prompt
            }
        ]
        });
        return completion?.choices[0]?.message
    }
    if (model === "claude-3-5-sonnet") {
        // WIP
        const anthropic = new Anthropic();
        const msg = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1000,
            messages: [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
            }
        );
        return msg?.content[0]?.text
    }

}

module.exports ={
    useChat
}
