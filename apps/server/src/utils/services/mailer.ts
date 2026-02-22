import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

import type { IMailer } from "../../interface/mailer.interface.js";
dotenv.config();

const user: IMailer["user"] = process.env.USER_EMAIL || "";
const pass: IMailer["pass"] = process.env.USER_PASS || "";

// Retry with exponential backoff for transient errors like ETIMEDOUT
const retryWithBackoff = async (
  fn: () => Promise<any>,
  maxRetries: number = 3,
  baseDelay: number = 2000,
): Promise<any> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      const isTransientError =
        error.code === "ETIMEDOUT" ||
        error.code === "ECONNRESET" ||
        error.code === "EHOSTUNREACH" ||
        error.message?.includes("ETIMEDOUT");

      if (!isTransientError || attempt === maxRetries) {
        throw error;
      }

      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.warn(
        `[OTP Email] Attempt ${attempt}/${maxRetries} failed. Retrying in ${delay}ms...`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

const mailer = async (toMail: string, otp: string) => {
  try {
    const sendEmail = async () => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: user,
          pass: pass,
        },
        connectionTimeout: 15000, // Increased from 5s to 15s
        socketTimeout: 15000,
        greetingTimeout: 10000,
      });

      return await transporter.sendMail({
        from: "Loopify",
        to: toMail,
        subject: "OTP Verification",
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
        html: `<b>Your OTP : ${otp}</b><br/><p>Valid till 5 minutes</p>`,
      });
    };

    const info = await retryWithBackoff(sendEmail);
    console.log("Message sent:", info.messageId);
    return info;
  } catch (error: any) {
    console.error("[OTP Email] Failed after retries:", {
      to: toMail,
      error: error.message,
      code: error.code,
    });
    throw error;
  }
};

export { mailer };
