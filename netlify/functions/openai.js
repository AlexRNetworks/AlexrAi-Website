const { OpenAI } = require("openai");

exports.handler = async function (event, context) {
    const openai = new OpenAI({
        apiKey: process.env.OPEN_AI_KEY,
    });

    try {
        const body = JSON.parse(event.body);
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: body.prompt }],
        });

        return {
            statusCode: 200,
            body: JSON.stringify(response.choices[0].message.content),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
