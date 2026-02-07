"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TbLogout, TbBell, TbX, TbCheck } from "react-icons/tb";
import { GetSubscription } from "../../api/get/[...subscriptionApi]/subscription.api";
import { BsEyeFill, BsEyeSlash, BsEyeSlashFill } from "react-icons/bs";

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
  const [eyeOpen, setEyeOpen] = useState(false);

  useState<Subscription | null>(null);

  const navItems = [
    "Subscriptions",
    "Payments",
    "Analytics",
    "Settings",
    "Support",
  ];

  return (
    <div>
      <header className="sticky top-0 z-50 border-b border-gray-900 bg-black backdrop-blur-md">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-3 min-w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-black font-bold text-sm">
                  {localStorage.getItem("email")?.charAt(0).toUpperCase() ||
                    "U"}
                </span>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-white">
                  My Subscriptions
                </h1>
                <p className="text-xs text-gray-500">Personal</p>
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
                    item === "Support"
                      ? route.push("/dashboard/support")
                      : null;
                  }}
                  className="px-3 py-2 text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-900/50 rounded-md transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3 ml-auto">
              <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-900/50 rounded-lg transition-colors duration-200 relative">
                <TbBell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
                {(localStorage.getItem("email") || "U").charAt(0).toUpperCase()}
              </div>

              <motion.button
                whileHover="hover"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userId");
                  route.push("/");
                }}
                className="p-2 text-gray-400 hover:text-rose-400 hover:bg-gray-900/50 rounded-lg transition-colors duration-200"
              >
                <TbLogout className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-8 bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 1 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="mb-12"
          >
            <h1 className="text-3xl font-semibold text-neutral-200 mb-2">
              My Profile
            </h1>
            <p className="text-gray-400">
              Manage your account settings, view your subscription details, and
              update your preferences
            </p>
          </motion.div>
        </div>
        <div className="flex flex-col justify-center ml-auto mr-auto max-w-7xl px-8">
          <div className="max-w-xl px-4">
            <h1 className="text-neutral-300 text-2xl font-medium mb-4">
              Email
            </h1>
            <p className="border px-4 py-4 border-neutral-400 text-neutral-400 rounded-lg">
              {localStorage.getItem("email") || "Not Registered"}
            </p>
          </div>
          <div className="w-96 mt-12 px-4">
            <h1 className="text-neutral-300 text-2xl font-medium mb-4">
              Password
            </h1>
            <p className="relative border px-4 py-4 flex items-center border-neutral-400 text-neutral-400 rounded-lg">
              ⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕
              <button
                className="absolute right-4 cursor-pointer"
                onClick={() => setEyeOpen(!eyeOpen)}
              >
                {eyeOpen ? (
                  <BsEyeSlashFill className="w-5 h-5" />
                ) : (
                  <BsEyeFill className="w-5 h-5" />
                )}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
