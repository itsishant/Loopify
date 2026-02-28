import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";

import type { IMailer } from "../../interface/mailer.interface.js";
dotenv.config();

const user: IMailer["user"] = process.env.USER_EMAIL || "";
const pass: IMailer["pass"] = process.env.USER_PASS || "";

const mailer = async (toMail: string, otp: string) => {
  console.log("[Mailer] Starting to send OTP email to:", toMail);
  console.log("[Mailer] User Email:", user);

  if (!user || !pass) {
    console.error("[Mailer] Missing credentials!");
    throw new Error(
      "[Mailer] Email credentials not configured. Set USER_EMAIL and USER_PASS environment variables.",
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user,
        pass: pass,
      },
      connectionTimeout: 5000,
      socketTimeout: 5000,
    });

    console.log("[Mailer] Transporter created successfully");

    const mailOptions = {
      from: `Loopify <${user}>`,
      to: toMail,
      subject: "🔐 Loopify Account Verification - Your OTP Code",
      text: `Welcome to Loopify!\n\nYou are receiving this email because you recently signed up for a Loopify account.\n\nYour Account Verification Code (OTP):\n${otp}\n\nPlease enter this code to verify your email address and complete your account setup.\n\nImportant:\n- This code is valid for 5 minutes only\n- Do not share this code with anyone\n- If you did not request this verification code, please ignore this email\n\nBest regards,\nThe Loopify Team`,
      html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bg="#f5f5f5">
        <tr>
            <td align="center" padding="20">
                <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header Section -->
                    <tr>
                        <td padding="30" style="text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🔐 Loopify Verification</h1>
                            <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Account Security & Verification</p>
                        </td>
                    </tr>

                    <!-- Content Section -->
                    <tr>
                        <td padding="40" style="text-align: center;">
                            <!-- Welcome Message -->
                            <h2 style="margin: 0 0 15px 0; color: #333333; font-size: 22px; font-weight: 600;">Welcome to Loopify! 👋</h2>
                            <p style="margin: 0 0 25px 0; color: #666666; font-size: 15px; line-height: 1.6;">You're just one step away from verifying your account. Please use the verification code below to complete your signup process.</p>

                            <!-- OTP Code Box -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="25" bgcolor="#f0f4ff" style="border-left: 4px solid #667eea; border-radius: 6px; margin: 25px 0;">
                                <tr>
                                    <td align="center">
                                        <p style="margin: 0 0 15px 0; color: #667eea; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Your Verification Code</p>
                                        <h1 style="margin: 10px 0; color: #667eea; font-size: 48px; font-weight: bold; letter-spacing: 4px; font-family: 'Courier New', monospace; font-family: monospace;">${otp}</h1>
                                        <p style="margin: 10px 0 0 0; color: #999999; font-size: 13px;">Enter this code to verify your email</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Instructions -->
                            <p style="margin: 20px 0 30px 0; color: #333333; font-size: 14px; font-weight: 600;">How to verify your account:</p>
                            <ol style="margin: 0 0 25px 0; padding: 0 0 0 25px; text-align: left; color: #666666;">
                                <li style="margin-bottom: 8px; font-size: 14px;">Go back to the Loopify signup page</li>
                                <li style="margin-bottom: 8px; font-size: 14px;">Enter the code: <strong>${otp}</strong></li>
                                <li style="margin-bottom: 8px; font-size: 14px;">Click 'Verify' to complete your account setup</li>
                            </ol>

                            <!-- Security Information -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="20" bgcolor="#fff9e6" style="border-left: 4px solid #ffc107; border-radius: 6px; margin: 25px 0;">
                                <tr>
                                    <td style="text-align: left;">
                                        <p style="margin: 8px 0; color: #856404; font-size: 13px; font-weight: 500;">⏱️ <strong>Code Expires In:</strong> 5 minutes from when this email was sent</p>
                                        <p style="margin: 8px 0; color: #856404; font-size: 13px; font-weight: 500;">🔒 <strong>Security Tip:</strong> Never share this code with anyone, including Loopify support staff</p>
                                        <p style="margin: 8px 0; color: #856404; font-size: 13px; font-weight: 500;">⚠️ <strong>Didn't Request This?</strong> If you didn't create a Loopify account, please disregard this email</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Footer -->
                            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
                            <p style="margin: 15px 0 5px 0; color: #999999; font-size: 12px;">© 2026 Loopify. All rights reserved.</p>
                            <p style="margin: 5px 0 0 0; color: #999999; font-size: 12px;">If you have any questions, contact our support team.</p>
                        </td>
                    </tr>

                    <!-- Bottom Section -->
                    <tr>
                        <td padding="20" style="text-align: center; background-color: #f9f9f9; border-top: 1px solid #eeeeee; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0; color: #999999; font-size: 11px;">This is an automated message. Please do not reply to this email.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
    };

    console.log("[Mailer] Mail options:", { from: mailOptions.from, to: mailOptions.to, subject: mailOptions.subject });
    console.log("[Mailer] Attempting to send email...");

    const info = await transporter.sendMail(mailOptions);
    console.log(
      "[Mailer] Email sent successfully. Message ID:",
      info.messageId,
    );
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
