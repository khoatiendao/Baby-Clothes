import mongoose, { Schema } from 'mongoose';

const customerSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 5,
      maxLength: 10,
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE', 'OTHER'],
      required: true,
    },
    phone: {
      type: String,
      maxLength: 11,
    },
    address: {
      type: String,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    },
    status: {
      type: String,
      enum: ['ACTIVATED', 'UNACTIVATED'],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    },
  },
  {
    versionKey: 'version',
    timestamps: true,
  }
);

export const customer = mongoose.model('Customer', customerSchema);
