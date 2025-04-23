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

/**
 * Creates common request headers with content type and optional auth token
 * @param {string} token - Authorization token (optional)
 * @returns {Object} - Headers object
 */
export const getHeaders = (token = null) => {
  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Generic API error handler
 * @param {Response} response - Fetch API response object
 * @param {string} errorMsg - Custom error message
 * @returns {Promise} - Rejects with appropriate error
 */
export const handleApiError = async (response, errorMsg = "API request failed") => {
  try {
    const errorData = await response.json();
    const errorMessage = errorData.detail || errorData.message || errorMsg;
    console.error(`${errorMsg}:`, errorData);
    throw new Error(errorMessage);
  } catch (e) {
    // If response can't be parsed as JSON
    if (e.name === 'SyntaxError') {
      const errorText = await response.text();
      console.error(`${errorMsg}: ${errorText}`);
      throw new Error(`${errorMsg} (${response.status})`);
    }
    throw e;
  }
};

/**
 * Helper function for creating API request config
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {Object} data - Request body data (optional)
 * @param {string} token - Authorization token (optional)
 * @returns {Object} - Request config for fetch API
 */
export const createRequestConfig = (method = 'GET', data = null, token = null) => {
  const config = {
    method,
    headers: getHeaders(token)
  };

  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    config.body = JSON.stringify(data);
  }

  return config;
};