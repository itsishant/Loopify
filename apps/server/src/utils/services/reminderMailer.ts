import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

import type { IMailer } from "../../interface/mailer.interface.js";
dotenv.config();

const user: IMailer["user"] = process.env.USER_EMAIL || "";
const pass: IMailer["pass"] = process.env.USER_PASS || "";

const reminderMail = async (
  toMail: string,
  reminderDay: string,
  appName: string,
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user,
        pass: pass,
      },
      connectionTimeout: 5000, // 5 second timeout
      socketTimeout: 5000,
    });

    const info = await transporter.sendMail({
      from: "Loopify <no-reply@loopify.com>",
      to: toMail,
      subject: "Reminder Notification",
      text: `This is a reminder for your subscription to ${appName} due in ${reminderDay} day(s).`,
      html: `<b>Reminder:</b> Your subscription to ${appName} is due in ${reminderDay} day(s).`,
    });

    console.log("Message sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export { reminderMail };
