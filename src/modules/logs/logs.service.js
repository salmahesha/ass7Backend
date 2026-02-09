import { ObjectId } from "mongodb";
import { db } from "../../DB/connection.js";
import { bookCollection } from "../../DB/models/Book.model.js";
import logCollection from "../../DB/models/logs.model.js";

export default async function createCappedCollection(data){
  const result =  await db.createCollection('logs' , data);
  return result;
}
export async function insertInLogs(data){
      const bookId = new ObjectId(data.book_id);
      const bookExists = await bookCollection.findOne({_id: bookId });
    if (!bookExists) {
        throw new Error("not available book_id");
    }
      const isBorrowed = await logCollection.findOne({book_id: data.book_id });
    if (isBorrowed) {
        throw new Error("this book id is borrowed");
    }
      return logCollection.insertOne(data);
  
}