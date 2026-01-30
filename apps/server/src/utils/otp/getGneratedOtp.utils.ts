import { type Request, type Response } from "express";
import { Users } from "../../models/signupModel.js";

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: "User ID and OTP are required",
      });
    }

    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    await Users.findByIdAndUpdate(userId, { otp: null });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      email: user.email,
    });
  } catch (error) {
    console.log(`Error in OTP verification: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
