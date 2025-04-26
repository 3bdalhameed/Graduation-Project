// API methods for users
import axios from "axios";
import { API_BASE_URL, getAuthHeader } from "./config";

/**
 * Fetches all users from the API
 * @returns {Promise} Promise resolving to users data
 */
export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users/`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  
  return response.json();
};


/**
 * Fetches the current logged-in user's profile data.
 * @param {string} token - JWT token
 * @returns {Promise<Object>} - User profile data (username, email, is_staff, is_superuser)
 */
export const fetchUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile/`, {
      headers: getAuthHeader(token),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw new Error("Failed to fetch user profile");
  }
};


/**
 * Logs out the current user
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving when the user is logged out
 */
export const logout = async (setIsLoggedin, navigate) => {
  const refreshToken = localStorage.getItem("refresh_token");

  // Clear tokens from storage
  localStorage.removeItem("access_token");
  if (refreshToken) {
    localStorage.removeItem("refresh_token");
  }

  // Update login state
  setIsLoggedin(false);

  try {
    const response = await fetch(`${API_BASE_URL}/logout/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      console.log("Logout successful");
    } else {
      console.error("Failed to logout:", response.statusText);
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }

  navigate("/");
};

/**
 * Verifies a user's signup OTP code
 * @param {Object} verifyData - Data containing email, otp, username and password
 * @returns {Promise} Promise resolving to verification result
 */
export const verifyOTP = async (verifyData) => {
  const response = await fetch(`${API_BASE_URL}/verify-signup-otp/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(verifyData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.detail || "Failed to verify OTP");
  }
  
  return data;
};

/**
 * Checks if the user is authenticated
 * @returns {Promise} Promise resolving to authentication status
 */
export const checkAuthentication = async () => {
  const response = await fetch("/api/check-authentication/");
  
  if (!response.ok) {
    throw new Error("Authentication check failed");
  }
  
  return response.json();
};

/**
 * Fetches user home data
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to user home data
 */
export const fetchHomeData = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/home/`, {
    headers: getAuthHeader(token),
  });
  
  return response.data;
};

/**
 * Fetches user's solved challenges
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to solved challenges data
 */
export const fetchUserSolvedChallenges = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/solved-challenges/`, {
    headers: getAuthHeader(token),
  });
  
  return response.data;
};



/**
 * Fetches users for the scoreboard with points
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to scoreboard data
 */
export const fetchUserScoreboard = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/scoreboard/`, {
    headers: getAuthHeader(token),
  });
  return response.data;
};


