"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyOTP } from "../../api/post/[...otpApi]/opt.api";
import { LogoMark } from "../../components/Logo";

export default function Otp() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    const userId = localStorage.getItem("userId");

    console.log("OTP Array:", otp);
    console.log("OTP String:", otpCode);
    console.log("User ID:", userId);

    if (otpCode.length !== 4) {
      setMessage("Please enter all 4 digits");
      return;
    }

    if (!userId) {
      setMessage("User ID not found. Please signup again.");
      return;
    }

    setLoading(true);
    try {
      const result = await verifyOTP(userId, otpCode);
      console.log("Verification Result:", result);

      if (result?.success) {
        router.push("/dashboard");
      } else {
        setMessage(result?.message || "Invalid OTP");
      }
    } catch (error) {
      setMessage("Error verifying OTP");
      console.error("Verification Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-black flex justify-center items-center min-h-screen px-4 overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-white/[0.06] blur-3xl" />
      <div className="relative bg-neutral-950 w-full max-w-md p-8 rounded-2xl border border-white/10 shadow-[0_0_60px_-15px_rgba(255,255,255,0.08)]">
        <div className="flex flex-col justify-center items-center space-y-3">
          <LogoMark className="size-12 mb-3" />
          <h1 className="text-white text-center text-4xl tracking-tighter font-semibold">
            OTP Verification
          </h1>

          <p className="text-sm text-neutral-500">
            4-digit code sent to your email address
          </p>
        </div>
        <div className="flex gap-3 justify-center mt-10 mb-4">
          {otp.map((_, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={otp[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="bg-black text-white border border-white/10 focus:outline-none focus:border-white/60 focus:ring-4 focus:ring-white/5 p-4 w-16 h-16 text-center text-2xl font-semibold rounded-xl transition-colors"
            />
          ))}
        </div>

        {message && (
          <div
            className={`mt-4 text-center text-sm ${
              message.includes("successfully")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="mt-8 w-full cursor-pointer p-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
}
