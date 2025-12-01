import mongoose, { Schema } from "mongoose";


const discountSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    condition: {
        type: String,
    },
    typeDiscount: {
        type: String,
        enum: ['PRICE', 'PERCENTAGE'],
        required: true,
    },
    numberDiscount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['OPEN', 'CLOSED', 'USED', 'OUT OF QUANTITY'],
        required: true,
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    useLimit: {
        type: Number,
        required: true,
        default: 1
    }
  },
  {
    timestamps: true
  }
);

export const discount = mongoose.model('Discount', discountSchema);
