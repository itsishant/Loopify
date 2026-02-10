import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const threeDayMailerReminderApi = async (data: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/post/three-day-reminder/${data?._id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(`Error in threeDayMailerReminderApi: ${error}`);
    return {
      success: false,
    };
  }
};
