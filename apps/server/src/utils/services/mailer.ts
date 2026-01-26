import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

import type { IMailer } from "../../interface/mailer.interface.js";
dotenv.config();

const user: IMailer["user"] = process.env.USER_EMAIL || "";
const pass: IMailer["pass"] = process.env.USER_PASS || "";

const mailer = async (toMail: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass,
    },
  });

  (async () => {
    const info = await transporter.sendMail({
      from: "Ram Ram ji ",
      to: toMail,
      subject: "Ghee Khatam ✔",
      text: "Ghee khatam ?" ,
      html: "<b>Khel Khatam?</b>",
    });

    console.log("Message sent:", info.messageId);
  })();
};

export { mailer };
