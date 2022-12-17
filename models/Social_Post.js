const mongoose=require('mongoose');

const Schema =new mongoose.Schema({
    // Email,Password,Username
    Username:{
        type:String,
        required:true,
    },
    Image:{
        type:String,
        required:true,
    },
    Caption:{
        type:String,
    },
    Likes:{
        type:Array,
    },
    Comments:{
        type:Array,
    }
})

module.exports = mongoose.model('Social_Post',Schema);