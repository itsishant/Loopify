"use client";
import { motion } from "motion/react";
export const LandingPage = () => {
  return (
    <motion.div className="flex justify-center min-h-screen bg-neutral-900">
      <div className="w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex justify-center ite p-8 bg-clip-text text-transparent bg-gradient-to-r from-neutral-400 to-neutral-400 md:text-4xl lg:text-7xl font-sans font-bold tracking-tight leading-[1.2] pb-6"
        >
          {" "}
          <span>LOOPIFY</span>
        </motion.div>
        <div
          className="w-[960px] h-[500px] bg-neutral-700 rounded-xl mx-auto mt-10 relative overflow-hidden"
          style={{
            backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)
          `,
            backgroundSize: "50px 50px",
          }}
        >
          <div className="text-shadow-emerald-600 text-emerald-500 text-center md:text-lg p-8 lg:text-2xl font-sans font-medium tracking-tight relative z-10">
            Mangae Subscription Easilly.
          </div>
        </div>
      </div>
    </motion.div>
  );
};
