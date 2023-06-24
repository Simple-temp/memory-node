import express from "express";
import Memory from "../MemoryModel/MemoryModel.js";

const getMemory = express.Router()

getMemory.get("/", async (req, res) => {

    const data = await Memory.find()
    res.json(data)

})


export default getMemory