const { Schema } = require('mongoose');

const discountSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      minLength: 3,
      maxLength: 255,
    },
    condition: {
        type: String,
    },
    typeDiscount: {
        type: String,
        enum: ['PRICE', 'PERCENTAGE'],
        require: true,
    },
    numberDiscount: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        enum: ['OPEN', 'CLOSED', 'USED', 'OUT OF QUANTITY'],
        require: true,
    },
    startDate: {
        type: String,
        require: true
    },
    endDate: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
        default: 1
    },
    useLimit: {
        type: Number,
        require: true,
        default: 1
    }
  },
  {
    timestamps: true
  }
);

export const discount = mongoose.model('Discount', discountSchema);
