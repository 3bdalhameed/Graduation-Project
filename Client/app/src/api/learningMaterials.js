import { API_BASE_URL, getHeaders, handleApiError, createRequestConfig } from './config';

/**
 * Fetches all learning materials from the API
 * @param {string} token - Bearer token (optional if public)
 * @returns {Promise<Array>} - List of learning materials
 */
export const fetchLearningMaterials = async (token = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/learning-materials/`, {
      headers: getHeaders(token)
    });

    if (!response.ok) {
      return handleApiError(response, "Failed to fetch learning materials");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching learning materials:", error);
    throw error;
  }
};

/**
 * Fetches a specific learning material by ID
 * @param {number} id - Learning material ID
 * @param {string} token - Bearer token (optional if public)
 * @returns {Promise<Object>} - Learning material data
 */
export const fetchLearningMaterialById = async (id, token = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/learning-materials/${id}/`, {
      headers: getHeaders(token)
    });

    if (!response.ok) {
      return handleApiError(response, `Failed to fetch learning material with ID: ${id}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching learning material ${id}:`, error);
    throw error;
  }
};

/**
 * Creates a new learning material
 * @param {Object} data - Learning material data
 * @param {string} token - Bearer token
 * @returns {Promise<Object>} - Created learning material
 */
export const createLearningMaterial = async (data, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/learning-materials/`, 
      createRequestConfig('POST', data, token)
    );

    if (!response.ok) {
      return handleApiError(response, "Failed to create learning material");
    }

    return response.json();
  } catch (error) {
    console.error("Error creating learning material:", error);
    throw error;
  }
};

/**
 * Updates an existing learning material
 * @param {number} id - Learning material ID
 * @param {Object} data - Updated learning material data
 * @param {string} token - Bearer token
 * @returns {Promise<Object>} - Updated learning material
 */
export const updateLearningMaterial = async (id, data, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/learning-materials/${id}/`, 
      createRequestConfig('PUT', data, token)
    );

    if (!response.ok) {
      return handleApiError(response, `Failed to update learning material with ID: ${id}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error updating learning material ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a learning material
 * @param {number} id - Learning material ID
 * @param {string} token - Bearer token
 * @returns {Promise<void>}
 */
export const deleteLearningMaterial = async (id, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/learning-materials/${id}/`, 
      createRequestConfig('DELETE', null, token)
    );

    if (!response.ok) {
      return handleApiError(response, `Failed to delete learning material with ID: ${id}`);
    }

    return;
  } catch (error) {
    console.error(`Error deleting learning material ${id}:`, error);
    throw error;
  }
};

/**
 * Fetches learning materials by category
 * @param {string} category - Category name
 * @param {string} token - Bearer token (optional if public)
 * @returns {Promise<Array>} - List of learning materials in category
 */
export const fetchLearningMaterialsByCategory = async (category, token = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/learning-materials/category/${category}/`, {
      headers: getHeaders(token)
    });

    if (!response.ok) {
      return handleApiError(response, `Failed to fetch learning materials for category: ${category}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching learning materials for category ${category}:`, error);
    throw error;
  }
};

/**
 * Fetches questions associated with a learning material
 * @param {number} materialId - Learning material ID
 * @param {string} token - Bearer token (optional if public)
 * @returns {Promise<Array>} - List of questions
 */
export const fetchMaterialQuestions = async (materialId, token = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/learning-materials/${materialId}/questions/`, {
      headers: getHeaders(token)
    });

    if (!response.ok) {
      return handleApiError(response, `Failed to fetch questions for material ID: ${materialId}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching questions for material ${materialId}:`, error);
    throw error;
  }
};