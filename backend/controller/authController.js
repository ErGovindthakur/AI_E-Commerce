import { genToken } from "../config/genToken.js";
import { userModel } from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. field validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await userModel.findOne({ email });

    // 2. checking for existing user
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User all ready exists, login now...",
      });
    }

    // 3. Email validation

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Enter the valid Email",
      });
    }

    // 4. password validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Enter strong password must be greater than 7 digit",
      });
    }

    // 5. Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await genToken(user._id);

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true only in prod
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "User Registered Successfully...",
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. field validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. checking for existing user
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found, register now...",
      });
    }

    // 3. checking for correct password
    const isMatchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isMatchedPassword) {
      return res.status(403).json({
        success: false,
        message: "Invalid Credentials...",
      });
    }

    const token = await genToken(existingUser._id);

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true only in prod
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "User Login Successfully...",
        name: existingUser.name,
        email: existingUser.email,
        id: existingUser._id,
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json({
      success: true,
      message: "User LoggedOut Successfully...",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const googleLogin = async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        name,
        email,
        isGoogleUser: true,
      });
    }

    const token = await genToken(user._id);

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true only in prod
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Google Login Successfully...",
        name: user.name,
        email: user.email,
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
