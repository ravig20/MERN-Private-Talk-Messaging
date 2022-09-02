const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        trim:true,
        required: [true, "email is required "]
    },
    otp:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now,
        index:{
            expires:300
        }
    }
},
{
    timeStamps:true,
});


const otpModel = mongoose.model("Otp", otpSchema);

module.exports = otpModel;