import mongoose, {Schema} from "mongoose";

const adminSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minLength: 5,
        maxLength: 255
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minLength: 5,
        maxLength: 50
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minLength: 5,
        maxLength: 255,
    },        
}, {
    versionKey: 'version',
    timestamps: true
});

export const admin = mongoose.model("Admin", adminSchema);