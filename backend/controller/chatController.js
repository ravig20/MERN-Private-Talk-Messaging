const ChatsModel = require("../Model/chatModel");
const Users = require("../Model/userModel");
const MessageModel = require("../Model/messageModel");
const cloudinary = require("cloudinary");
// http://localhost:4000/api/v1/chat
exports.accessOrCreatingChatData = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId)
      return res.status(400).json({
        success: false,
        message: "userId is not provided",
        from: "from accesses chat error",
      });
    var isChat = await ChatsModel.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users")
      .populate("latestMessage");
    isChat = await Users.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email phone pic",
    });

    if (isChat.length > 0) {
      res.status(200).json({
        success: true,
        message: "chat find successfully chat already exists in database",
        data: isChat[0],
      });
    
      return false;
    } else {
      isChat = {
        chatName: "person-to-person",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
    }
    const chat = await ChatsModel.create(isChat);
    const chatData = await ChatsModel.findOne({ _id: chat._id }).populate(
      "users"
    );
    res.status(201).json({
      success: true,
      message: "creating new chat successfully",
      data: chatData,
    });
  
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      from: "from accesses chat error",
    });
  }
};

exports.fetchChat = async (req, res) => {
  try {
    await ChatsModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users latestMessage groupAdmin")
      .sort({ updateAt: -1 })
      .then(async (result) => {
        result = await Users.populate(result, {
          path: "latestMessage.sender",
          select: "name email phone pic",
        });

        res.status(200).json({
          success: true,
          result,
          from: "fetchChat",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      from: " fetchChat error",
    });
  }
};

exports.creatingGroupChat = async (req, res) => {
  try {
    let { groupName, users, groupPic } = req.body;
    if (!groupName || !users) {
      return res.status(400).json({
        success: false,
        message: "please fill all these fields ",
        from: "creating Group Chat ",
      });
    }
    users = JSON.parse(users);
    users.push(req.user._id);
    if (users.length < 3) {
      return res.status(400).json({
        success: false,
        message: "group chat name must be have at least 2 users",
        from: "fetchChat ",
      });
    }
    const myCloude = await cloudinary.v2.uploader.upload(groupPic, {
      folder: "ChatApp"
    });
    const groupChat = await ChatsModel.create({
      isGroupChat: true,
      chatName: groupName,
      groupPic: {
        public_id: myCloude.public_id,
        url: myCloude.secure_url,
      },
      users: users,
      groupAdmin: req.user._id,
    });

    const fullGroupChats = await ChatsModel.findOne({
      _id: groupChat._id,
    }).populate("users latestMessage groupAdmin");

    res.status(200).json({
      success: true,
      message: "Group Chat created successfully",
      fullGroupChats,
      from: "creating GroupChat ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      from: " creatingGroupChat error",
    });
  }
};

exports.updatingGroup = async (req, res) => {
  try {
    const { chatID, updateName, updateAvatar } = req.body;
    const chatData = await ChatsModel.findOne({ _id: chatID });

    if (!updateName && !updateAvatar) {
      return res.status(400).json({
        success: false,
        message: "what do you want to update",
      });
    }
    // update group name
    if (updateName) {
      if (chatData.chatName == updateName) {
        return res.status(400).json({
          success: true,
          message: "that is a current group name please change your name",
        });
      }
      chatData.chatName = updateName;
    }
  

    if (updateAvatar) {
      const data = await cloudinary.v2.uploader.destroy(chatData.groupPic.public_id);
      const myCloude = await cloudinary.v2.uploader.upload(updateAvatar, {
        folder: "GroupChatAvatar",
      });
      chatData.groupPic.public_id = myCloude.public_id;
      chatData.groupPic.url = myCloude.secure_url;

    }

    await chatData.save();
    res.status(200).json({
      success: true,
      message: `group update successfully `,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      from: " updatingGroup controller error",
    });
  }
};

exports.addUserToGroupChat = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    if (!chatId || !userId) {
      return res.status(400).json({
        success: false,
        message: "some error occur while adding user to group chat",
      });
    }
    const chatData = await ChatsModel.findOne({ _id: chatId });
    const userData = await Users.findOne({ _id: userId });

    if (chatData.users.includes(userId)) {

      return res.status(400).json({
        success: false,
        message: "this user is already in a group",
      });
    };
    chatData.users.push(userId);// or or more users 
    await chatData.save();
    res.status(200).json({
      success: true,
      message: `${userData.name} added to group successfully `,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      from: " updatingGroup controller error",
    });
  }
};

exports.removingUserToGroupChat = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    if (!chatId || !userId) {
      return res.status(400).json({
        success: false,
        message: "some error occur while adding user to group chat",
      });
    }
    const chatData = await ChatsModel.findOne({ _id: chatId });
    const userData = await Users.findOne({ _id: userId });
    if (!chatData.users.includes(userId)) {

      return res.status(400).json({
        success: false,
        message: "this user is not present in a group",
      });
    };
    if (chatData.users.includes(userId)) {
      const index = chatData.users.indexOf(userId);
      chatData.users.splice(index, 1);
      await chatData.save();
      res.status(200).json({
        success: true,
        message: `${userData.name} removed in this group successfully `,
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      from: "removingUserToGroupChat controller error",
    });
  }


};

exports.deleteGroup = async (req, res) => {
  try {
       
    const chatData = await ChatsModel.findById({ _id: req.params.groupId });
    if(!chatData){
      return res.status(400).json({
        success: false,
        message: "group not found "
      });
    }
    
    if (JSON.stringify(chatData.groupAdmin ) !== JSON.stringify(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: "only group admins can delete "
      });
    }
    await cloudinary.v2.uploader.destroy(chatData.groupPic.public_id);
    await chatData.remove();
    res.status(200).json({
      success: true,
      message: "group deleted successfully "
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }

}

exports.deleteChat = async (req, res) => {
  try {
       
    const chatData = await ChatsModel.findById({ _id: req.params.chatId });
    if(!chatData){
      return res.status(400).json({
        success: false,
        message: "chat account not found "
      });
    }
    console.log(chatData, req.params.chatId);
    const Allmessage = await MessageModel.find({ chat: req.params.chatId });
    if(!Allmessage){
      return res.status(400).json({
        success: false,
        message: "message not found "
      });
    }
    for (let i = 0; i < Allmessage.length; i++) {
      const message = MessageModel.findById({ _id:Allmessage[i]._id});
      await message.remove();
  }
  
    await chatData.remove();
    res.status(200).json({
      success: true,
      message: "account  deleted successfully "
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }

}
