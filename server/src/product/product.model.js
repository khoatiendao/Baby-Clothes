import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    minLength: 1,
    maxLength: 255,
  },
  slug: {
    type: String,
    require: true,
  },
  sku: {
    type: String,
    require: true,
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
    require: true,
    trim: true,
  },
  stock: {
    type: Number,
    require: true,
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
    require: true,
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
    require: true
  }
});

export const product = mongoose.model('Product', productSchema);
