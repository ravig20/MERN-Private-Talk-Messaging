const express = require('express');
const {   sendMessageData, fatchChatMessagesData } = require('../controller/messageControlar');
const { isAuthenticate } = require('../middleware/auth');

const router =  express.Router();

router.route("/").post(isAuthenticate, sendMessageData );
router.route("/:chatId").get(isAuthenticate, fatchChatMessagesData); 


module.exports = router;