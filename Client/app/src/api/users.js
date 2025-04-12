// API methods for users
import axios from "axios";

/**
 * Fetches all users from the API
 * @returns {Promise} Promise resolving to users data
 */
export const fetchUsers = async () => {
  const response = await fetch("http://localhost:8000/api/users/");
  
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  
  return response.json();
};

/**
 * Logs out the current user
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving when the user is logged out
 */
export const logout = async (token) => {
  const response = await fetch("http://localhost:8000/api/logout/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error("Failed to logout");
  }
  
  return response.json();
};

/**
 * Verifies a user's signup OTP code
 * @param {Object} verifyData - Data containing email, otp, username and password
 * @returns {Promise} Promise resolving to verification result
 */
export const verifyOTP = async (verifyData) => {
  const response = await fetch("http://localhost:8000/api/verify-signup-otp/", {
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
  const response = await axios.get("http://localhost:8000/api/home/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

/**
 * Fetches user's solved challenges
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to solved challenges data
 */
export const fetchUserSolvedChallenges = async (token) => {
  const response = await axios.get("http://localhost:8000/api/solved-challenges/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};