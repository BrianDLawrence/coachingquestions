/**
 * This script creates the initial version of the mongoDB database for coaching questions
 */
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const mongoURI = process.env.MONGOURI
const mongoDatabase = process.env.MONGODB

const client = new MongoClient(mongoURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        await client.connect();
        console.log("Connected to the database");

        const database = client.db(mongoDatabase);
        const collections = await database.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);

        //CHECK FOR "VERSION" Collection
        if (collectionNames.includes("Version")) {
            console.log("Version collection exists");
        } else {
            console.log("Version collection does not exist. Creating...");
            const versionCollection = await database.createCollection("Version");

            const initialVersion = {
                dbVersion: "1.0.0",
                dateUpgraded: new Date(),
                notes: "Initial version",
            };

            await versionCollection.insertOne(initialVersion);
            console.log("Version collection created with initial version fo 1.0.0");
        }

        // Check for "Questions" collection
        if (collectionNames.includes("Questions")) {
            console.log("Questions collection exists");
        } else {
            console.log("Questions collection does not exist. Creating...");
            await database.createCollection("Questions");
            console.log("Questions collection created");
        }
    } catch (err) {
        console.log("Error connecting to the database:", err);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);