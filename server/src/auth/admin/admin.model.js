import mongoose, {Schema} from "mongoose";

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 5,
        maxLength: 255
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 5,
        maxLength: 255,
    },
    permission: {
        type: String,
        enum: ['ALL', 'READ', 'CREATE', 'UPDATE', 'DELETE'],
        required: true,
        default: 'ALL'
    },
}, {
    versionKey: 'version',
    timestamps: true
});

export const admin = mongoose.model("Admin", adminSchema);