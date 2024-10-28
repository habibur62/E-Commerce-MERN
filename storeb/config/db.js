const mongoose = require('mongoose')

async function connectDB(){
    try{
        mongoose.connect(process.env.MONGODB_URL)
        console.log("db is connected")
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB