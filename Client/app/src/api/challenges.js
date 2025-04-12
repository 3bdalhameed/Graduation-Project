// API methods for challenges
import { API_BASE_URL, getAuthHeader } from "./config";

/**
 * Fetches all challenges
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to challenges data
 */
export const fetchChallenges = async (token) => {
  const response = await fetch(`${API_BASE_URL}/challenges/`, {
    headers: getAuthHeader(token),
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch challenges");
  }
  
  return response.json();
};

/**
 * Fetches a specific challenge by ID
 * @param {number} challengeId - ID of the challenge to fetch
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to challenge data
 */
export const fetchChallengeById = async (challengeId, token) => {
  const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}/`, {
    headers: getAuthHeader(token),
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch challenge");
  }
  
  return response.json();
};

/**
 * Fetches solved challenges for the current user
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to solved challenges data
 */
export const fetchSolvedChallenges = async (token) => {
  const response = await fetch(`${API_BASE_URL}/solved-challenges/`, {
    headers: getAuthHeader(token),
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch solved challenges");
  }
  
  return response.json();
};

/**
 * Submits a flag for a challenge
 * @param {number} challengeId - ID of the challenge
 * @param {string} flag - Flag submitted by user
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to submission result
 */
export const submitFlag = async (challengeId, flag, token) => {
  const response = await fetch(`${API_BASE_URL}/challenges/submit/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
    body: JSON.stringify({ challenge_id: challengeId, flag }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.detail || "Flag submission failed");
  }
  
  return data;
};

/**
 * Creates a new challenge
 * @param {Object} challengeData - The challenge data to create
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to the created challenge
 */
export const createChallenge = async (challengeData, token) => {
  const response = await fetch(`${API_BASE_URL}/challenge/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
    body: JSON.stringify(challengeData),
  });
  
  if (!response.ok) {
    throw new Error("Failed to create challenge");
  }
  
  return response.json();
};

/**
 * Updates an existing challenge
 * @param {number} challengeId - The ID of the challenge to update
 * @param {Object} challengeData - The updated challenge data
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to the updated challenge
 */
export const updateChallenge = async (challengeId, challengeData, token) => {
  const response = await fetch(`${API_BASE_URL}/challenge/${challengeId}/edit/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
    body: JSON.stringify(challengeData),
  });
  
  if (!response.ok) {
    throw new Error("Failed to update challenge");
  }
  
  return response.json();
};

/**
 * Deletes a challenge
 * @param {number} challengeId - The ID of the challenge to delete
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving when the challenge is deleted
 */
export const deleteChallenge = async (challengeId, token) => {
  const response = await fetch(`${API_BASE_URL}/challenge/${challengeId}/delete/`, {
    method: "DELETE",
    headers: getAuthHeader(token),
  });
  
  if (!response.ok) {
    throw new Error("Failed to delete challenge");
  }
  
  return true;
};