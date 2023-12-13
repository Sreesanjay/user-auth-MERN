const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profile : {
        filename : String
    },
    accountStatus:{
        type:Boolean,
        default:true
    }
},{timestamps : true});

//Export the model
module.exports = mongoose.model('User', userSchema);