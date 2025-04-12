// API methods for teams
import axios from "axios";
import { API_BASE_URL, getAuthHeader } from "./config";

/**
 * Fetches all teams from the API
 * @returns {Promise} Promise resolving to teams data
 */
export const fetchTeams = async () => {
  const response = await fetch(`${API_BASE_URL}/teams/`);

  if (!response.ok) {
    throw new Error("Failed to fetch teams");
  }

  return response.json();
};

/**
 * Fetches teams for the scoreboard with points and ranks
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to scoreboard data
 */
export const fetchScoreboard = async (token) => {
  const response = await fetch(`${API_BASE_URL}/scoreboard/`, {
    headers: getAuthHeader(token),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch teams");
  }

  return response.json();
};

/**
 * Checks the current user's team
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to the user's team data
 */
export const checkUserTeam = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teams/check/`, {
      headers: getAuthHeader(token),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

/**
 * Fetches detailed information about a specific team
 * @param {string} teamId - ID of the team to retrieve
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to the team's detailed information
 */
export const fetchTeamDetails = async (teamId, token) => {
  const response = await fetch(`${API_BASE_URL}/teams/${teamId}/`, {
    headers: getAuthHeader(token),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch team details");
  }

  return response.json();
};

/**
 * Creates a new team
 * @param {string} teamName - The name for the new team
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to the created team data
 */
export const createTeam = async (teamName, token) => {
  const response = await fetch(`${API_BASE_URL}/teams/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
    body: JSON.stringify({ name: teamName }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create team");
  }

  return data;
};

/**
 * Joins an existing team using team code
 * @param {string} teamCode - The code of the team to join
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to the joined team data
 */
export const joinTeam = async (teamCode, token) => {
  const response = await fetch(`${API_BASE_URL}/teams/join/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
    body: JSON.stringify({ team_code: teamCode }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to join team");
  }

  return data;
};
