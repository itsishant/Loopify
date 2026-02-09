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
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const route = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const navItems = [
    "Subscriptions",
    "Payments",
    "Analytics",
    "Settings",
    "Support",
  ];

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black/95 backdrop-blur-md">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-3 min-w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                <span className="text-black font-bold text-sm">
                  {localStorage.getItem("email")?.charAt(0).toUpperCase() ||
                    "U"}
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
                      ? route.push("/dashboard/subscriptions")
                      : null;
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
                  key={item}
                  className="px-3 py-2 text-sm text-neutral-400 hover:text-neutral-300 hover:bg-neutral-900/50 rounded-md transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3 ml-auto">
              <button className="p-2 text-neutral-400 hover:text-neutral-300 hover:bg-neutral-900/50 rounded-lg transition-colors duration-200 relative">
                <TbBell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
                {(localStorage.getItem("email") || "U").charAt(0).toUpperCase()}
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
