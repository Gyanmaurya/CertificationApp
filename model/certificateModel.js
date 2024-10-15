const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
        certificateName:{
          type:String,
          required:[true, 'please put the name of certificate']
        },
        overViews:{type:String},
        issuer:{type:String, required:[true, 'please put the issure']},
        startDate:{type: Date, required:[true, 'please enter the start date']},
        duration:{type:String, required:[true, 'please put the issure']},
        status:{type:String, enum:["draft", "publish"], defult:'draft'},
        endDate:{type:Date},
        user:[{userId:{type:mongoose.Schema.Types.ObjectId, ref:'USER'}}],
        createAt:{type:Date, defult: Date.now()}

})

const Certificate = mongoose.model('certificates', certificateSchema);
module.exports = Certificate;