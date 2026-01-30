import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

import type { IMailer } from "../../interface/mailer.interface.js";
dotenv.config();

const user: IMailer["user"] = process.env.USER_EMAIL || "";
const pass: IMailer["pass"] = process.env.USER_PASS || "";

const mailer = async (toMail: string, otp: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user,
        pass: pass,
      },
    });

    const info = await transporter.sendMail({
      from: "Loopify",
      to: toMail,
      subject: "OTP Verification",
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
      html: `<b>Your OTP : ${otp}</b><br/><p>Valid till 5 minutes</p>`,
    });

    console.log("Message sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export { mailer };
