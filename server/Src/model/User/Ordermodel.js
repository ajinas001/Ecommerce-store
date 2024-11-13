const { configDotenv } = require('dotenv')
const mongoose = require('mongoose')
require('dotenv').config
const connectionString =process.env.connectionString
mongoose.connect.connectionString

const Schema = mongoose.Schema
const orderSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    Name: {
        type: String,
        required: true,
      },
      Email: {
        type: String,
        required: true,
      },
      Phone: {
        type: Number,
        required: true,
      },
      SecondaryPhone: {
        type: Number,
        required: true,
      },
    products: [
      {
        productId: { type: String, required: true },
        size: { type: String, default: "M" },
        price: { type: Number,required:true },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    Status: {
      type: String,
      required: true,
      default:"ORDER-PLACED"
    },
    UserAddress: {
      // Name:{ type: String, required: true },
      Address: { type: String, required: true },
      City: { type: String, required: true },
      State: { type: String, required: true },
      PinCode: { type: String, required: true },
      Status: { type: String, default:"normal" },
    },
    PaymentMethod: {
      type: String,
      required: true,
    },
    PaymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    // taxPrice: {
    //   type: Number,
    //   required: true,
    //   default: 0.0,
    // },
    // shippingPrice: {
    //   type: Number,
    //   required: true,
    //   default: 0.0,
    // },
    TotalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    IsPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    PaidAt: { type: Date },
    IsDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    DeliveredAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const OrderModel = mongoose.model('Order', orderSchema);
  module.exports = OrderModel;