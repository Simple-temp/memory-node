import mongoose from "mongoose";


const MemorySchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        file: { type: String, require: true }
    },
    {
        timestamps: true
    }
)

const Memory = mongoose.model("Memory", MemorySchema)

export default Memory