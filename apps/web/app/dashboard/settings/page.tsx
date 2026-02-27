"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TbLogout, TbBell, TbCheck, TbLock, TbUser, TbShieldLock, TbMail, TbCalendar } from "react-icons/tb";
import { GetSubscription } from "../../api/get/[...subscriptionApi]/subscription.api";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

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
}

export default function Setting() {
  const route = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState({
    emailReminders: true,
    billingAlerts: true,
    newOffers: true,
    weeklyReport: true,
  });

  const navItems = [
    "Subscriptions",
    "Payments",
    "Analytics",
    "Settings",
  ];

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const data = await GetSubscription();
      if (Array.isArray(data)) {
        setSubscriptions(data);
      }
    };

    fetchSubscriptions();
  }, []);

  const normalizeDate = (dateInput: string | Date) => {
    const date = new Date(dateInput);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const reminderSubscriptions = subscriptions.filter((subscription) => {
    const reminderDays = Number((subscription as any).reminderDaysBefore ?? subscription.remindaerDaysBefore ?? 0);
    if (!Number.isFinite(reminderDays) || reminderDays <= 0) {
      return false;
    }

    const billingDate = normalizeDate(subscription.datesDetails.nextBillingDate);
    const reminderDate = new Date(billingDate);
    reminderDate.setDate(billingDate.getDate() - reminderDays);

    const today = normalizeDate(new Date());
    return today >= reminderDate && today <= billingDate;
  });

  const hasReminderNotifications = reminderSubscriptions.length > 0;

  const [userInitial, setUserInitial] = useState("U");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email") || "";
    setUserEmail(email);
    setUserInitial((email || "U").charAt(0).toUpperCase());
  }, []);

  return (
    <div>
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black/95 backdrop-blur-md">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-3 min-w-fit">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                <span className="text-black font-bold text-sm">{userInitial}</span>
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
                      : "text-neutral-400 hover:text-neutral-300 hover:bg-black/50"
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
                        <p className="px-4 py-4 text-sm text-neutral-400">
                          No reminders due today.
                        </p>
                      ) : (
                        reminderSubscriptions.map((subscription) => (
                          <div
                            key={subscription._id}
                            className="px-4 py-3 border-b border-neutral-900 last:border-b-0"
                          >
                            <p className="text-sm text-neutral-200 font-medium">
                              {subscription.subscriptionDetails.appName}
                            </p>
                            <p className="text-xs text-rose-300 mt-1">
                              Reminder reached. Billing on{" "}
                              {new Date(
                                subscription.datesDetails.nextBillingDate,
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
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

      <main className="pt-8 bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Settings & Account</h1>
            <p className="text-neutral-400 text-lg">
              Manage your account, security, and notification preferences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-black border border-neutral-400/20 rounded-xl overflow-hidden">
                {[
                  { id: "profile", label: "Profile", icon: TbUser },
                  { id: "account", label: "Account Info", icon: TbShieldLock },
                  { id: "notifications", label: "Notifications", icon: TbBell },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-6 py-4 flex items-center gap-3 border-b border-neutral-400/10 last:border-b-0 transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-neutral-400 text-black border-l-4 border-l-neutral-400"
                          : "text-neutral-400 hover:text-neutral-300 hover:bg-neutral-900/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}"
              </div>
            </motion.div>

            {/* Content Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  {/* Profile Header Card */}
                  <motion.div
                    className="bg-black border border-neutral-400/20 rounded-xl p-8"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-xl bg-neutral-400 flex items-center justify-center text-4xl font-bold text-black shadow-lg">
                          {userInitial}
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-neutral-400 mb-2">Your Profile</h2>
                          <p className="text-neutral-400 text-sm mb-3">Manage your public profile and identity</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-neutral-400/10 border border-neutral-400/30 rounded-lg">
                        <p className="text-neutral-400 text-sm font-medium flex items-center gap-2">
                          <TbCheck className="w-4 h-4" />
                          Account Verified
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Profile Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-black border border-neutral-400/20 rounded-xl p-6"
                    >
                      <label className="flex items-center gap-2 text-neutral-400 text-sm font-medium mb-3">
                        <TbMail className="w-4 h-4" />
                        Email Address
                      </label>
                      <p className="text-neutral-400 text-lg font-semibold">{userEmail || "Not set"}</p>
                      <p className="text-neutral-500 text-xs mt-2">Your primary email for account recovery</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-black border border-neutral-400/20 rounded-xl p-6"
                    >
                      <label className="flex items-center gap-2 text-neutral-400 text-sm font-medium mb-3">
                        <TbCalendar className="w-4 h-4" />
                        Account Created
                      </label>
                      <p className="text-neutral-400 text-lg font-semibold">
                        {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                      <p className="text-neutral-500 text-xs mt-2">Member for less than a day</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-black border border-neutral-400/20 rounded-xl p-6"
                    >
                      <label className="flex items-center gap-2 text-neutral-400 text-sm font-medium mb-3">
                        <TbShieldLock className="w-4 h-4" />
                        Account Status
                      </label>
                      <p className="text-neutral-400 text-lg font-semibold">Active</p>
                      <p className="text-neutral-500 text-xs mt-2">Your account is in good standing</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-black border border-neutral-400/20 rounded-xl p-6"
                    >
                      <label className="flex items-center gap-2 text-neutral-400 text-sm font-medium mb-3">
                        <TbLock className="w-4 h-4" />
                        Last Login
                      </label>
                      <p className="text-neutral-400 text-lg font-semibold">Just now</p>
                      <p className="text-neutral-500 text-xs mt-2">Current session</p>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Account Info Tab */}
              {activeTab === "account" && (
                <div className="space-y-6">
                  <div
                    className="bg-black border border-neutral-400/20 rounded-xl p-8"
                  >
                    <h3 className="text-2xl font-bold text-neutral-400 mb-6">Account Information</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-neutral-400 text-sm font-medium mb-3">Email Address</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="email"
                            value={userEmail || ""}
                            disabled
                            className="flex-1 bg-black border border-neutral-400/20 text-neutral-400 py-3 px-4 rounded-lg text-sm focus:outline-none"
                          />
                          <span className="px-3 py-3 bg-neutral-400/10 text-neutral-400 rounded-lg text-sm font-medium flex items-center gap-2">
                            <TbCheck className="w-4 h-4" />
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div
                    className="bg-black border border-neutral-400/20 rounded-xl p-8"
                  >
                    <h3 className="text-2xl font-bold text-neutral-400 mb-6">Notification Preferences</h3>
                    
                    <div className="space-y-4">
                      {[
                        { key: "emailReminders", title: "Billing Reminders", desc: "Get notified before your subscriptions renew" },
                        { key: "billingAlerts", title: "Billing Alerts", desc: "Receive alerts about payment issues" },
                        { key: "newOffers", title: "Special Offers", desc: "Get notified about deals and exclusive offers" },
                        { key: "weeklyReport", title: "Weekly Report", desc: "Receive a weekly summary of your subscriptions" },
                      ].map((notif) => (
                        <div
                          key={notif.key}
                          className="flex items-center justify-between p-4 bg-black border border-neutral-400/20 rounded-lg hover:border-neutral-400/40 transition-colors"
                        >
                          <div>
                            <p className="text-neutral-400 font-medium">{notif.title}</p>
                            <p className="text-neutral-500 text-sm">{notif.desc}</p>
                          </div>
                          <button
                            onClick={() => toggleNotification(notif.key as keyof typeof notifications)}
                            className="text-2xl transition-colors"
                          >
                            {notifications[notif.key as keyof typeof notifications] ? (
                              <BsToggleOn className="text-neutral-400" />
                            ) : (
                              <BsToggleOff className="text-neutral-600" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
