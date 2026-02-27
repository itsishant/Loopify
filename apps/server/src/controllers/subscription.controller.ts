import { type Request, type Response } from "express";
import mongoose from "mongoose";
import type { ISubscription } from "../interface/subscription.interface.js";
import { createSubscriptionData } from "../utils/subscription/createSubcription.utils.js";
import { getSubscriptionId } from "../utils/subscription/getSubscription.utils.js";
import type { params } from "../types/subcription.type.js";
import { update } from "../utils/subscription/updateSubcripton.utils.js";
import { deletion } from "../utils/subscription/deleteSubcription.utils.js";

interface Sub {
  appName: string;

  category:
    | "Productivity"
    | "Education"
    | "Entertainment"
    | "Utility"
    | "Other";
  planType: "Monthly" | "Yearly" | "Free" | "Trial";
  amount: number;
  currency: string;
  paymentMethod: "Credit Card" | "Debit Card" | "PayPal" | "Upi" | "Other";
  autoRenew: boolean;
  startDate: Date;
  nextBillingDate: Date;
  reminderDaysBefore: 1 | 3 | 7 | 14 | 30;
}
``;

const createSubscriptionWeb = async (
  req: Request<{}, {}, Sub>,
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
      reminderDaysBefore,
    } = req.body;

    const missingFields: string[] = [];

    if (!appName) missingFields.push("appName");
    if (!category) missingFields.push("category");
    if (!planType) missingFields.push("planType");
    if (amount === undefined || amount === null || Number.isNaN(amount)) {
      missingFields.push("amount");
    }
    if (!currency) missingFields.push("currency");
    if (!paymentMethod) missingFields.push("paymentMethod");
    if (autoRenew === undefined) missingFields.push("autoRenew");
    if (!startDate) missingFields.push("startDate");
    if (!nextBillingDate) missingFields.push("nextBillingDate");
    if (
      reminderDaysBefore === undefined ||
      reminderDaysBefore === null ||
      Number.isNaN(reminderDaysBefore)
    ) {
      missingFields.push("reminderDaysBefore");
    }

    if (missingFields.length > 0) {
      console.log("Invalid input: Missing required fields", req.body);
      return res.status(400).json({
        success: false,
        message: `Invalid input. Missing/invalid fields: ${missingFields.join(", ")}`,
      });
    }

    if (![1, 3, 7, 14, 30].includes(Number(reminderDaysBefore))) {
      return res.status(400).json({
        success: false,
        message: "Invalid reminderDaysBefore. Allowed values: 1, 3, 7, 14, 30",
      });
    }

    if (
      ![
        "Productivity",
        "Education",
        "Entertainment",
        "Utility",
        "Other",
      ].includes(category)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid category. Allowed values: Productivity, Education, Entertainment, Utility, Other",
      });
    }

    if (!["Monthly", "Yearly", "Free", "Trial"].includes(planType)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid planType. Allowed values: Monthly, Yearly, Free, Trial",
      });
    }

    if (
      !["Credit Card", "Debit Card", "PayPal", "Upi", "Other"].includes(
        paymentMethod,
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid paymentMethod. Allowed values: Credit Card, Debit Card, PayPal, Upi, Other",
      });
    }

    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated",
      });
    }

    const transformedData = {
      userId: new mongoose.Types.ObjectId(userId),
      subscriptionDetails: {
        appName,
        category,
        planType,
      },
      billingDetails: {
        amount,
        currency,
        paymentMethod,
        autoRenew,
      },
      datesDetails: {
        startDate,
        nextBillingDate,
      },
      reminderDaysBefore,
      status: "Active",
    };

    const createdData = await createSubscriptionData(transformedData);
    console.log("created");
    if (!createdData) {
      console.log("Failed to create subscription");
      return res.status(400).json({
        success: false,
        message: "Unable to create Subscription",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subscription created successfully",
      data: createdData,
    });
  } catch (error) {
    console.log("Error while creating subscription: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const createSubscription = async (
  req: Request<{}, {}, ISubscription>,
  res: Response,
) => {
  try {
    const {
      subscriptionDetails,
      billingDetails,
      datesDetails,
      reminderDaysBefore,
      status,
    } = req.body;

    if (!subscriptionDetails || !billingDetails || !datesDetails) {
      return res.status(400).json({
        success: false,
        message: "Invalid input: Missing required nested objects",
      });
    }

    const { appName, category, planType } = subscriptionDetails;
    const { amount, currency, paymentMethod, autoRenew } = billingDetails;
    const { startDate, nextBillingDate } = datesDetails;

    if (
      !appName ||
      !category ||
      !planType ||
      !amount ||
      !currency ||
      !paymentMethod ||
      autoRenew === undefined ||
      !startDate ||
      !nextBillingDate ||
      reminderDaysBefore === undefined ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input: Missing required fields",
      });
    }

    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated",
      });
    }

    const transformedData = {
      userId,
      subscriptionDetails: {
        appName,
        category,
        planType,
      },
      billingDetails: {
        amount: typeof amount === "string" ? parseFloat(amount) : amount,
        currency,
        paymentMethod,
        autoRenew,
      },
      datesDetails: {
        startDate: new Date(startDate),
        nextBillingDate: new Date(nextBillingDate),
      },
      reminderDaysBefore,
      status,
    };

    const createdData = await createSubscriptionData(transformedData);

    if (!createdData) {
      console.log("Failed to create subscription");
      return res.status(400).json({
        success: false,
        message: "Unable to create Subscription",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subscription created successfully",
      data: createdData,
    });
  } catch (error) {
    console.log("Error while creating subscription: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getSubscription = async (
  req: Request<params, {}, ISubscription>,
  res: Response,
) => {
  try {
    const userId = req.params.userId;

    const subscription = await getSubscriptionId(userId);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "No any subscription found with this id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subscription fetched successfully",
      data: { subscription },
    });
  } catch (error) {
    console.log(`Error while getting subscription ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateSubscription = async (
  req: Request<params, {}, ISubscription>,
  res: Response,
) => {
  try {
    const id = req.params.id;

    const subscriptonData = await update(id, req);
    if (!subscriptonData) {
      return res.status(404).json({
        success: false,
        message: "No any subcription founnd with this id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subscription Details updated successfully",
      data: subscriptonData,
    });
  } catch (error) {
    console.log(`Error while updating subcription: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteSubscription = async (
  req: Request<params, {}, ISubscription>,
  res: Response,
) => {
  try {
    const id = req.params.id;

    const subcriptionDataDeteletion = await deletion(id);
    if (!subcriptionDataDeteletion) {
      return res.status(404).json({
        success: false,
        message: "No any subcription found with this id",
      });
    }

    return res.status(200).json({
      success: true,
      messsage: "Subscription deleted successfully",
    });
  } catch (error) {
    console.log(`Error while deleting subcription: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export {
  createSubscription,
  createSubscriptionWeb,
  getSubscription,
  updateSubscription,
  deleteSubscription,
};
