/**
 * Save generatered poem to db
 */
import client from './mongoConnection'
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        //DO STUFF

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