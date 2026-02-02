import mongoose from "mongoose";
import type { ISubscription } from "../../interface/subscription.interface.js";
import { Subscription } from "../../models/subscription.model.js";

const getSubscriptionId = async (userId: string) => {
  const subscription = await Subscription.find({
    userId: userId,
  });
  return subscription;
};

export { getSubscriptionId };
