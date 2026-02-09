import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const verifyOTP = async (userId: string, otp: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-otp`, {
      userId,
      otp,
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Error while verifying OTP:",
      error.response?.data || error.message,
    );

    return {
      success: false,
      message: error?.response?.data?.message || "Error verifying OTP",
    };
  }
};
