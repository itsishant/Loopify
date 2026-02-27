"use client";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const createSubscription = async (
  appName: string,
  category: string,
  planType: string,
  amount: string,
  currency: string,
  paymentMethod: string,
  autoRenew: boolean,
  startDate: string,
  nextBillingDate: string,
  reminderDaysBefore: string,
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }

  if (!API_URL) {
    throw new Error("API base URL is not configured.");
  }

  const parsedAmount = Number.parseFloat(amount);
  const parsedReminderDays = Number.parseInt(reminderDaysBefore, 10);

  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    throw new Error("Amount must be a valid number greater than 0.");
  }

  if (![1, 3, 7, 14, 30].includes(parsedReminderDays)) {
    throw new Error("Reminder days must be one of: 1, 3, 7, 14, 30.");
  }

  try {
    const response = await axios.post(
      `${API_URL}/subscription/create-subscription-web`,
      {
        appName: appName.trim(),
        category,
        planType,
        amount: parsedAmount,
        currency,
        paymentMethod,
        autoRenew,
        startDate,
        nextBillingDate,
        reminderDaysBefore: parsedReminderDays,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response;
  } catch (error: any) {
    const apiMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Failed to create subscription";
    throw new Error(apiMessage);
  }
};
