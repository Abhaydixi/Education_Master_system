const mongoose = require('mongoose')


const url ="mongodb://127.0.0.1:27017/education_master_system"
const live_url ="mongodb+srv://dixitabhay633:ram123@cluster0.plszbvy.mongodb.net/education123?retryWrites=true&w=majority"


const connectDb =()=>{
    return mongoose.connect(live_url)



    .then(()=>{
        console.log("Database connected...")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports = connectDb