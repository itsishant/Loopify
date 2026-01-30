"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyOTP } from "../../api/post/[...otpApi]/opt.api";

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
        alert("OTP verified successfully!");
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
    <div className="bg-black flex justify-center items-center min-h-screen">
      <div className="bg-gray-900 p-8 shadow-lg rounded-lg">
        <h1 className="text-neutral-200 text-center text-5xl font-medium">
          OTP Verification
        </h1>

        <div className="flex gap-4 justify-center mt-20">
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
              className="bg-gray-800 text-white border-2 border-gray-700 focus:outline-none focus:border-blue-500 p-4 w-14 h-14 text-center text-2xl font-bold rounded"
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
          className="mt-8 w-full p-3 rounded bg-blue-800 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
}
