import express from "express";
import { SERVER_PORT,NODE_ENV } from "../config/config.service.js";
import testDbConnection from "./DB/connection.js";
import bookRouter from "./modules/Books/book.controller.js";
import authorRouter from "./modules/authors/author.controller.js";
import logsRouter from "./modules/logs/logs.controller.js";



export default async function Bootstrap(){
    const app = express();
    const port = SERVER_PORT;
    app.use(express.json());

    await testDbConnection();
app.use(bookRouter);
app.use(authorRouter);
app.use(logsRouter);
    app.use((error,req,res,next)=>{
        return NODE_ENV == "dev"
        ? res.status(error.cause?.statusCode??500).json({errMsg:error.message,error , stack:error.stack})
        :res.status(error.cause?.statusCode??500).json({errMsg:error.message || "Something went wrong"});
    });
    app.listen(port , ()=>{
        console.log(`server run on port :${port}`);
        
    })
}
