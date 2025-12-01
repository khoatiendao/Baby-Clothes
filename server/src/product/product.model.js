import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 255,
  },
  slug: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    trim: true,
  },
  image: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    },
  ],
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'SOLD OUT'],
    required: true,
  },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discount',
  },
  variants: [
    {
      color: String,
      size: String,      
    },
  ],
  sold: {
    type: Number,
    required: true
  }
});

export const product = mongoose.model('Product', productSchema);
