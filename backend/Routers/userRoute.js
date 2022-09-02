const express = require('express');

const { searchUsers } = require('../controller/searchUser');
const { register, login, logout, myData,ForgetPassword, UpdatePassword, updateProfile, createStarVerification } = require('../controller/usercontroller');
const { isAuthenticate } = require('../middleware/auth');
const { sendMailTouser } = require('../middleware/email');
const { creatOtp, createForgetPasswordOtp } = require('../middleware/otp');
const { verifyEmail } = require('../middleware/verifyEmail');
const router = express.Router();


// registration 
router.route("/sendemail").post(creatOtp,sendMailTouser);
router.route("/register").post(verifyEmail,register);
router.route("/login").post(login);
router.route("/search").get(isAuthenticate,searchUsers);
router.route("/logout").get(isAuthenticate,logout);
router.route("/me").get(isAuthenticate,myData);

// send otp
router.route("/sendotpmail").post(createForgetPasswordOtp,sendMailTouser);
// verifyEmail and forgetPassword
router.route("/forgetPassword").put(verifyEmail, ForgetPassword);

router.route("/updatePassword").put(isAuthenticate, UpdatePassword);
router.route("/updateProfile").put(isAuthenticate, updateProfile);
router.route("/createStar").put(isAuthenticate, createStarVerification);

router.route("/mailMe").post(sendMailTouser)
module.exports = router;