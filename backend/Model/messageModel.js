const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
    },
    content:{
        type:String,
        trim:true,
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chats",
    }
},
{
    timeStamps:true,
}

);

const MessagesModel = mongoose.model('Messages',MessagesSchema);
module.exports = MessagesModel;