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
    const userId = req.params.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const reminderTargetStart = new Date(today);
    reminderTargetStart.setDate(reminderTargetStart.getDate() + 14);
    const reminderTargetEnd = new Date(reminderTargetStart);
    reminderTargetEnd.setDate(reminderTargetEnd.getDate() + 1);

    const dueSubscriptions = await Subscription.find({
      userId: userId,
      reminderDaysBefore: 14,
      status: "Active",
      "datesDetails.nextBillingDate": {
        $gte: reminderTargetStart,
        $lt: reminderTargetEnd,
      },
    });

    if (!dueSubscriptions || dueSubscriptions.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No subscriptions due for 14 day reminder today",
      });
    }

    const userMail = await Users.findById(userId).select("email");

    if (!userMail || !userMail.email) {
      return res.status(404).json({
        success: false,
        message: "User email not found",
      });
    }

    for (const sub of dueSubscriptions) {
      await reminderMail(
        userMail.email,
        "14",
        (sub as any).subscriptionDetails.appName,
        (sub as any).datesDetails.nextBillingDate,
      );
    }

    return res.status(200).json({
      success: true,
      message: `14 day reminder email(s) sent for ${dueSubscriptions.length} subscription(s)`,
    });
  } catch (error) {
    console.log(`Error while sending 14 day mail: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
