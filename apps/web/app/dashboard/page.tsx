"use client";

import { motion } from "motion/react";
import "@fontsource/poppins/400.css";
import { TbLogout } from "react-icons/tb";
import "@fontsource/poppins/400-italic.css";
import { GoArrowRight } from "react-icons/go";
import { DashboardSubscription } from "./[...dashboardMySubscription]/dashboardSubscription.dashboard";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const route = useRouter();
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="relative h-16 min-w-6xl border border-gray-600 bg-gray/30 backdrop-blur-sm flex items-center mt-7.5 rounded-full py-2 pl-0 pr-8"
        style={{ fontFamily: "Poppins" }}
      >
        <div className="ml-2">
          <img
            src="logo.png"
            className="size-13.5 rounded-full object-cover"
            alt=""
          />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex space-x-12 text-lg">
          <p className="text-gray-400 cursor-pointer hover:text-gray-200">
            My Subscriptions
          </p>
          <p
            onClick={() => window.scrollTo(2, 500)}
            className="text-gray-400 cursor-pointer hover:text-gray-200"
          >
            Explore
          </p>
          <p className="text-gray-400 cursor-pointer hover:text-gray-200">
            Pricing
          </p>
          <p className="text-gray-400 cursor-pointer hover:text-gray-200">
            Community
          </p>
        </div>

        <div className="absolute right-4">
          <motion.p
            whileHover="hover"
            className="text-gray-400 hover:text-red-800 font-semibold flex items-center bg-gray/40 backdrop-blur-md px-5 py-3 rounded-full cursor-pointer"
          >
            <motion.span
              variants={{
                hover: { x: 0 },
              }}
            >
              <TbLogout
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userId");
                  route.push("/");
                }}
                size={25}
                className="text-rose-700"
              />
            </motion.span>

            <motion.span
              initial={{ x: 0, rotate: -40 }}
              variants={{
                hover: { x: 4, rotate: 0 },
              }}
              className="ml-0.5"
            ></motion.span>
          </motion.p>
        </div>
      </div>
      <DashboardSubscription />
    </div>
  );
}
