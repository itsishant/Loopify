import type { Request, Response } from "express";
import { Users } from "../../models/signupModel.js";
import { jwtSign } from "../../utils/token/jwtSign.utils.js";

// This endpoint receives Google user data from NextAuth.js
const googleSignIn = async (req: Request, res: Response) => {
  try {
    console.log("========== GOOGLE SIGN-IN FROM NEXTAUTH START ==========");
    console.log("📨 Request body:", JSON.stringify(req.body, null, 2));

    const { email, googleId, name } = req.body;

    if (!email || !googleId) {
      console.log("❌ Email or googleId missing");
      console.log("Email:", email, "GoogleId:", googleId);
      return res.status(400).json({
        success: false,
        message: "Email and googleId are required",
      });
    }

    console.log(
      `✅ Received Google data - Email: ${email}, GoogleId: ${googleId}, Name: ${name}`,
    );

    // Find or create user
    console.log("🔍 Searching for user with googleId:", googleId);
    let user = await Users.findOne({ googleId });

    if (!user) {
      console.log("🔄 User not found. Creating new user...");
      console.log(
        "Creating user with: { googleId:",
        googleId,
        ", email:",
        email,
        "}",
      );

      user = await Users.create({
        googleId,
        email,
      });
      console.log(`✅ User created! ID: ${user._id}, Email: ${user.email}`);
    } else {
      console.log(`✅ User found! ID: ${user._id}, Email: ${user.email}`);
    }

    // Generate JWT token
    const jwtToken = jwtSign(user._id.toString());
    if (!jwtToken) {
      console.log("❌ JWT token generation failed");
      return res.status(401).json({
        success: false,
        message: "JWT Token generation failed",
      });
    }

    console.log("✅ JWT token generated");
    console.log("========== GOOGLE SIGN-IN FROM NEXTAUTH END ==========");

    return res.status(200).json({
      success: true,
      message: "Google sign-in successful",
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        googleId: user.googleId,
      },
    });
  } catch (error) {
    console.error("❌ Error during Google sign-in:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export { googleSignIn };
