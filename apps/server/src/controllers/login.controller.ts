import { type Request, type Response } from "express";
import { Users } from "../models/signupModel.js";
import { checkUser } from "../utils/login/checkUser.js";
import { comparePassword } from "../utils/login/comparePassword.js";
import { jwtSign } from "../utils/token/jwtSign.utils.js";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invaild request data",
      });
    }
    
    const existingUser = await checkUser(email);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const checkPassword = await comparePassword(
      password,
      existingUser.password,
    );
    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Credentials",
      });
    }

    const newToken = await jwtSign(existingUser._id.toString());
    if (!newToken) {
      return res.status(401).json({
        success: false,
        message: "Token Generation Failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Welcome back!\nLogin Successful",
      token: newToken,
      userId: existingUser._id
    });
  } catch (error) {
    console.log("Error in login user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { loginUser };
