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
    },
    permission: [{
        type: String,
        enum: ['ALL', 'READ', 'CREATE', 'UPDATE', 'DELETE'],
        required: true,
        default: 'ALL'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    } 
}, {
    versionKey: 'version',
    timestamps: true
});

export const Admin = mongoose.model("Admin", adminSchema);