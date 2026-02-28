import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

import type { IMailer } from "../../interface/mailer.interface.js";
dotenv.config();

const user: IMailer["user"] = process.env.USER_EMAIL || "";
const pass: IMailer["pass"] = process.env.USER_PASS || "";

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
  nextBillingDate: Date | string,
) => {
  const formattedDate = new Date(nextBillingDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  try {
    const sendEmail = async () => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: user,
          pass: pass,
        },
        connectionTimeout: 15000,
        socketTimeout: 15000,
        greetingTimeout: 10000,
      });

      return await transporter.sendMail({
        from: `Loopify <${user}>`,
        to: toMail,
        subject: `Reminder: Your ${appName} subscription is due in ${reminderDay} day(s)`,
        text: `Hi,\n\nThis is a reminder that your subscription to ${appName} is due on ${formattedDate}.\n\nYou have ${reminderDay} day(s) remaining before your next billing date.\n\nPlease make sure your payment method is up to date to avoid any service interruptions.\n\nRegards,\nLoopify`,
        html: `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #ffffff; color: #333333;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #e0e0e0; border-radius: 4px;">

          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px; border-bottom: 1px solid #e0e0e0;">
              <span style="font-size: 18px; font-weight: bold; color: #111111;">Loopify</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6;">Hi,</p>

              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6;">
                This is a reminder that your subscription to <strong>${appName}</strong> is due in <strong>${reminderDay} day(s)</strong>.
              </p>

              <!-- Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f7f7f7; border-radius: 4px; margin: 24px 0;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #888888; text-transform: uppercase; letter-spacing: 0.5px;">Subscription Details</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #555555; width: 140px;">App / Service</td>
                        <td style="padding: 6px 0; font-size: 14px; color: #111111; font-weight: bold;">${appName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #555555;">Due Date</td>
                        <td style="padding: 6px 0; font-size: 14px; color: #111111; font-weight: bold;">${formattedDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #555555;">Days Remaining</td>
                        <td style="padding: 6px 0; font-size: 14px; color: #111111; font-weight: bold;">${reminderDay} day(s)</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6;">
                Please make sure your payment method is up to date to avoid any service interruptions.
              </p>

              <p style="margin: 0; font-size: 15px; line-height: 1.6;">
                Regards,<br>
                <strong>Loopify</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; font-size: 12px; color: #aaaaaa;">
                You are receiving this email because you set up a reminder for this subscription in Loopify.
                If you did not request this, please ignore this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
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
