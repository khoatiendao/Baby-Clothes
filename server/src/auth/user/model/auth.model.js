import mongoose, { Schema } from "mongoose";

const authSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,        
        trim: true
    },
    userAgent: {
        type: String,        
    },
    ip: {
        type: String,        
    },
    createAt: {
        type: Date,        
    },
    expiresAt: {
        type: Date,        
    },
    revoked: {
        type: Boolean,        
    }
}, {
    timestamps: true
})

authSchema.index({ userId: 1 });
authSchema.index({ token: 1 }, { unique: true });
authSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Auth = mongoose.model('Auth', authSchema);