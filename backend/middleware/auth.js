const userModel = require('../Model/userModel');
const jwt = require('jsonwebtoken');
exports.isAuthenticate = async function (req, res, next) { 
        try {
            if (!req.cookies.token){
             return res.status(401).json({
                 success: false,
                 message: " please login first"
             })
            }
             const {_id} = await jwt.verify(req.cookies.token ,process.env.JWT_SECRET_KEY);
             
              req.user =  await userModel.findById(_id);
          
             next();
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: "some thing went wrong",
            })
            
        }
   };
