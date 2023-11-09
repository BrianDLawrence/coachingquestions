/**
 * Utilize openAI to generate different types of powerful questions 
 */

import OpenAI from "openai";
import { parseQuestions } from '../../composables/chatUtils';
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {

    if (!config.openAIKey)
        throw createError({
            statusCode: 400,
            statusMessage: "UNDEFINED RUNTIME CONFIGURATION - NO open AI KEY"
        })

    const query = getQuery(event);

    const question = "As a professional masterful coach, utilizing the " + query.coachingModel + " coaching approach, please create " + query.numberofquestions + " questions for use in the session during the " + query.questiontype + " stage of the coaching model. Please provide the questions in the following format: <QUESTIONS START><Q>'the question'</Q><Q>'the second question'</Q>..<QUESTIONS END>"

    console.log("To Chat GPT:" + question)

    const configuration = {
        apiKey: config.openAIKey
    };

    const openai = new OpenAI(configuration);
    try {

        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: question }],
            model: "gpt-3.5-turbo",
        });

        console.log(chatCompletion.choices[0])
        return parseQuestions(String(chatCompletion.choices[0].message?.content))

    } catch (error: any) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        throw createError({
            statusCode: 400,
            statusMessage: error.message,
        })
    }
});