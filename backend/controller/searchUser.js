const UsersModel = require("../Model/userModel");

exports.searchUsers = async (req, res) => {
  try {
    
    const x = req.query.search;
    const option = x
      ? {
          $or: [{ name: new RegExp(x, "i") }, { email: new RegExp(x, "i") }], 
      }: {};
    const searchUsers = await UsersModel.find(option).find({
      _id: { $ne: req.user._id },
    });

    res.status(200).json({
      success: true,
      message: "user successfully search",
      searchUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      form: "search request from backend",
    });
  }
};
