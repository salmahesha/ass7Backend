import { bookCollection } from '../../DB/models/Book.model.js';

export default async function createBooks(data) {
    if (!data.title || data.title.trim() === "") {
        const err = new Error("Title is required");
        err.cause = { statusCode: 400 };
        throw err;
    }
    return {"ok":1};
}
export async function createTitleIndex(data) {
    return bookCollection.createIndex(data);
}
export async function insertBook(data) {
    (await bookCollection.find().toArray()).map((book)=>{
        if(book.title === data.title){
            throw new Error("This Book Already Exist");
        }
    });
    return bookCollection.insertOne(data);
}
export async function insertManyBooks(data) {

    (await bookCollection.find().toArray()).map((book)=>{

        data.map((item)=>{

            if(book.title === item.title){
                throw new Error("Book from all Already Exist");
            }
        })
    });

    return bookCollection.insertMany(data);
}
export async function updateYear(bodyData , queryData) {
   const bookExists = await bookCollection.findOne({title:queryData.title});
   if(!bookExists){throw new Error("not available book with this title");}
return await bookCollection.updateOne(
        { title: queryData.title },
        { $set: { year: bodyData.year } }
    );
}
export async function findBookByTitle(queryData){
    const bookExists = await bookCollection.findOne({title:queryData.title});
    if(!bookExists){
        throw new Error("not available book with this title");
    }
    return bookExists;
}
export async function findBookBetween2010(queryData){
     const from = Number(queryData.from);
    const to   = Number(queryData.to);
    
   return bookCollection.find({ year: { $lt: to, $gt: from } }).toArray();
}
export async function excludeGenres() {
    return await bookCollection.find({
        genres: { $nin: ["Horror", "Science Fiction"] }
    }).toArray();
}
export async function yearInteger() {
    return await bookCollection.find({
        year: { $type: "int" }
    }).toArray();
}
export async function findBookBefore(reqQuery) {
        const year = Number(reqQuery.year);

    console.log(typeof reqQuery.year);
    return await bookCollection.find({
        year: {$lte: year }
    }).toArray();
}

