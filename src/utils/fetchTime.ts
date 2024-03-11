import { API_URL } from "@/utils/apiConfig";

export const fetchTime = async (city: string) => {
  try {
    const response = await fetch(`${API_URL}timezone/${city}`);
    const data = await response.json();

    const hour = data.datetime.slice(11, 13);
    const minute = data.datetime.slice(14, 16);
    const second = data.datetime.slice(17, 19);
    return {
      id: Math.random().toString(),
      name: city,
      hour,
      minute,
      second,
    };
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    return null;
  }
};
