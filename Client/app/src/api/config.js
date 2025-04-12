/**
 * API Configuration
 * Central place for API related configuration
 */

// Base API URL
export const API_BASE_URL = "http://localhost:8000/api";

// Common headers
export const getAuthHeader = (token) => {
  return {
    Authorization: `Bearer ${token}`
  };
};