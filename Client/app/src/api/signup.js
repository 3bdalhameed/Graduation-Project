// API methods for signup
import { API_BASE_URL } from "./config";

/**
 * Registers a new user
 * @param {Object} userData - The user registration data
 * @returns {Promise} Promise resolving to the registered user data
 */
export const signup = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.detail || "Registration failed");
  }
  
  return data;
};