"use client";

import { motion } from "motion/react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/400-italic.css";
import { useRouter } from "next/navigation";
import { GoArrowRight } from "react-icons/go";
import { MdAttachMoney } from "react-icons/md";
import { CardLanding } from "./[...landingCards]/landingCard.landing";
import { TrustedPartner } from "./[...landingSubscription]/landingPartners.landing";
import { LandingSteps } from "./[...landingSteps]/landingSetps.landing";
import { LandingPrices } from "./[...landingPrice]/landingPrice.landing";
export const LandingPage = () => {
  const route = useRouter();

  return (
    <motion.div
      className="flex flex-col justify-center font-poppins bg-black"
      style={{
        backgroundSize: "90px 90px",
      }}
    >
      <div className="w-full font-poppins flex flex-col items-center min-h-screen">
        <div
          className="relative h-16 min-w-6xl border font-poppins border-gray-600 bg-gray/30 backdrop-blur-sm flex items-center mt-7.5 rounded-full py-2 pl-0 pr-8"
          style={{ fontFamily: "Poppins" }}
        >
          <div className="ml-2">
            <img
              src="logo.png"
              className="size-13.5 rounded-full object-cover"
              alt=""
            />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 flex font-poppins space-x-12 text-lg">
            <p
              onClick={() => route.push("/")}
              className="text-gray-400 cursor-pointer hover:text-gray-200"
            >
              Home
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

          <div className="ml-auto">
            <motion.p
              onClick={() => route.push("/login")}
              whileHover="hover"
              className="text-gray-400 flex items-center bg-gray/40 backdrop-blur-md px-5 py-3 rounded-full cursor-pointer"
            >
              <motion.span
                variants={{
                  hover: { x: 0 },
                }}
              >
                Login
              </motion.span>

              <motion.span
                initial={{ x: 0, rotate: -40 }}
                variants={{
                  hover: { x: 4, rotate: 0 },
                }}
                className="ml-0.5"
              >
                <GoArrowRight className="size-5 mt-0.5" />
              </motion.span>
            </motion.p>
          </div>
        </div>

        <div className="flex justify-center items-center mt-[169px]">
          <p
            className="text-6xl tracking-normal text-green-500 font-extrabold"
            style={{
              fontFamily: "Poppins",
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            Manage subscriptions in one place <br></br>
            <span className="flex justify-center mt-2 items-center text-6xl">
              Zero stress & Zero Pain
            </span>
          </p>
        </div>
        <div
          className="text-xl mt-7 font-sans font-light text-gray-500"
          style={{
            fontFamily: "Poppins",
          }}
        >
          <p className="text-center font-extralight text-gray-500">
            Loopify is a smart platform that helps you
          </p>
          <p className="text-xl font-light text-gray-500">
            manage all your subscriptions from one-place.
          </p>
        </div>

        <div
          className="flex justify-center items-center mt-22.5 space-x-15"
          style={{
            fontFamily: "Poppins",
          }}
        >
          <motion.div
            whileHover="hover"
            className="flex justify-between items-center rounded-xl hover:cursor-pointer bg-blue-800 p-4"
          >
            <motion.button
              variants={{
                hover: {
                  x: 0,
                },
              }}
              onClick={() => route.push("/signup")}
              className="text-xl text-neutral-100 hover:cursor-pointer"
            >
              {" "}
              Get Started
            </motion.button>
            <motion.span
              initial={{ x: 0, rotate: -40 }}
              variants={{
                hover: { x: 4, rotate: 0 },
              }}
            >
              <GoArrowRight className="ml-0.5 mt-0.5 size-6" />
            </motion.span>
          </motion.div>
          <div className="group flex justify-between items-center rounded-xl bg-gray-700 p-4 cursor-pointer">
            <button className="text-xl text-neutral-100 cursor-pointer">
              View Pricing
            </button>

            <MdAttachMoney className="size-6 ml-0.5 text-neutral-100 group-hover:text-green-500 transition-colors" />
          </div>
        </div>
      </div>
      <CardLanding />
      <TrustedPartner />
      <LandingSteps />
      <LandingPrices />
    </motion.div>
  );
};

export default LandingPage;
