const express = require("express");
const {
  accessOrCreatingChatData,
  fetchChat,
  creatingGroupChat,
  updatingGroup,
  addUserToGroupChat,
  removingUserToGroupChat,
  deleteGroup,
  deleteChat,
} = require("../controller/chatController");
const router = express.Router();
const { isAuthenticate } = require("../middleware/auth");
// peer to peer not group
router.route("/").get(isAuthenticate, fetchChat);
router.route("/").post(isAuthenticate, accessOrCreatingChatData);
// group routes
router.route("/group").post(isAuthenticate, creatingGroupChat);
router.route("/group/update").put(isAuthenticate, updatingGroup);
router.route("/adding/group").put(isAuthenticate, addUserToGroupChat);
router.route("/removing/group").put(isAuthenticate, removingUserToGroupChat);
router.route("/delete/group/:groupId").delete(isAuthenticate, deleteGroup);
router.route("/delete/chat/:chatId").delete(isAuthenticate, deleteChat);

// router.route("/").put(isAuthenticate,addi ngFromGroupChat);

module.exports = router;
