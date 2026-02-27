"use client";

import { motion } from "motion/react";
import "@fontsource/poppins/400.css";
import {
  TbLogout,
  TbSearch,
  TbBell,
  TbFilter,
  TbLayoutGrid,
  TbList,
} from "react-icons/tb";
import "@fontsource/poppins/400-italic.css";
import { DashboardSubscription } from "./[...dashboardMySubscription]/dashboardSubscription.dashboard";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { GetSubscription } from "../api/get/[...subscriptionApi]/subscription.api";

interface SubscriptionItem {
  _id: string;
  subscriptionDetails: {
    appName: string;
  };
  datesDetails: {
    nextBillingDate: string;
  };
  reminderDaysBefore?: number;
  remindaerDaysBefore?: number;
}

const normalizeDate = (dateInput: string | Date) => {
  const date = new Date(dateInput);
  date.setHours(0, 0, 0, 0);
  return date;
};

const isReminderReached = (subscription: SubscriptionItem) => {
  const reminderDays = Number(
    subscription.reminderDaysBefore ?? subscription.remindaerDaysBefore ?? 0,
  );

  if (!Number.isFinite(reminderDays) || reminderDays <= 0) {
    return false;
  }

  const billingDate = normalizeDate(subscription.datesDetails.nextBillingDate);
  const reminderDate = new Date(billingDate);
  reminderDate.setDate(billingDate.getDate() - reminderDays);

  const today = normalizeDate(new Date());
  return today >= reminderDate && today <= billingDate;
};

export default function DashboardPage() {
  const route = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([]);
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
      const data = await GetSubscription();
      if (Array.isArray(data)) {
        setSubscriptions(data as SubscriptionItem[]);
      }
    };

    fetchSubscriptions();
  }, []);

  const reminderSubscriptions = useMemo(() => {
    return subscriptions.filter(isReminderReached);
  }, [subscriptions]);

  const hasReminderNotifications = reminderSubscriptions.length > 0;

  return (
    <div className="min-h-screen bg-black">
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
                  onClick={() => {
                    item === "Payments"
                      ? route.push("/dashboard/payments")
                      : null;
                    item === "Subscriptions"
                      ? route.push("/dashboard")
                      : null;
                    item === "Analytics"
                      ? route.push("/dashboard/analytics")
                      : null;
                    item === "Settings"
                      ? route.push("/dashboard/settings")
                      : null;
                  }}
                  key={item}
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
                  <TbBell
                    className={`w-5 h-5 ${hasReminderNotifications ? "animate-pulse" : ""}`}
                  />
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

      <main className="w-full">
        <DashboardSubscription />
      </main>
    </div>
  );
}
