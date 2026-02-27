"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { TbLogout, TbBell, TbX, TbCheck } from "react-icons/tb";
import { GetSubscription } from "../../api/get/[...subscriptionApi]/subscription.api";

interface SubscriptionData {
  _id: string;
  subscriptionDetails: {
    appName: string;
    category: string;
    planType: string;
  };
  billingDetails: {
    amount: number;
    currency: string;
    paymentMethod: string;
    autoRenew: boolean;
  };
  datesDetails: {
    startDate: string;
    nextBillingDate: string;
  };
  status: string;
  remindaerDaysBefore: number;
  userId: string;
  isdeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Subscription {
  id: string;
  appName: string;
  category: string;
  planType: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  autoRenew: boolean;
  startDate: string;
  nextBillingDate: string;
  status: string;
  reminderDaysBefore?: number;
}

export default function Payments() {
  const route = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userInitial, setUserInitial] = useState("U");

  useEffect(() => {
    setUserInitial((localStorage.getItem("email") || "U").charAt(0).toUpperCase());
  }, []);

  const navItems = [
    "Subscriptions",
    "Payments",
    "Analytics",
    "Settings",
  ];

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await GetSubscription();
        if (Array.isArray(data) && data.length > 0) {
          // Map API response to component format
          const mapped = data.map((item: SubscriptionData) => ({
            id: item._id,
            appName: item.subscriptionDetails?.appName ?? "N/A",
            category: item.subscriptionDetails?.category ?? "N/A",
            planType: item.subscriptionDetails?.planType ?? "N/A",
            amount: item.billingDetails?.amount ?? 0,
            currency: item.billingDetails?.currency ?? "USD",
            paymentMethod: item.billingDetails?.paymentMethod ?? "N/A",
            autoRenew: item.billingDetails?.autoRenew ?? false,
            startDate: item.datesDetails?.startDate ?? "",
            nextBillingDate: item.datesDetails?.nextBillingDate ?? "",
            status: item.status ?? "Unknown",
            reminderDaysBefore: item.remindaerDaysBefore ?? 0,
          }));

          // Sort by next billing date (nearest first)
          const sorted = [...mapped].sort(
            (a: Subscription, b: Subscription) => {
              const dateA = new Date(a.nextBillingDate).getTime();
              const dateB = new Date(b.nextBillingDate).getTime();
              return dateA - dateB;
            },
          );
          setSubscriptions(sorted);
        } else {
          setSubscriptions([]);
        }
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
        setSubscriptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const normalizeDate = (dateInput: string | Date) => {
    const date = new Date(dateInput);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const reminderSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const reminderDays = sub.reminderDaysBefore ?? 0;
      if (!Number.isFinite(reminderDays) || reminderDays <= 0) return false;
      const billingDate = normalizeDate(sub.nextBillingDate);
      const reminderDate = new Date(billingDate);
      reminderDate.setDate(billingDate.getDate() - reminderDays);
      const today = normalizeDate(new Date());
      return today >= reminderDate && today <= billingDate;
    });
  }, [subscriptions]);

  const hasReminderNotifications = reminderSubscriptions.length > 0;

  return (
    <div>
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black/95 backdrop-blur-md">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-3 min-w-fit">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                <span className="text-black font-bold text-sm">
                  {userInitial}
                </span>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-white">
                  My Subscriptions
                </h1>
                <p className="text-xs text-neutral-500">Personal</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    item === "Payments"
                      ? route.push("/dashboard/payments")
                      : null;
                    item === "Subscriptions" ? route.push("/dashboard") : null;
                    item === "Analytics"
                      ? route.push("/dashboard/analytics")
                      : null;
                    item === "Settings"
                      ? route.push("/dashboard/settings")
                      : null;
                  }}
                  className="px-3 py-2 text-sm text-neutral-400 hover:text-neutral-300 hover:bg-neutral-900/50 rounded-md transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3 ml-auto">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications((prev) => !prev)}
                  className={`p-2 rounded-lg transition-colors duration-200 relative ${
                    hasReminderNotifications
                      ? "text-rose-300 hover:text-rose-200 hover:bg-rose-500/10"
                      : "text-neutral-400 hover:text-neutral-300 hover:bg-neutral-900/50"
                  }`}
                >
                  <TbBell className={`w-5 h-5 ${hasReminderNotifications ? "animate-pulse" : ""}`} />
                  {hasReminderNotifications && (
                    <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300/80" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-400" />
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-neutral-950 border border-neutral-800 rounded-lg shadow-xl z-50">
                    <div className="px-4 py-3 border-b border-neutral-800">
                      <p className="text-sm font-semibold text-white">Reminder Notifications</p>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {reminderSubscriptions.length === 0 ? (
                        <p className="px-4 py-4 text-sm text-neutral-400">No reminders due today.</p>
                      ) : (
                        reminderSubscriptions.map((sub) => (
                          <div key={sub.id} className="px-4 py-3 border-b border-neutral-900 last:border-b-0">
                            <p className="text-sm text-neutral-200 font-medium">{sub.appName}</p>
                            <p className="text-xs text-rose-300 mt-1">
                              Reminder reached. Billing on{" "}
                              {new Date(sub.nextBillingDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
                {userInitial}
              </div>

              <motion.button
                whileHover="hover"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userId");
                  route.push("/");
                }}
                className="p-2 text-neutral-400 hover:text-rose-400 hover:bg-neutral-900/50 rounded-lg transition-colors duration-200"
              >
                <TbLogout className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="pt-8 bg-black min-h-screen">
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="mb-12">
              <h1 className="text-3xl font-semibold text-white mb-2">
                Payments & Subscriptions
              </h1>
              <p className="text-gray-400">
                Manage your subscriptions and view upcoming billing dates
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-black border border-gray-800 rounded-lg p-6"
              >
                <p className="text-gray-400 text-sm mb-2">
                  Active Subscriptions
                </p>
                <h3 className="text-3xl font-bold text-white">
                  {subscriptions?.filter((s) => s?.status === "Active")
                    ?.length ?? 0}
                </h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-black border border-gray-800 rounded-lg p-6"
              >
                <p className="text-gray-400 text-sm mb-2">Monthly Due</p>
                <h3 className="text-3xl font-bold text-white">
                  $
                  {(
                    subscriptions
                      ?.filter(
                        (s) =>
                          s?.planType === "Monthy" && s?.status === "Active",
                      )
                      ?.reduce((sum, s) => sum + (s?.amount ?? 0), 0) ?? 0
                  ).toFixed(2)}
                </h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-black border border-gray-800 rounded-lg p-6"
              >
                <p className="text-gray-400 text-sm mb-2">Next Billing</p>
                <h3 className="text-xl font-bold text-white">
                  {subscriptions &&
                  subscriptions.length > 0 &&
                  subscriptions[0]?.nextBillingDate
                    ? new Date(
                        subscriptions[0].nextBillingDate,
                      ).toLocaleDateString()
                    : "N/A"}
                </h3>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-black border border-gray-800 rounded-lg overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        App Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        Plan
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        Next Billing
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center">
                          <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                          </div>
                        </td>
                      </tr>
                    ) : subscriptions.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-6 py-8 text-center text-gray-400"
                        >
                          No subscriptions found
                        </td>
                      </tr>
                    ) : (
                      subscriptions.map((sub, index) => (
                        <motion.tr
                          key={sub.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <span className="text-white font-medium">
                              {sub?.appName ?? "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-400 text-sm">
                              {sub?.category ?? "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                              {sub?.planType ?? "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-white font-medium">
                              {sub?.currency ?? ""}{" "}
                              {(sub?.amount ?? 0).toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-300">
                              {sub?.nextBillingDate
                                ? new Date(
                                    sub.nextBillingDate,
                                  ).toLocaleDateString()
                                : "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                                sub?.status === "Active"
                                  ? "bg-emerald-500/10 text-emerald-400"
                                  : sub?.status === "Paused"
                                    ? "bg-yellow-500/10 text-yellow-400"
                                    : "bg-yellow-500/10 text-yellow-400"
                              }`}
                            >
                              {sub?.status ?? "Unknown"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedSubscription(sub)}
                              className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                            >
                              View Details
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selectedSubscription ? 1 : 0 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedSubscription(null)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-200 ${
          selectedSubscription ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{
            opacity: selectedSubscription ? 1 : 0,
            scale: selectedSubscription ? 1 : 0.95,
            y: selectedSubscription ? 0 : 20,
          }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
        >
          {selectedSubscription && (
            <div className="bg-black border border-neutral-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {selectedSubscription?.appName
                        ?.charAt(0)
                        ?.toUpperCase() ?? "?"}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {selectedSubscription?.appName ?? "Subscription"}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSubscription(null)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <TbX className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Status</p>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                        selectedSubscription?.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : selectedSubscription?.status === "Paused"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {selectedSubscription?.status ?? "Unknown"}
                    </span>
                  </div>
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Category</p>
                    <p className="text-neutral-200 font-medium">
                      {selectedSubscription?.category ?? "N/A"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Plan Type</p>
                    <p className="text-neutral-200 font-medium">
                      {selectedSubscription?.planType ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Amount</p>
                    <p className="text-neutral-200 font-bold text-lg">
                      {selectedSubscription?.currency ?? ""}{" "}
                      {(selectedSubscription?.amount ?? 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Start Date</p>
                    <p className="text-neutral-200">
                      {selectedSubscription?.startDate
                        ? new Date(
                            selectedSubscription.startDate,
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">
                      Next Billing Date
                    </p>
                    <p className="text-neutral-200 font-semibold text-lg">
                      {selectedSubscription?.nextBillingDate
                        ? new Date(
                            selectedSubscription.nextBillingDate,
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Payment Method</p>
                    <p className="text-neutral-200 font-medium">
                      {selectedSubscription?.paymentMethod ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Auto Renew</p>
                    <p
                      className={`font-medium ${
                        selectedSubscription?.autoRenew
                          ? "text-green-300"
                          : "text-yellow-300"
                      }`}
                    >
                      {selectedSubscription?.autoRenew ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    Manage
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium py-2 rounded-lg transition-colors"
                    onClick={() => setSelectedSubscription(null)}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
