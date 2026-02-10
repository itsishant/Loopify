import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const thirtyDayMailerReminderApi = async (data: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/post/thirty-day-reminder/${data?._id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(`Error in thirtyDayMailerReminderApi: ${error}`);
    return {
      success: false,
    };
  }
};
