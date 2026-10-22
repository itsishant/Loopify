"use client";

import Link from "next/link";
import { useState } from "react";
import { LoginUser } from "../api/post/[...loginApi]/login.api";
import { useRouter } from "next/navigation";
import { LogoMark } from "../components/Logo";

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="60"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const route = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await LoginUser(email, password);
      if (result?.success) {
        localStorage.setItem("token", result?.token || "");
        localStorage.setItem("userId", result?.userId || "");
        route.push("/dashboard");
      } else {
        setError(
          result?.message || "Incorrect email or password. Please try again.",
        );
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-black flex justify-center items-center min-h-screen px-4 overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-white/[0.06] blur-3xl" />
      <div className="relative bg-neutral-950 w-full max-w-md p-8 rounded-2xl border border-white/10 shadow-[0_0_60px_-15px_rgba(255,255,255,0.08)]">
        <Link href="/" className="flex justify-center mb-6" aria-label="Loopify home">
          <LogoMark className="size-12" />
        </Link>
        <div className="text-white flex justify-center items-center font-sans text-4xl tracking-tighter font-semibold">
          Log in
        </div>

        <div className="mt-10">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            type="text"
            className="mt-4 w-full px-4 py-3 rounded-xl bg-black text-white placeholder:text-neutral-600 border border-white/10 focus:outline-none focus:border-white/60 focus:ring-4 focus:ring-white/5 transition-colors"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            type="password"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="mt-4 w-full px-4 py-3 rounded-xl bg-black text-white placeholder:text-neutral-600 border border-white/10 focus:outline-none focus:border-white/60 focus:ring-4 focus:ring-white/5 transition-colors"
          />
        </div>

        {error && (
          <div className="mt-4 px-3 py-2 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 w-full flex justify-center items-center gap-2 p-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {loading ? (
            <>
              <Spinner />
              <span>Logging in...</span>
            </>
          ) : (
            "Log in"
          )}
        </button>

        <div className="flex justify-center items-center mt-6">
          <span className="text-neutral-400 text-sm">
            Don't have an account yet?{" "}
            <Link href="/signup">
              <span className="text-white font-medium underline decoration-white/30 underline-offset-4 cursor-pointer hover:decoration-white">
                Sign up
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
