// API methods for school portal
import axios from "axios";
import { API_BASE_URL, getAuthHeader } from "./config";

/**
 * Fetches all students from the API
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to students data
 */
export const fetchStudents = async (token) => {
  const response = await fetch(`${API_BASE_URL}/students/`, {
    headers: getAuthHeader(token),
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  
  return response.json();
};

/**
 * Fetches all classes from the API
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to classes data
 */
export const fetchClasses = async (token) => {
  const response = await fetch(`${API_BASE_URL}/classes/`, {
    headers: getAuthHeader(token),
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch classes");
  }
  
  return response.json();
};

/**
 * Creates a new teacher account
 * @param {Object} teacherData - The teacher data to create
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to the created teacher
 */
export const createTeacher = async (teacherData, token) => {
  const response = await fetch(`${API_BASE_URL}/create-teacher/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
    body: JSON.stringify(teacherData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.detail || "Failed to create teacher");
  }
  
  return data;
};

/**
 * Creates a new student account
 * @param {Object} studentData - The student data to create
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to the created student
 */
export const createStudent = async (studentData, token) => {
  const response = await fetch(`${API_BASE_URL}/create-student/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
    body: JSON.stringify(studentData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.detail || "Failed to create student");
  }
  
  return data;
};

/**
 * Fetches courses for the current user
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to user's courses
 */
export const fetchMyCourses = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/my-courses/`, {
      headers: getAuthHeader(token)
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || "Failed to fetch courses");
    }
    throw error;
  }
};

/**
 * Fetches content for a specific course
 * @param {number} courseId - ID of the course
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to course content
 */
export const fetchCourseContent = async (courseId, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/course/${courseId}/content/`, {
      headers: getAuthHeader(token)
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || "Failed to fetch course content");
    }
    throw error;
  }
};

/**
 * Deletes an item (course, assignment, etc.) from the school portal
 * @param {string} type - Type of item to delete (course, assignment, etc.)
 * @param {number} id - ID of the item to delete
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving when the item is deleted
 */
export const deleteSchoolItem = async (type, id, token) => {
  try {
    await axios.delete(`${API_BASE_URL}/${type}/${id}/delete/`, {
      headers: getAuthHeader(token)
    });
    return true;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || `Failed to delete ${type}`);
    }
    throw error;
  }
};