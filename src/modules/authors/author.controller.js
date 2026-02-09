import express from "express";
import createAuthor from "./author.service.js";
const authorRouter = express.Router();
authorRouter.post("/collection/authors" ,async (req,res)=>{
   const result = await createAuthor(req.body);
   return res.json(result)
});
export default authorRouter;