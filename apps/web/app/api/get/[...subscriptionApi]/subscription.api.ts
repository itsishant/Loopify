import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const GetSubscription = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/subscription/get-subscription/${localStorage.getItem("userId")}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data.data.subscription;
  } catch (error) {
    console.log(`Error while fetching subscriptions ${error}`);
  }
};
