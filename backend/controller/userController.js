import { userModel } from "../model/userModel.js";
export const getCurrentUser = async (req, res) => {
  try {
    // console.log("req.user from authHandler:", req.user);
    let user = await userModel.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Found Successfully...",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
