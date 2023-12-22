/**
 * Save generatered poem to db
 */
import client from './mongoConnection'
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {

    const body = await readBody(event);
    console.log(body)

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const database = client.db(config.mongoDB);
        const questionsCollection = database.collection("Questions");

        const documents = body.questions.map((question: string) => ({
            question,
            coachingModel: body.coachingModel,
            questionType: body.questionType
        }));

        const result = await questionsCollection.insertMany(documents);
        console.log(`Questions were inserted to the database: ${result}`)

    } catch (error: any) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message,
        })
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }

    return true;

});