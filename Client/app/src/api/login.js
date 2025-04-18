// API methods for login
import { API_BASE_URL } from "./config";

/**
 * Logs in a user with username and password
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Promise} Promise resolving to authentication data with access token
 */
export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.detail || "Invalid username or password");
  }
  
  return data;
};