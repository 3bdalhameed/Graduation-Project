import { API_BASE_URL, getAuthHeader } from "./config";

export const fetchNotifications = async () => {
  const response = await fetch(`${API_BASE_URL}/notifications/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(), // Assuming token auth
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
};
