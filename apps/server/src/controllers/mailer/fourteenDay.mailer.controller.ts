import { type Request, type Response } from "express";
import { Subscription } from "../../models/subscription.model.js";
import { reminderMail } from "../../utils/services/reminderMailer.js";
import { Users } from "../../models/signupModel.js";
import type { IReminderMail } from "../../interface/reminderMail.interface.js";
import type { params } from "../../types/subcription.type.js";

export const FourteenDayMail = async (
  req: Request<params, {}, IReminderMail>,
  res: Response,
) => {
  try {
    const id = req.params.id;

    const reminderDays = await Subscription.find({
      reminderDaysBefore: 14,
      status: "Active",
      "subscriptionDetails.appName": { $exists: true },
    });

    if (!reminderDays || reminderDays.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subscriptions found with 14 day reminder",
      });
    }

    const name = reminderDays.map(
      (subscription: any) => subscription.subscriptionDetails.appName,
    );

    const userMail = await Users.findById(id).select("email");

    if (!userMail || !userMail.email) {
      return res.status(404).json({
        success: false,
        message: "User email not found",
      });
    }

    reminderMail(userMail.email, "14", name[0]);

    return res.status(200).json({
      success: true,
      message: "14 day reminder mail sent successfully",
    });
  } catch (error) {
    console.log(`Error while sending 14 day mail: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
