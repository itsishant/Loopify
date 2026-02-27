import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const sevenDayMailerReminderApi = async (data: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/post/seven-day-reminder/${data?._id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(`Error in sevenDayMailerReminderApi: ${error}`);
    return {
      success: false,
    };
  }
};
