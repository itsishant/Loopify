import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const LoginUser = async (
  email: string,
  password: string,
) => {
  try {
    const response = await axios.post(`${API_URL}/login/login-user`, {
      email: email,
      password: password,
    });

    localStorage.setItem("userId", response?.data?._id);
    localStorage.setItem("token", response?.data?.token);
    return response.data;
  } catch (error) {
    console.log("Error while logging in user api");
    return { success: false };
  }
};
