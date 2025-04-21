// API methods for authentication
import axios from "axios";
import { API_BASE_URL, getAuthHeader } from "./config";

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
  
  
  
  if (response.ok) {
    const data = await response.json();
    console.log("Access Token:", data.access_token); // Log the token
    localStorage.setItem("access_token", data.access_token); // Save access token
    return data;
  } else {
    alert("Login failed. Please check your credentials.");
    return null;
  }
  
  
};

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

/**
 * Validates a JWT token
 * @param {string} token - The JWT token to validate
 * @returns {Promise} Promise resolving to the token payload if valid
 */
export const validateToken = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }

  const response = await fetch(`${API_BASE_URL}/validate-token/`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({ token }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error("Invalid token");
  }
  
  return data;
};

/**
 * Logs in a school user with username and password using axios
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Promise} Promise resolving to authentication data with access token
 */
export const schoolLogin = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || "Login failed");
    }
    throw error;
  }
};

