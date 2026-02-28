"use client";

import Link from "next/link";
import { useState } from "react";
import { LoginUser } from "../api/post/[...loginApi]/login.api";
import { useRouter } from "next/navigation";

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
        stroke="white"
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
        setError(result?.message || "Incorrect email or password. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black flex justify-center items-center min-h-screen px-4">
      <div className="bg-gray-900 w-full max-w-md p-8 shadow-lg rounded-lg">
        <div className="text-white flex justify-center items-center font-sans text-4xl sm:text-5xl tracking-tight font-semibold">
          Log in
        </div>

        <div className="mt-10">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            type="text"
            className="mt-4 w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            type="password"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="mt-4 w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
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
          className="mt-6 w-full flex justify-center items-center gap-2 p-3 rounded bg-blue-800 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {loading ? <><Spinner /><span>Logging in...</span></> : "Log in"}
        </button>

        <div className="flex justify-center items-center mt-6">
          <span className="text-neutral-400 text-sm">
            Don't have an account yet?{" "}
            <Link href="/signup">
              <span className="text-blue-300 cursor-pointer hover:text-blue-400">
                Sign up
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
