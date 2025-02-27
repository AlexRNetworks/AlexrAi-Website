const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function (event, context) {
    const configuration = new Configuration({
        apiKey: process.env.OPEN_AI_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const body = JSON.parse(event.body);
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [{ role: "user", content: body.prompt }],
        });

        return {
            statusCode: 200,
            body: JSON.stringify(response.data.choices[0].message.content),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
