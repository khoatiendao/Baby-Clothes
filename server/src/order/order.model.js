const { Schema, default: mongoose } = require('mongoose');

const orderSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        variant: {
          color: String,
          size: String,
        },
      },
    ],

    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      ward: String,
      district: String,
      province: String,
    },

    paymentMethod: {
      type: String,
      enum: ['COD', 'MOMO', 'VNPAY'],
      default: 'COD',
    },
    paymentStatus: {
      type: String,
      enum: ['UNPAID', 'PAID', 'REFUND'],
      default: 'UNPAID',
    },

    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED'],
      default: 'PENDING',
    },

    totalPrice: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number, required: true },
    voucherCode: String,
    note: String,
  },
  {
    timestamps: true
  }
);

export const order = mongoose.model('Order', orderSchema);
