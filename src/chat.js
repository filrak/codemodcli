import OpenAI from 'openai';
const openai = new OpenAI();

async function useChat(prompt) {
    const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", 
            content: 'Tell me what this code does and how it works in less than 100 words'
        },
        {
            role: "user",
            content: prompt
        },
    ],
    });
    return completion?.choices[0]?.message
}

