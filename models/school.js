const mongoose = require('mongoose')

//define schema
const SchoolSchema= new mongoose.Schema({
    // title:{
    //     type:String,
    //     required:true
   // },
    image:{
        public_id:{
            type:String
        },
        url:{
            type:String

        }
    }, 
    schoolname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true 
    },
    c_name:{
        type:String,
        required:true
    },
    instruction_medium:{
        type:String,
        required:true

    },
    affiliated_board:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    library:{
        type:String,
        required:true
    },
    india_rank:{
        type:String,
        required:true

    }



},{timestamps:true})


//creat collection
// School is the name off collection
//schoolschema is the field of blog collection





const SchoolModel = mongoose.model('school', SchoolSchema)
module.exports = SchoolModel