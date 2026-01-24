"use client";

import { motion } from "motion/react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/400-italic.css";
import { useRouter } from "next/navigation";
import { GoArrowRight } from "react-icons/go";
import { MdAttachMoney } from "react-icons/md";
export const LandingPage = () => {
  const route = useRouter();

  return (
    <motion.div
      className="flex justify-center min-h-screen bg-gray-950"
      style={{
        backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)
          `,
        backgroundSize: "120px 120px",
      }}
    >
      <div className="w-full flex flex-col items-center">
        {/* <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex justify-center ite p-8 bg-clip-text text-transparent bg-gradient-to-r from-neutral-400 to-neutral-400 md:text-4xl lg:text-7xl font-sans font-bold tracking-tight leading-[1.2] pb-6"
        >
          {" "}
          <span>LOOPIFY</span>
        </motion.div> */}
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
              Home
            </p>
            <p className="text-gray-400 cursor-pointer hover:text-gray-200">
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
          className="text-xl mt-7 font-sans font-light text-gray-400"
          style={{
            fontFamily: "Poppins",
          }}
        >
          <p className="text-center font-extralight text-gray-400">
            Loopify is a smart platform that helps you
          </p>
          <p className="text-xl font-light text-gray-400">
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
    </motion.div>
  );
};

export default LandingPage;
