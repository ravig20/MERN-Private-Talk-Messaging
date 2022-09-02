const nodemailer = require("nodemailer");
exports.sendMailTouser = async (req, res) => {
    const { email, name, message } = req.body;
    const { otp } = res.locals;

    let transporter = await nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        secure: false, // true for 465, false for other ports
        // requireTLS: true,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD, // generated ethereal password
        },
        service: process.env.SMPT_SERVICE,
    });

    let mailOptions;

    if (name || message) {
        console.log("running")
        mailOptions = {
            from: process.env.SMPT_MAIL, // email sender
            to: process.env.SMPT_MAIL, // email receivers
            subject: ` PRIVATE TALK : help request by ${email}   `, // Subject line => options.subject
            text: `mail from ${name} and message ${message}`, // plain text body =>options.message
        };
    } else {
        mailOptions = {
            from: process.env.SMPT_MAIL, // email sender
            to: email, // email receivers
            subject: ` PRIVATE TALK : welcome to private talk   `, // Subject line => options.subject
            text: `this is a system generated mail, if you have any query please mail me enjoy your day and thankyou for joining private talk your OTP is ${otp}`, // plain text body =>options.message
        };
    }

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions, (error, info) => {

        if (name || message) {
            if (info.accepted.length > 0) {
                res.status(200).json({
                    success: "true",
                    message: `message received `,
                });
                return false;
            }
        };

        if (info.accepted.length > 0) {
            res.status(200).json({
                success: "true",
                message: `otp send successfully to this mail ${email}`,
            });
        }
        if (error) {
            return res.status(500).json({
                success: "false",
                message: error,
            });
        }

    }
    );
}
