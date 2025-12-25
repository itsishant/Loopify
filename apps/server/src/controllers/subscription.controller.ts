import { type Request, type Response } from "express";
import type { ISubscription } from "../interface/subscription.interface.js";
import { createSubscriptionData } from "../utils/subscription/createSubcription.utils.js";

const createSubscription = async (
  req: Request<{}, {}, ISubscription>,
  res: Response,
) => {
  try {
    const {
      appName,
      category,
      planType,
      amount,      
      currency,
      paymentMethod,
      autoRenew,
      startDate,
      nextBillingDate,
      remindaerDaysBefore,
    } = req.body;

    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: "Invalid input"
        
          })
    }

    const createdData = await createSubscriptionData(req);
    if (!createdData) {
        return res.status(411).json({
            success: false,
            message: "Unable to create Subscription"
        })
    }

    return res.status(200).json({
        success: true,
        message: "Subscription created successfully",
        data: createdData
    })


  } catch (error) {
    console.log("Error while creating subscription: ", error);
    return res.status(500).json({
      success: false,
      message: "Intermal Server Error",
    });
  }
};

export {
    createSubscription
}
