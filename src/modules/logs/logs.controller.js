import express from "express";
import createCappedCollection, { insertInLogs } from "./logs.service.js";
const logsRouter = express.Router();
logsRouter.post("/collection/logs/capped" ,async (req,res)=>{
   const result = await createCappedCollection(req.data);
   return res.json(result)
});
logsRouter.post("/logs" , async (req , res)=>{
   try {
      const result = await insertInLogs(req.body);
      return res.status(201).json(result);
   } catch (error) {
      
      return res.status(409).json(error.message);
   }
})

export default logsRouter;