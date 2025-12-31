
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentId: String,
  paymentMethod: {
    type: String,
    enum: ['Razorpay', 'COD'],
    default: 'Razorpay'
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    phone: String
  }
}, {
  timestamps: true
});

export default mongoose.model("Order", orderSchema);
