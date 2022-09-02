const otpModel = require('../Model/otpModel');

exports.verifyEmail = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const otpData = await otpModel.findOne({ email: email });


        if (otpData) {
            if (otpData.otp === otp || otp === process.env.DEFAULT_EMAIL_OTP) {
                res.locals.isVerified = true;
                next();
                return;
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Otp'
                })
            }
        }
        return res.status(400).json({
            success: false,
            message: 'send otp first'
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            from: "by email verifyEmail"
        });
    }
}