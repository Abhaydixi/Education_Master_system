const mongoose = require('mongoose')

//define schema
const SliderSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },

    image:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }

    }

},{timestamps:true})

//creat collection
// slider is the name off collection
//sliderschema is the field of blog collection

const SliderModal = mongoose.model('slider', SliderSchema)

module.exports = SliderModal