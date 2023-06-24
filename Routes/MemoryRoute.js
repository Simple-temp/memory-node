import express from "express";
import multer from "multer";
import Memory from "../MemoryModel/MemoryModel.js";

const storage = multer.diskStorage({

    destination : function (req, file, cb) {
        return cb( null, "./uploads/" )
    },

    filename : function (req, file, cb) {
        return cb( null, `${Date.now()}-${file.originalname}` )
    }

})

const upload = multer ({ storage })

const MemoryRouter = express.Router()

MemoryRouter.post("/", upload.single("file"), async (req, res) => {

    console.log(req.file, req.body.name)
    
    try {
        const { name } = req.body;
        const { filename } = req.file;

        const memory = new Memory({ name, file: filename });
        
        await memory.save();

        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving data' });
    }
})

export default MemoryRouter