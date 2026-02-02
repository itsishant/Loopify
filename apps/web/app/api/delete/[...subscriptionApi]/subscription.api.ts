import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const DeleteSubscription = async (id: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/subscription/delete-subscription/${id}`,
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
      },
    );

    return response.data;
  } catch (error) {
    console.log(`Error while deleting subscription ${error}`);
  }
};
