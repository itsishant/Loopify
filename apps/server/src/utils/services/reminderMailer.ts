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
        `[Reminder Email] Attempt ${attempt}/${maxRetries} failed. Retrying in ${delay}ms...`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

const reminderMail = async (
  toMail: string,
  reminderDay: string,
  appName: string,
) => {
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
        from: "Loopify <no-reply@loopify.com>",
        to: toMail,
        subject: "Reminder Notification",
        text: `This is a reminder for your subscription to ${appName} due in ${reminderDay} day(s).`,
        html: `<b>Reminder:</b> Your subscription to ${appName} is due in ${reminderDay} day(s).`,
      });
    };

    const info = await retryWithBackoff(sendEmail);
    console.log("Message sent:", info.messageId);
    return info;
  } catch (error: any) {
    console.error("[Reminder Email] Failed after retries:", {
      to: toMail,
      appName: appName,
      error: error.message,
      code: error.code,
    });
    throw error;
  }
};

export { reminderMail };
