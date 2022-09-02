const MessagesModel = require("../Model/messageModel");
const ChatsModel = require("../Model/chatModel");
const Users = require("../Model/userModel");

exports.sendMessageData = async (req, res) => {
    try {

        const { content, chatId } = req.body;

        if(!content || !chatId){
            return res.status(400).json({
                success: false,
            message: "something went wrong",
            from: " CreateChatData   error"
            });
        };

        let message = await MessagesModel.create({
            content,
            chat:chatId,
            sender:req.user._id,
        });
        

        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
      
        message = await Users.populate(message,{
                path:"chat.users",
                select:"name pic email",
        });
      


     const chatModeldata  = await ChatsModel.findByIdAndUpdate(chatId,{
        latestMessage:message
     }
     );

        res.status(200).send(message);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
            from: " CreateChatData  error"
        });
    }
}
exports.fatchChatMessagesData = async (req, res) => {
    try {   
               
                if(! req.params.chatId){
                  return  res.status(400).json({
                        success: false,
                        message: "something went wrong",
                        from: " fatchChatMessagesData  error"
                    });
                }
            const message = await MessagesModel.find({
                chat: req.params.chatId
            }).populate("sender", "name pic").populate("chat");
        
            res.status(200).send(message);
    } catch (error) {
      
        res.status(500).json({
            success: false,
            message: error,
            from: " fatchChatMessagesData  error"
        });
    }
}