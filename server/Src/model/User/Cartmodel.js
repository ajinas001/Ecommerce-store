
const { configDotenv } = require('dotenv')
const mongoose = require('mongoose')
require('dotenv').config
const connectionString =process.env.connectionString
mongoose.connect.connectionString

const Schema = mongoose.Schema
const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
   

  },
  products: [
    {
      productId: {type:String},
      size: {type:String,default: "M",},
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  // You might want to add more fields like createdAt, updatedAt, etc.
});

const Cartmodel = mongoose.model('Cart', cartSchema);
module.exports = Cartmodel
