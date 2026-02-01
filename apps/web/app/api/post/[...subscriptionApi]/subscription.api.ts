"use client";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const createSubscription = (
  appName: string,
  category: string,
  planType: string,
  amount: string,
  currency: string,
  paymentMethod: string,
  autoRenew: boolean,
  startDate: string,
  nextBillingDate: string,
  remindaerDaysBefore: string,
) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      throw new Error("Authentication token not found. Please log in again.");
    }

    console.log("Token being sent:", token);

    const response = axios.post(
      `${API_URL}/subscription/create-subscription`,
      {
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
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response;
  } catch (error) {
    console.log(`Error while creating subscription ${error}`);
    throw error;
  }
};
