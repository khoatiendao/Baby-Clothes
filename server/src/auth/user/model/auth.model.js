import mongoose, { Schema } from "mongoose";

const authSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true,
        trim: true
    },
    userAgent: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    revoked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

authSchema.index({ userId: 1 });
authSchema.index({ token: 1 }, { unique: true });
authSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const auth = mongoose.model('Auth', authSchema);