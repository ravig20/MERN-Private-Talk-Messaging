const UsersModel = require('../Model/userModel');
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.register = async (req, res) => {
    try {
        const { pic, name, phone, email, password } = req.body;
        const{isVerified} = res.locals;
        if(!name || !phone || !email || !password){
            return res.status(400).json({
                success: false,
                message: "please enter your all the felids",
            });
        }
        let user = await UsersModel.findOne({ email: email });
        let userPhone = await UsersModel.findOne({ phone: phone });
     
        if (user) {
            return res.status(400).json({
                success: false,
                message: "you are email already registered please try another email id",
            });
        };
        if (userPhone) {
            return res.status(400).json({
                success: false,
                message: "your number is already registered please try another mobile number ",
            });
        };
        if(isVerified === false){
            return res.status(400).json({
                success: false,
                message: "otp is invalid or not authorized",
            });
        }
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
      
        const myCloude =  await cloudinary.v2.uploader.upload(pic,{
                folder:"ChatApp"
              });
       
        user = await UsersModel.create({
            name,
            phone,
            email,
            password,
            pic:{
                public_id: myCloude.public_id ,
                url: myCloude.secure_url  ,
              },

        });
        function generateToken() {
            return jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
        };
        const token = generateToken();

        res.status(201).cookie(`token`, token, options).json({
            success: true,
            message: "Congratulations successfully signup",
            token,
            user,
        });
    } catch (error) {
      
        res.status(500).json({
            success: false,
            message: error,
            from: " register MyProfile  error"
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, phone, password } = req.body;
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
     
        let user;
        if (email) {
            user = await UsersModel.findOne({ email: email }).select("+password");
        };
        if (phone) {
            user =  await UsersModel.findOne({ phone: phone }).select("+password");
        };
        if (!user) {
            return res.status(400).json({
                email,
                password,
                success: false,
                message: "User dose not exists in database please create account first",
            });
        }

        let isPassword = await bcrypt.compare(password, user.password); // true or false

        if (!isPassword) {
            return res.status(400).json({
                success: false,
                message: "Password does not match please retry again or forget the Password",
            });
        }
        function generateToken() {
            return jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
          }
          const token = generateToken();
          
        res.status(200).cookie(`token`, token, options).json({
            success: true,
            message: " Login successfully Welcome to Private Talk",
            token,
            user,
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            from: " login MyProfile  error"
        });
    }

};

exports.logout = async (req, res) =>{
    try {
        const options = {
          expires: new Date(Date.now()),
          httpOnly: true,
        };
        res.status(200).cookie(`token`, null, options).json({
          success: true,
          message: "Logout successfully",
    
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
};


exports.myData = async (req, res) => {
    try {
        const data = await UsersModel.findById(req.user._id);
        if(!req.user._id){
        return  res.status(400).json({
            success: true,
            message:"plaese login first",
            from: "myData",
          });
        }
          res.status(200).json({
            success: true,
            data,
            from: "myData",
          });
        
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        from: " myData error",
      });
    }
  };
  // check
exports.updateProfile = async (req, res) => {
    try {

      const {  updateName, updateAvatar , updatePhone, updateCaption } = req.body;

      const userData = await UsersModel.findById(req.user._id );
      
      if (!updateName && !updateAvatar &&  !updatePhone && !updateCaption ) {
        return res.status(400).json({
          success: false,
          message: "what do you want to update",
        });
      };
      // update group name
      
      if (updateName) {
        userData.name = updateName;
      };

      if (updatePhone) {
      
        
        if(userData.phone === Number(updatePhone)){
          return res.status(400).json({
            success: false,
            message: "number already exists",
          });
        };

       const num = updatePhone.split("");

       if(num.length == 10) {

          userData.phone = updatePhone;

       }else{
        res.status(400).json({
          success: true,
          message: `phone number ${updatePhone} not valid`,
        });
      }
      };
      if (updateCaption) {
        userData.caption = updateCaption;
      };
      if (updateAvatar) {
         await cloudinary.v2.uploader.destroy(userData?.pic.public_id);
         const myCloude =  await cloudinary.v2.uploader.upload(updateAvatar,{
            folder:"ChatApp"
          });
   
          userData.pic.public_id = myCloude.public_id;
          userData.pic.url = myCloude.secure_url;
      };
  
      await userData.save();
      res.status(200).json({
        success: true,
        message: ` profile update successfully `,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        from: " updating user controller error",
      });
    }
  };
// update password
exports.UpdatePassword = async function (req, res) {
    try {
     
      const { oldPasswords, newPasswords, confirmPassword } = req.body;
      if (!oldPasswords || !newPasswords || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "please provide a field ",
          from: "forgetPassword",
        });
      }
  
      const user = await UsersModel.findById(req.user._id).select("+password");
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "some thing went wrong",
          from: "forgetPassword",
        });
      };
      if (user._id === req.user._id) {
        return res.status(401).json({
          success: false,
          message: " Not Authorized",
          from: "forgetPassword",
        });
      }

      let isPassword = await bcrypt.compare(oldPasswords, user.password);
  
      if (!isPassword) {
        return res.status(400).json({
          success: false,
          message: "OldPasswords do not match",
        });
      }
      if (newPasswords !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: " newPasswords or confirmPassword must be same",
        });
      }
      user.password = newPasswords;
      await user.save();
      res.status(200).json({
        success: true,
        message: "your password has been updated",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        from: "updated password",
      });
    }
  };


	exports.ForgetPassword = async function (req, res) {
    try {
      const {email, newPasswords, confirmPassword} = req.body;
      const {isVerified} = res.locals;
     
      const user = await UsersModel.findOne({email}).select("+password");

      if(newPasswords.toString() !== confirmPassword.toString()){
        return res.status(400).json({
          success: false,
          message: "Passwords or  confirmPassword dose not match",
      });
      }
      if (isVerified === true) {
        user.password = newPasswords;
        await user.save();
        return  res.status(200).json({
          success: true,
          message:"password was updated successfully",
        });
      };
      res.status(400).json({
        success: true,
        message:"something went wrong please try again "
      });
      
      
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        from: " forget Password error",
      });
    }
  };


  exports.createStarVerification = async function (req, res){
    try {

        const {email, isTrue} = req.body;

        if(!email){
          return res.status(400).json({
            success: false,
            message: "email must be provided"
        });
      };

      const userData = await UsersModel.findOne({email});

  

        if(!userData){
          return res.status(400).json({
            success: false,
            message: "no account exists for this email address"
        });
      };

      userData.isStar = isTrue;

      await userData.save();
       res.status(200).json({
        success: true,
        message: "update done successfully"
    });
    } catch (error) {
       res.status(500).json({
        success: false,
        message: ` ${error} createStarVerification `,
    });
    
  }
}