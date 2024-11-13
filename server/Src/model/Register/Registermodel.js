const { configDotenv } = require('dotenv')
const mongoose = require('mongoose')
require('dotenv').config
const connectionString = process.env.connectionString
mongoose.connect.connectionString

const Schema = mongoose.Schema



const contactSchema = new Schema({
  name: { type: String },
  email: { type: String },
  Phone: { type: String },
  SecondaryPhone: { type: String },
  password: { type: String },
  logintype: { type: String },
  cart: { type: Array },
  wishlist: { type: Array },
  role: { type: Number },
  status: { type: String },
  UserAddress: [{
    Name: { type: String },
    Email: { type: String },
    Phone: { type: String },
    SecondaryPhone: { type: String },
    Address: { type: String },
    City: { type: String },
    State: { type: String },
    PinCode: { type: String }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Registermodel = mongoose.model('register_tb', contactSchema)

module.exports = Registermodel