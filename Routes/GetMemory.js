import express from "express";
import Memory from "../MemoryModel/MemoryModel.js";

const getMemory = express.Router()

getMemory.get("/", async (req, res) => {

    const data = await Memory.find()
    res.json(data)

})

// getMemory.get("/uploads/:file", async (req, res) => {

//     const filename = req.params.filename;
    
//     const data = await Memory.findOne({ file : filename})

//     console.log(data)

//     res.json(data)

// })

export default getMemory