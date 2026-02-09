import express from "express";
import  createBook, { createTitleIndex, excludeGenres, findBookBefore, findBookBetween2010, findBookByTitle, insertBook, insertManyBooks, updateYear, yearInteger }  from "../Books/book.service.js";

const bookRouter = express.Router();

// POST /collection/books
bookRouter.post("/collection/books", async (req, res, next) => {
    try {
        await createBook(req.body);

        res.status(201).json({
            ok: 1,
        });
    } catch (error) {
        next(error);
    }
});

bookRouter.post("/collection/books/index",async (req, res, next) =>{
   const result = await createTitleIndex(req.body);
   return res.json(result);
})
bookRouter.post("/books",async (req, res, next) =>{
try {
       const result = await insertBook(req.body);
       return res.json(result);
    
} catch (error) {
        return res.status(409).json(error.message);
}})
bookRouter.post("/books/batch",async (req, res, next) =>{
   try {
    const result = await insertManyBooks(req.body);
    return res.json(result);
   } catch (error) {
    return res.status(409).json(error.message);
   }
})
bookRouter.patch("/books/:title",async (req, res, next) =>{
   try {
    const result = await updateYear(req.body , req.params);
    return res.json(result);
   } catch (error) {
    return res.status(404).json(error.message);
   }
})
bookRouter.get("/books",async (req, res, next) =>{
   try {
    const result = await findBookByTitle(req.query);
    return res.json(result);
   } catch (error) {
    return res.status(404).json(error.message);
   }
})
bookRouter.get("/books/year",async (req, res, next) =>{
   try {
    const result = await findBookBetween2010(req.query);
    return res.json(result);
   } catch (error) {
    return res.status(404).json(error.message);
   }
})
bookRouter.get("/books/exclude-genres", async (req, res) => {
    try {
        const result = await excludeGenres();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
bookRouter.get("/books/year-integer", async (req, res) => {
    try {
        const result = await yearInteger();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
bookRouter.get("/books/year", async (req, res) => {
    try {
        const result = await findBookBefore(req.query);
        
       return res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default bookRouter;
