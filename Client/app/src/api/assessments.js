import { API_BASE_URL, getHeaders, handleApiError, createRequestConfig } from './config';

/**
 * Fetches all assessments from the API
 * @param {string} token - Bearer token required
 * @returns {Promise<Array>} - List of assessments
 */
export const fetchAssessments = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/assessments/`, {
      headers: getHeaders(token)
    });

    if (!response.ok) {
      return handleApiError(response, "Failed to fetch assessments");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw error;
  }
};

/**
 * Creates a new assessment
 * @param {Object} data - Assessment data
 * @param {string} token - Bearer token
 * @returns {Promise<Object>} - Created assessment
 */
export const createAssessment = async (data, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/assessments/`, 
      createRequestConfig('POST', data, token)
    );

    if (!response.ok) {
      return handleApiError(response, "Failed to create assessment");
    }

    return response.json();
  } catch (error) {
    console.error("Error creating assessment:", error);
    throw error;
  }
};

/**
 * Updates an existing assessment
 * @param {number} id - Assessment ID
 * @param {Object} data - Updated assessment data
 * @param {string} token - Bearer token
 * @returns {Promise<Object>} - Updated assessment
 */
export const updateAssessment = async (id, data, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/assessments/${id}/`, 
      createRequestConfig('PUT', data, token)
    );

    if (!response.ok) {
      return handleApiError(response, `Failed to update assessment with ID: ${id}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error updating assessment ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes an assessment
 * @param {number} id - Assessment ID
 * @param {string} token - Bearer token
 * @returns {Promise<void>}
 */
export const deleteAssessment = async (id, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/assessments/${id}/delete/`, 
      createRequestConfig('DELETE', null, token)
    );

    if (!response.ok) {
      return handleApiError(response, `Failed to delete assessment with ID: ${id}`);
    }
    
    return;
  } catch (error) {
    console.error(`Error deleting assessment ${id}:`, error);
    throw error;
  }
};

/**
 * Submits a solved assessment result to the backend
 * @param {Object} data - { assessment, score }
 * @param {string} token - Bearer token
 * @returns {Promise<Object>} - API response JSON
 */
export const submitSolvedAssessment = async (data, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/solved-assessments/`, 
      createRequestConfig('POST', data, token)
    );

    if (!response.ok) {
      return handleApiError(response, "Failed to submit solved assessment");
    }

    return response.json();
  } catch (error) {
    console.error("Error submitting assessment result:", error);
    throw error;
  }
};
  
/**
 * Fetches solved assessments for the authenticated user
 * @param {string} token - Bearer token
 * @returns {Promise<Array>} - List of solved assessments
 */
export const fetchSolvedAssessments = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/solved-assessments/`, {
      headers: getHeaders(token)
    });

    if (!response.ok) {
      return handleApiError(response, "Failed to fetch solved assessments");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching solved assessments:", error);
    throw error;
  }
};

/**
 * Fetches a specific assessment by ID
 * @param {number} id - Assessment ID
 * @param {string} token - Bearer token
 * @returns {Promise<Object>} - Assessment data
 */
export const fetchAssessmentById = async (id, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/assessments/${id}/`, {
      headers: getHeaders(token)
    });

    if (!response.ok) {
      return handleApiError(response, `Failed to fetch assessment with ID: ${id}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching assessment ${id}:`, error);
    throw error;
  }
};
