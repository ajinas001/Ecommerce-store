const {configDotenv} = require('dotenv')
const mongoose = require('mongoose')
const { schema } = require('../Register/Registermodel')

require('dotenv').config
const connectionString = process.env.connectionString
mongoose.connect.connectionString


const Schema = mongoose.Schema

const productschema = new Schema ({
    Name:{type:String},
    Price:{type:String},
    Size:{type:String},
    Stock:{type:String},
    Discount:{type:String},
    Category:{type:String},
    images:{type:Array},
})

const productmodel = mongoose.model('producttb',productschema)
module.exports= productmodel