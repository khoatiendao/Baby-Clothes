import mongoose, { Schema } from "mongoose";


const cartSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      require: true,
      unique: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          require: true,
        },
        price: {
          type: Number,
          require: true,
        },
        quantity: {
          type: Number,
          require: true,
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
