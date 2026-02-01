"use client";

import { useState } from "react";
import { createSubscription } from "../../api/post/[...subscriptionApi]/subscription.api";

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
          <div className="text-center py-16">
            <p className="text-gray-500 text-sm">
              No subscriptions yet. Add one to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className={`bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-neutral-700 transition-colors duration-200 ${getStatusColor(sub.status)}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  <div>
                    <p className="text-gray-500 text-xs uppercase font-medium mb-2">
                      App
                    </p>
                    <p className="text-white font-medium">
                      {sub.subscriptionDetails.appName}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {sub.subscriptionDetails.category}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-xs uppercase font-medium mb-2">
                      Billing
                    </p>
                    <p className="text-white font-medium">
                      {sub.billingDetails.currency} {sub.billingDetails.amount}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {sub.subscriptionDetails.planType}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-xs uppercase font-medium mb-2">
                      Payment
                    </p>
                    <p className="text-white font-medium">
                      {sub.billingDetails.paymentMethod}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {sub.billingDetails.autoRenew
                        ? "Auto Renewal"
                        : "Manual Renewal"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-xs uppercase font-medium mb-2">
                      Next Billing
                    </p>
                    <p className="text-white font-medium">
                      {new Date(
                        sub.datesDetails.nextBillingDate,
                      ).toLocaleDateString()}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {sub.remindaerDaysBefore} days before
                    </p>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <div className="text-white font-medium text-sm">
                      {sub.status}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="px-4 py-2 bg-neutral-800 text-white text-sm font-medium rounded hover:bg-neutral-700 transition-colors duration-200">
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-neutral-800 text-white text-sm font-medium rounded hover:bg-neutral-700 transition-colors duration-200">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
