const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
    chatName: {
        type: String,
        trim: true, // removing each side of spaces 
    },
    groupPic:{
        public_id: String,
        url: String,   
    },
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",

        }
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
    },
    isStar:{
        type: Boolean,
        default: false,
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
}, {
    timestamps: true,
}
);


const ChatsModel = mongoose.model("Chats", chatSchema);
module.exports = ChatsModel;