"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { createUser } from "../api/post/[...signupApi]/signup.api";

export default function Signup() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/signup" });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="bg-black  flex justify-center items-center min-h-screen">
      <div className="bg-gray-900 w-lg h-140 p-8 shadow-lg rounded-lg">
        <div className="text-white flex justify-center items-center font-sans text-5xl tracking-tight font-semibold">
          Sign up
        </div>
        <div className="mt-16 ">
          <input
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            className="mt-10 w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          ></input>

          <input
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className="mt-10 w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          ></input>
        </div>
        <div className="flex justify-center items-center ">
          <button
            onClick={async () => {
              const result = await createUser(email, password);
              if (result?.success) {
                localStorage.setItem(
                  "userId",
                  result.data?._id || result.data?.id,
                );
                localStorage.setItem("token", result.token || "");
                localStorage.setItem("email", email);
                route.push("/signup/otp");
              } else {
                console.log(result?.message || "Failed to create account");
              }
            }}
            className="flex justify-center items-center w-full hover:cursor-pointer"
          >
            <div className="mt-10 w-full flex justify-center  items-center p-3 rounded bg-blue-800 text-white font-semibold hover:bg-blue-700 text-center">
              Create Account
            </div>
          </button>
        </div>

        <div
          className="flex justify-center
        items-center mt-10"
        >
          <span className="text-neutral-400">
            Already have an account ?
            <Link href="/login">
              <span className="text-blue-300 cursor-pointer hover:text-blue-400 ">
                {" "}
                Log in
              </span>
            </Link>
          </span>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="mt-4 cursor-pointer w-full flex items-center justify-center gap-3 p-3 rounded bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
}
