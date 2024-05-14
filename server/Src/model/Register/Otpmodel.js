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
    otp:{type:String},
    password:{type:String},
   
})
const Otpmodel = mongoose.model('otp_tb',contactSchema)

module.exports= Otpmodel