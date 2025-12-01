import mongoose, { Schema } from "mongoose";


const cartSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
      unique: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        variants: {
          color: String,
          size: String,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    discount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discount',
    },
    finalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const cart = mongoose.model('Cart', cartSchema);
