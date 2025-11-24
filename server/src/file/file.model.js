import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema({
    fileName: {
        type: String,        
    },
    url: {
        type: String,
        require: true,
    },
    fileType: {
        type: String,    
    }

}, {
    timestamps: true,
})

export const file = mongoose.model('File', fileSchema);