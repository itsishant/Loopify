import { Types } from "mongoose";

export interface ISubscription {
  id?: string;
  userId?: Types.ObjectId;
  subscriptionDetails: {
    appName: string;
    category:
      | "Productivity"
      | "Education"
      | "Entertainment"
      | "Utility"
      | "Other";
    planType: "Monthly" | "Yearly" | "Free" | "Trial";
  };
  billingDetails: {
    amount: number;
    currency: string;
    paymentMethod: "Credit Card" | "Debit Card" | "PayPal" | "Upi" | "Other";
    autoRenew: boolean;
  };
  datesDetails: {
    startDate: Date;
    nextBillingDate: Date;
  };
  reminderDaysBefore: 1 | 3 | 7 | 14 | 30;
  status: "Active" | "Inactive" | "Cancelled" | "Paused";
  createdAt?: Date;
  updatedAt?: Date;
  isdeleted?: boolean;
}
