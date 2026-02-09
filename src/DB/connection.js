import { MongoClient } from "mongodb";
import { DB_NAME, DB_URL_ATLAS, DB_URL_LOCAL } from "../../config/config.service.js";

const client = new MongoClient(DB_URL_LOCAL);
export const db = client.db(DB_NAME);
export default async function testDbConnection() {
    try {
        await client.connect();
        console.log("DB Connected Successfully to server");
        
    } catch (error) {
        console.log("DB connection Failed");
        
    }
}