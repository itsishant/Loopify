"use client";

import { useEffect, useState } from "react";
import { createSubscription } from "../../api/post/[...subscriptionApi]/subscription.api";
import { GetSubscription } from "../../api/get/[...subscriptionApi]/subscription.api";

export const DashboardSubscription = () => {
  const [formData, setFormData] = useState({
    subscriptionDetails: {
      appName: "",
      category: "",
      planType: "",
    },
    billingDetails: {
      amount: "",
      currency: "USD",
      paymentMethod: "",
      autoRenew: false,
    },
    datesDetails: {
      startDate: "",
      nextBillingDate: "",
    },
    remindaerDaysBefore: "",
    status: "Active",
  });

  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const data = await GetSubscription();
      if (data) {
        setSubscriptions(data);
      }
    };

    fetchSubscriptions();
  });

  const handleInputChange = (path: string, value: any) => {
    const keys = path.split(".");
    setFormData((prev) => {
      const newData = { ...prev };
      let current = newData as any;
      for (let i = 0; i < keys.length - 1; i++) {
        //@ts-ignore
        current = current[keys[i]];
      }
      //@ts-ignore
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleAddSubscription = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token && !userId) {
      return setError("User not authenticated. Please log in.");
    }

    if (
      formData.subscriptionDetails.appName &&
      formData.billingDetails.amount
    ) {
      setLoading(true);
      setError("");
      try {
        const response = await createSubscription(
          formData.subscriptionDetails.appName,
          formData.subscriptionDetails.category,
          formData.subscriptionDetails.planType,
          formData.billingDetails.amount,
          formData.billingDetails.currency,
          formData.billingDetails.paymentMethod,
          formData.billingDetails.autoRenew,
          formData.datesDetails.startDate,
          formData.datesDetails.nextBillingDate,
          formData.remindaerDaysBefore,
        );

        if (!response || !response.data) {
          throw new Error("Failed to save subscription");
        }

        setSubscriptions([
          ...subscriptions,
          { ...formData, id: response.data._id || Date.now() },
        ]);
        setFormData({
          subscriptionDetails: { appName: "", category: "", planType: "" },
          billingDetails: {
            amount: "",
            currency: "USD",
            paymentMethod: "",
            autoRenew: false,
          },
          datesDetails: { startDate: "", nextBillingDate: "" },
          remindaerDaysBefore: "",
          status: "Active",
        });
        setShowForm(false);
        localStorage.setItem("id", response.data._id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error saving subscription:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-emerald-400 border-l-4 border-emerald-400";
      case "Inactive":
        return "text-amber-400 border-l-4 border-amber-400";
      case "Paused":
        return "text-sky-400 border-l-4 border-sky-400";
      case "Cancelled":
        return "text-rose-400 border-l-4 border-rose-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="w-full min-h-screen bg-black pt-8">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-semibold font-poppins text-neutral-300 mb-2">
              My Subscriptions
            </h1>
            <p className="text-neutral-500 text-sm">
              Manage your active subscriptions and billing details
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-neutral-100 text-black font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {showForm ? "Cancel" : "Add Subscription +"}
          </button>
        </div>

        {showForm && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 mb-12">
            <h2 className="text-xl font-light text-white mb-8">
              New Subscription
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Application Name
                </label>
                <input
                  type="text"
                  placeholder="Netflix, Spotify, etc."
                  value={formData.subscriptionDetails.appName}
                  onChange={(e) =>
                    handleInputChange(
                      "subscriptionDetails.appName",
                      e.target.value,
                    )
                  }
                  className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Category
                </label>
                <select
                  value={formData.subscriptionDetails.category}
                  onChange={(e) =>
                    handleInputChange(
                      "subscriptionDetails.category",
                      e.target.value,
                    )
                  }
                  className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm"
                >
                  <option value="">Select category</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Education">Education</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utility">Utility</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Plan Type
                </label>
                <select
                  value={formData.subscriptionDetails.planType}
                  onChange={(e) =>
                    handleInputChange(
                      "subscriptionDetails.planType",
                      e.target.value,
                    )
                  }
                  className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm"
                >
                  <option value="">Select plan</option>
                  <option value="Monthy">Monthly</option>
                  <option value="Yearly">Yearly</option>
                  <option value="Free">Free</option>
                  <option value="Trial">Trial</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Amount
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={formData.billingDetails.amount}
                  onChange={(e) =>
                    handleInputChange("billingDetails.amount", e.target.value)
                  }
                  className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Currency
                </label>
                <select
                  value={formData.billingDetails.currency}
                  onChange={(e) =>
                    handleInputChange("billingDetails.currency", e.target.value)
                  }
                  className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="INR">INR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Payment Method
                </label>
                <select
                  value={formData.billingDetails.paymentMethod}
                  onChange={(e) =>
                    handleInputChange(
                      "billingDetails.paymentMethod",
                      e.target.value,
                    )
                  }
                  className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm"
                >
                  <option value="">Select method</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Upi">UPI</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.datesDetails.startDate}
                  onChange={(e) =>
                    handleInputChange("datesDetails.startDate", e.target.value)
                  }
                  className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Next Billing Date
                </label>
                <input
                  type="date"
                  value={formData.datesDetails.nextBillingDate}
                  onChange={(e) =>
                    handleInputChange(
                      "datesDetails.nextBillingDate",
                      e.target.value,
                    )
                  }
                  className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Reminder (Days Before)
                </label>
                <select
                  value={formData.remindaerDaysBefore}
                  onChange={(e) =>
                    handleInputChange("remindaerDaysBefore", e.target.value)
                  }
                  className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm"
                >
                  <option value="">Select days</option>
                  <option value="1">1 day</option>
                  <option value="3">3 days</option>
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Paused">Paused</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center pt-6">
                <input
                  type="checkbox"
                  checked={formData.billingDetails.autoRenew}
                  onChange={(e) =>
                    handleInputChange(
                      "billingDetails.autoRenew",
                      e.target.checked,
                    )
                  }
                  id="autorenew"
                  className="w-4 h-4 accent-white cursor-pointer"
                />
                <label
                  htmlFor="autorenew"
                  className="ml-3 text-white text-sm font-medium cursor-pointer"
                >
                  Enable Auto Renewal
                </label>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-rose-900/30 border border-rose-500/50 rounded-lg">
                <p className="text-rose-400 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleAddSubscription}
                disabled={loading}
                className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                disabled={loading}
                className="px-6 py-3 bg-neutral-800 text-white font-medium rounded-lg hover:bg-neutral-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {subscriptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-20 h-20 rounded-2xl bg-neutral-900/50 border border-neutral-800 flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-neutral-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-neutral-300 text-lg font-medium mb-2">
              No active subscriptions
            </h3>
            <p className="text-neutral-600 text-sm mb-8 max-w-sm text-center">
              Track and manage all your subscriptions in one place
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-neutral-100 transition-all duration-200"
            >
              Add Subscription
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="relative bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 rounded-xl p-6 hover:border-neutral-700 transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-neutral-800/80 border border-neutral-700/50 flex items-center justify-center">
                      <span className="text-neutral-300 font-semibold text-base">
                        {sub.subscriptionDetails.appName
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-neutral-200 text-base font-semibold leading-tight">
                        {sub.subscriptionDetails.appName}
                      </h3>
                      <p className="text-neutral-500 text-xs mt-0.5">
                        {sub.subscriptionDetails.category}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                      sub.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : sub.status === "Inactive"
                          ? "bg-neutral-700/50 text-neutral-400"
                          : sub.status === "Paused"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-neutral-200 text-3xl font-bold tracking-tight">
                      {sub.billingDetails.currency === "USD"
                        ? "$"
                        : sub.billingDetails.currency === "EUR"
                          ? "€"
                          : sub.billingDetails.currency === "GBP"
                            ? "£"
                            : "₹"}
                      {sub.billingDetails.amount}
                    </span>
                    <span className="text-neutral-500 text-sm font-medium">
                      / {sub.subscriptionDetails.planType.toLowerCase()}
                    </span>
                  </div>
                  {sub.billingDetails.autoRenew && (
                    <div className="flex items-center gap-1.5 text-neutral-500 text-xs">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Auto-renews</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6 pb-6 border-b border-neutral-800/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Payment</span>
                    <span className="text-neutral-300 font-medium">
                      {sub.billingDetails.paymentMethod}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Next billing</span>
                    <span className="text-neutral-300 font-medium">
                      {new Date(
                        sub.datesDetails.nextBillingDate,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Reminder</span>
                    <span className="text-neutral-300 font-medium">
                      {sub.remindaerDaysBefore}d before
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 text-xs font-medium rounded-lg transition-colors duration-200">
                    Edit
                  </button>
                  <button className="px-3 py-2 bg-neutral-800/60 hover:bg-rose-500/10 text-neutral-400 hover:text-rose-400 text-xs font-medium rounded-lg transition-all duration-200">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
