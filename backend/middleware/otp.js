const otpGenerator = require('otp-generator')
const otpModel = require('../Model/otpModel');
const userModel = require('../Model/userModel');


exports.creatOtp = async (req, res , next) => {
    try {
        let {email, phone} = req.body;
        let otpData = await otpModel.findOne({email:email});
        let user = await userModel.findOne({email:email});
        let number = await userModel.findOne({phone:phone});
        if(user){
            return res.status(400).json({
                success: false, 
                message:"account already exists in this email"
            });
        }
        if(number){
            return res.status(400).json({
                success: false, 
                message:"account already exists in this number"
            });
        }
        if(otpData){
            return res.status(400).json({
                success: false, 
                message:"otp already generated check your mail or singUp again after 5 minutes"
            });
        }
        const otp = otpGenerator.generate(6, { lowerCaseAlphabets:false ,upperCaseAlphabets: false, specialChars: false,digits: true });
        otpData = await otpModel.create({
            email,
            otp
        });
     
        res.locals.otp = otpData.otp;

        next()
    
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            from: " creat otp  error"
        });
    }
}




exports.createForgetPasswordOtp = async (req, res , next) => {
    try {
        let {email} = req.body;
        let otpData = await otpModel.findOne({email:email});
        let user = await userModel.findOne({email:email});
        if(!user){
            return res.status(400).json({
                success: false, 
                message:`${email} this email is invalid no entry found in the database` 
            });
        }
        if(otpData){
            return res.status(400).json({
                success: false, 
                message:"otp already generated check your mail or forgot password again after 5 minutes later"
            });
        }
        const otp = otpGenerator.generate(6, { lowerCaseAlphabets:false ,upperCaseAlphabets: false, specialChars: false,digits: true });
        otpData = await otpModel.create({
            email,
            otp
        });
     
        res.locals.otp = otpData.otp;

        next()
    
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            from: " forgetPassword otp failed  error"
        });
    }
}