import { type Request, type Response } from "express";
import type { ISubscription } from "../interface/subscription.interface.js";
import { createSubscriptionData } from "../utils/subscription/createSubcription.utils.js";
import { getSubscriptionId } from "../utils/subscription/getSubscription.utils.js";
import type { params } from "../types/subcription.type.js";
import { update } from "../utils/subscription/updateSubcripton.utils.js";
import { deletion } from "../utils/subscription/deleteSubcription.utils.js";

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
      remindaerDaysBefore === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
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
        amount,
        currency,
        paymentMethod,
        autoRenew,
      },
      datesDetails: {
        startDate,
        nextBillingDate,
      },
      remindaerDaysBefore,
      status: "Active",
    };

    const createdData = await createSubscriptionData(transformedData);
    console.log("created");
    if (!createdData) {
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
  getSubscription,
  updateSubscription,
  deleteSubscription,
};
