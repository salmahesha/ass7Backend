import { db } from "../../DB/connection.js";

export default async function createAuthor(data) {
   const result = (await db.createCollection('authors')).insertOne(data);
   return result;
}