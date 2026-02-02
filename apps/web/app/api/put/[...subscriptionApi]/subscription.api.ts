import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const EditSubscription = async (id: string, data: any) => {
  try {
    const response = await axios.put(
      `${API_URL}/subscription/update-subscription/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(`Error while editing subscription ${error}`);
  }
};
