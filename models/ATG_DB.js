const mongoose=require('mongoose');

const Schema =new mongoose.Schema({
    // Email,Password,Username
    Username:{
        type:String,
        required:true,
        unique:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Password:{
        type:String,
        required:true,
    },
})

module.exports = mongoose.model('Users',Schema);