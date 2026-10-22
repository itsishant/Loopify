"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { GoArrowRight } from "react-icons/go";
import { CardLanding } from "./[...landingCards]/landingCard.landing";
import { TrustedPartner } from "./[...landingSubscription]/landingPartners.landing";
import { LandingSteps } from "./[...landingSteps]/landingSetps.landing";
import { useEffect, useState } from "react";
import { Logo } from "../components/Logo";

export const LandingPage = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        route.push("/dashboard");
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("Error checking authentication", error);
    }
  }, [route]);

  if (loading) return null;

  const scrollToExplore = () =>
    document
      .getElementById("explore")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[900px] opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 60% 55% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 55% at 50% 0%, black 30%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute -top-56 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.07] blur-3xl" />

      <nav className="sticky top-6 z-50 mx-auto mt-6 flex h-16 w-full max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/60 pl-3 pr-2 backdrop-blur-xl">
        <button
          onClick={() => route.push("/")}
          className="cursor-pointer"
          aria-label="Loopify home"
        >
          <Logo className="size-10" textClassName="text-lg" />
        </button>

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-10 text-sm">
          <button
            onClick={() => route.push("/")}
            className="cursor-pointer text-neutral-400 transition-colors hover:text-white"
          >
            Home
          </button>
          <button
            onClick={scrollToExplore}
            className="cursor-pointer text-neutral-400 transition-colors hover:text-white"
          >
            Explore
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => route.push("/login")}
            className="cursor-pointer rounded-full px-4 py-2 text-sm text-neutral-300 transition-colors hover:text-white"
          >
            Log in
          </button>
          <motion.button
            whileHover="hover"
            onClick={() => route.push("/signup")}
            className="flex cursor-pointer items-center gap-1 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
          >
            Sign up
            <motion.span
              initial={{ x: 0, rotate: -40 }}
              variants={{ hover: { x: 3, rotate: 0 } }}
            >
              <GoArrowRight className="size-4" />
            </motion.span>
          </motion.button>
        </div>
      </nav>

      <section className="relative flex flex-col items-center px-6 pt-32 pb-36 text-center">
        <div className="animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-neutral-400">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-white" />
          </span>
          Smart reminders before every renewal
        </div>

        <h1
          className="animate-fade-up bg-linear-to-b from-white to-neutral-400 bg-clip-text pb-2 text-7xl leading-[1.05] font-semibold tracking-tighter text-transparent"
          style={{ animationDelay: "60ms" }}
        >
          Manage subscriptions
          <br />
          in one place
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-neutral-400"
          style={{ animationDelay: "120ms" }}
        >
          Zero stress &amp; zero pain. Loopify is a smart platform that helps
          you manage all your subscriptions from one place.
        </p>

        <div
          className="animate-fade-up mt-10 flex items-center gap-3"
          style={{ animationDelay: "180ms" }}
        >
          <motion.button
            whileHover="hover"
            onClick={() => route.push("/signup")}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-medium text-black transition-colors hover:bg-neutral-200"
          >
            Get Started
            <motion.span
              initial={{ x: 0, rotate: -40 }}
              variants={{ hover: { x: 4, rotate: 0 } }}
            >
              <GoArrowRight className="size-5" />
            </motion.span>
          </motion.button>
          <button
            onClick={scrollToExplore}
            className="cursor-pointer rounded-full border border-white/15 px-7 py-3.5 text-base font-medium text-white transition-colors hover:border-white/30 hover:bg-white/5"
          >
            See how it works
          </button>
        </div>
      </section>

      <div id="explore" className="scroll-mt-28">
        <CardLanding />
      </div>
      <TrustedPartner />
      <LandingSteps />

      <footer className="mt-40 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-10">
          <div className="flex items-center gap-4">
            <Logo className="size-8" textClassName="text-base" />
            <span className="text-sm text-neutral-600">
              © {new Date().getFullYear()} Loopify
            </span>
          </div>
          <p className="text-sm text-neutral-500">
            Made by{" "}
            <a
              href="https://x.com/Ishant23April"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
            >
              Ishant
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
