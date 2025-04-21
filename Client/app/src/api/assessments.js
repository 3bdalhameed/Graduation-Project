const API_BASE_URL = "http://127.0.0.1:8000/api";

export const fetchAssessments = async (token) => {
  const res = await fetch(`${API_BASE_URL}/assessments/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch assessments");
  return res.json();
};

export const createAssessment = async (data, token) => {
  const res = await fetch(`${API_BASE_URL}/assessments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create assessment");
  return res.json();
};

export const updateAssessment = async (id, data, token) => {
  const res = await fetch(`${API_BASE_URL}/assessments/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update assessment");
  return res.json();
};

export const deleteAssessment = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/assessments/${id}/delete/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errText = await res.text(); // Optional: for debugging
    console.error("Delete failed:", errText);
    throw new Error("Failed to delete assessment");
  }
};


/**
 * Submits a solved assessment result to the backend
 * @param {Object} data - { assessment, assessment_name, score }
 * @param {string} token - Bearer token
 * @returns {Promise<Object>} - API response JSON
 */
export const submitSolvedAssessment = async (data, token) => {
    const response = await fetch(`${API_BASE_URL}/solved-assessments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to submit solved assessment:", error);
      throw new Error(error.detail || "Submission failed");
    }
  
    return response.json();
  };
  
/**
 * Fetches solved assessments for the authenticated user
 * @param {string} token - Bearer token
 * @returns {Promise<Array>} - List of solved assessments
 */
export const fetchSolvedAssessments = async (token) => {
  const response = await fetch(`${API_BASE_URL}/solved-assessments/`, {
    headers: {
      Authorization: `Bearer ${token}`,  // <-- fixed interpolation here
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch solved assessments");
  }

  return response.json();
};
