import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

import type { IMailer } from "../../interface/mailer.interface.js";
dotenv.config();

const user: IMailer["user"] = process.env.USER_EMAIL || "";
const pass: IMailer["pass"] = process.env.USER_PASS || "";

// Log email config on startup for debugging
console.log("[Mailer] Email config:", {
  user: user ? user.substring(0, 5) + "***" : "NOT SET",
  pass: pass ? "***" : "NOT SET",
});

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
  console.log("[Mailer] Starting to send OTP email to:", toMail);

  if (!user || !pass) {
    console.error("[Mailer] Missing credentials!");
    throw new Error(
      "[Mailer] Email credentials not configured. Set USER_EMAIL and USER_PASS environment variables.",
    );
  }

  try {
    const sendEmail = async () => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: user,
          pass: pass,
        },
        connectionTimeout: 20000, // Increased from 5s to 15s
        socketTimeout: 20000,
        greetingTimeout: 20000,
      });

      console.log("[Mailer] Transporter created, attempting to send...");

      const mailOptions = {
        from: "Loopify",
        to: toMail,
        subject: "OTP Verification",
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
        html: `<b>Your OTP : ${otp}</b><br/><p>Valid till 5 minutes</p>`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("[Mailer] Email sent successfully. Message ID:", info.messageId);
      return info;
    };

    const info = await retryWithBackoff(sendEmail);
    return info;
  } catch (error: any) {
    console.error("[Mailer] FAILED to send OTP:", {
      to: toMail,
      error: error.message,
      code: error.code,
      stack: error.stack,
    });
    throw error;
  }
};

export { mailer };
