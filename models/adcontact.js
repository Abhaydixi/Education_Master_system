const mongoose = require('mongoose');

//define schema

const AdcontactSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    }

},{timestamps:true})

//creat collection
const AdcontactModel = mongoose.model('adcontact', AdcontactSchema)
module.exports = AdcontactModel;