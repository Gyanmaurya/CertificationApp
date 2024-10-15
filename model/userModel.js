const mongoose = require('mongoose');

const userSchema  =  new mongoose.Schema({
     name:{type: String, required:[true, 'please write name of user']},
     email:{type:String, required:[true,'please enter the email']},
     password:{type:String, required:true},
     active:{type:Boolean, default:true},
})


const USER = mongoose.model('users', userSchema);