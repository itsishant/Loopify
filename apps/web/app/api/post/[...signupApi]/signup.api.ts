"use client";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const createUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signup/create-user`, {
      email: email,
      password: password,
    });

    localStorage.setItem("userId", response?.data?.data?._id);

    return response.data;
  } catch (error) {
    console.log("Error while creating user api");
  }
};
