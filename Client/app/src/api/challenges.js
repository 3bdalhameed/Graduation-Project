// API methods for challenges

/**
 * Fetches all challenges from the API
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to challenges data
 */
export const fetchChallenges = async (token) => {
  const response = await fetch("http://127.0.0.1:8000/api/challenge/", {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch challenges");
  }
  
  return response.json();
};

/**
 * Fetches solved challenges for the current user
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to solved challenges data
 */
export const fetchSolvedChallenges = async (token) => {
  const response = await fetch("http://127.0.0.1:8000/api/solved-challenges/", {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch solved challenges");
  }
  
  return response.json();
};

/**
 * Submits a flag for a specific challenge
 * @param {number} challengeId - The ID of the challenge
 * @param {string} flag - The flag to submit
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to submission result
 */
export const submitFlag = async (challengeId, flag, token) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/challenge/${challengeId}/submit/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ flag }),
    }
  );
  
  return response.json();
};

/**
 * Creates a new challenge
 * @param {Object} challengeData - The challenge data to create
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to the created challenge
 */
export const createChallenge = async (challengeData, token) => {
  const response = await fetch("http://127.0.0.1:8000/api/challenge/create/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
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
  const response = await fetch(`http://127.0.0.1:8000/api/challenge/${challengeId}/edit/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
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
  const response = await fetch(`http://127.0.0.1:8000/api/challenge/${challengeId}/delete/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  
  if (!response.ok) {
    throw new Error("Failed to delete challenge");
  }
  
  return true;
};