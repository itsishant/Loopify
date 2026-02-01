import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  subscriptionDetails: {
    appName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["Productivity", "Education", "Entertainment", "Utility", "Other"],
      required: true,
    },

    planType: {
      type: String,
      enum: ["Monthly", "Yearly", "Free", "Trial"],
      required: true,
    },
  },

  billingDetails: {
    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Debit Card", "PayPal", "Upi", "Other"],
      required: true,
    },

    autoRenew: {
      type: Boolean,
      required: true,
    },
  },

  datesDetails: {
    startDate: {
      type: Date,
      required: true,
    },

    nextBillingDate: {
      type: Date,
      required: true,
    },
  },

  remindaerDaysBefore: {
    type: Number,
    enum: [1, 3, 7, 14, 30],
    required: true,
  },

  status: {
    type: String,
    enum: ["Active", "Inactive", "Cancelled", "Paused"],
    required: true,
  },

  createdAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },

  updatedAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
  },

  isdeleted: {
    type: Boolean,
    default: false,
  },
});

export { subscriptionSchema };
