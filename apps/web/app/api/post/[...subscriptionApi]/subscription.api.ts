"use client";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const createSubscription = (
  appName: string,
  category: string,
  planType: string,
  amount: number,
  currency: string,
  paymentMethod: string,
  autoRenew: boolean,
  startDate: string,
  nextBillingDate: string,
  remindaerDaysBefore: number,
) => {
  try {
    const response = axios.post(`${API_URL}/subscription/create-subscription`, {
      appName: appName,
      category: category,
      planType: planType,
      amount: amount,
      currency: currency,
      paymentMethod: paymentMethod,
      autoRenew: autoRenew,
      startDate: startDate,
      nextBillingDate: nextBillingDate,
      remindaerDaysBefore: remindaerDaysBefore,
    });

    return response;
  } catch (error) {
    console.log(`Error while creating subscription ${error}`);
  }
};
