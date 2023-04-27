const mongoose = require('mongoose')

//define Schema
const CategarySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    cityimage:{
        public_id:{
            type:String
        },
        url:{
            type:String

        }
    }
},{timestamps:true})

//creat collection
// Categary is the name off collection
//categaryschema is the field of blog collection


const CategaryModel = mongoose.model('categary',CategarySchema)
module.exports = CategaryModel
