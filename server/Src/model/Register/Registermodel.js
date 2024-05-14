const { configDotenv } = require('dotenv')
const mongoose = require('mongoose')
require('dotenv').config
const connectionString =process.env.connectionString
mongoose.connect.connectionString

const Schema = mongoose.Schema
const contactSchema = new Schema({
   
    name:{type:String},
    email:{type:String},
    phone:{type:String},
    password:{type:String},
    logintype:{type:String},
    cart:{type:Array},
    wishlist:{type:Array},
    role:{type:Number},
    status:{type:String},
   
})
const Registermodel = mongoose.model('register_tb',contactSchema)

module.exports= Registermodel