"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { createUser } from "../api/post/[...signupApi]/signup.api";
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

function SignupContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const route = useRouter();

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/signup" });
    } catch {
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await createUser(email, password);
      if (result?.success) {
        localStorage.setItem("userId", result.data?._id || result.data?.id);
        localStorage.setItem("token", result.token || "");
        localStorage.setItem("email", email);
        route.push("/signup/otp");
      } else {
        setError(
          result?.message || "Failed to create account. Please try again.",
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
          Sign up
        </div>

        <div className="mt-8">
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            className="mt-4 w-full px-4 py-3 rounded-xl bg-black text-white placeholder:text-neutral-600 border border-white/10 focus:outline-none focus:border-white/60 focus:ring-4 focus:ring-white/5 transition-colors"
          />
          <input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            onKeyDown={(e) => e.key === "Enter" && handleSignup()}
            className="mt-4 w-full px-4 py-3 rounded-xl bg-black text-white placeholder:text-neutral-600 border border-white/10 focus:outline-none focus:border-white/60 focus:ring-4 focus:ring-white/5 transition-colors"
          />
        </div>

        {error && (
          <div className="mt-4 px-3 py-2 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="mt-6 w-full flex justify-center items-center gap-2 p-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {loading ? (
            <>
              <Spinner />
              <span>Creating account...</span>
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="flex justify-center items-center mt-5">
          <span className="text-neutral-400 text-sm">
            Already have an account?{" "}
            <Link href="/login">
              <span className="text-white font-medium underline decoration-white/30 underline-offset-4 cursor-pointer hover:decoration-white">
                Log in
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Signup() {
  return (
    <Suspense>
      <SignupContent />
    </Suspense>
  );
}
