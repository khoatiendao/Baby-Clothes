import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema({    
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 255
    },
    description: {
        type: String,
        maxLength: 255,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: 'version'
  }
);

export const brand = mongoose.model('Brand', brandSchema);