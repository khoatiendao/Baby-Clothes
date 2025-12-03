import mongoose, {Schema} from "mongoose";

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 5,
        maxLength: 255,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 20
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

export const Admin = mongoose.model("Admin", adminSchema);