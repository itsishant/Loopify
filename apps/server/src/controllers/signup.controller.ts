import { type Request, type Response } from "express";
import type { ISignupData } from "../interface/signup.interface.js";
import { signupZod } from "../utils/zod/signup.js";
import { userCreate } from "../utils/signup/userCreate.utils.js";
import { jwtSign } from "../utils/token/jwtSign.utils.js";
import { passwordHash } from "../utils/password/bcrypt.password.utils.js";
import { checkUserExist } from "../utils/signup/userEmilCheck.utils.js";
import { success } from "zod";
import { getInfo } from "../utils/signup/getUsers.utils.js";
import { deleteUserFunction } from "../utils/signup/deleteUser.utils.js";
import nodemailer from "nodemailer";
import { mailer } from "../utils/services/mailer.js";
const createUser = async (req: Request<{}, {}, ISignupData>, res: Response) => {
  try {
    const { email, password } = req.body;
    const body = signupZod.safeParse(req.body);

    if (!body.success || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
      });
    }

    const bcryptedPassword = await passwordHash(password);
    req.body.password = bcryptedPassword;

    const findEmail = await checkUserExist(email);

    if (findEmail) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    mailer(req.body.email);
    const newUser = await userCreate(req);

    if (!newUser) {
      return res.status(401).json({
        success: false,
        message: "User creation failed",
      });
    }

    const userId = newUser._id.toString();

    const jwtToken = jwtSign(userId);

    if (!jwtToken) {
      return res.status(401).json({
        success: false,
        message: "JWT Token generation failed",
      });
    }

    return res.status(200).json({
      success: true,
      messsage: "User created successfully",
      token: jwtToken,
    });
  } catch (error) {
    console.log("Error while creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const userInfo = await getInfo(userId as any);
    if (!userInfo) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: userInfo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const deletion = await deleteUserFunction(userId as any);

    if (!deletion) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(`Errro in deleting user: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { createUser, getUserInfo, deleteUser };
