import mongoose, { Schema } from "mongoose";


const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'MERCHANT'],
      required: true,
    },
  },
  { timestamps: true }
);

export const user = mongoose.model('User', userSchema);
