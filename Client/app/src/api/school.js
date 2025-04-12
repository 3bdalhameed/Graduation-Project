// API methods for school portal
import axios from "axios";

/**
 * Fetches all students from the API
 * @param {string} token - JWT authentication token
 * @returns {Promise} Promise resolving to students data
 */
export const fetchStudents = async (token) => {
  const response = await fetch("http://localhost:8000/api/students/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
  const response = await fetch("http://localhost:8000/api/classes/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
  const response = await fetch("http://localhost:8000/api/create-teacher/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  const response = await fetch("http://localhost:8000/api/create-student/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
    const response = await axios.get('http://localhost:8000/api/my-courses/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
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
    const response = await axios.get(`http://localhost:8000/api/course/${courseId}/content/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
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
    await axios.delete(`http://localhost:8000/api/${type}/${id}/delete/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return true;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || `Failed to delete ${type}`);
    }
    throw error;
  }
};