// api/school.js

const BACKEND_URL = 'http://localhost:8000'; // Change if your server address is different

export const createSchoolCourse = async (token, data) => {
  const response = await fetch(`${BACKEND_URL}/api/school/courses/create/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create course');
  }

  return await response.json();
};

export const getMyCourses = async (token) => {
  const response = await fetch(`${BACKEND_URL}/api/school/courses/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }

  return await response.json();
};

export const getCourseDetails = async (token, courseId) => {
  const response = await fetch(`${BACKEND_URL}/api/school/courses/${courseId}/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch course details');
  }

  return await response.json();
};

export const addCourseMaterial = async (token, courseId, materialData) => {
  const response = await fetch(`http://localhost:8000/api/school/courses/${courseId}/add-material/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(materialData),
  });

  if (!response.ok) {
    throw new Error('Failed to add material');
  }

  return await response.json();
};

export const addCourseAssessment = async (token, courseId, data) => {
  const response = await fetch(`http://localhost:8000/api/school/courses/${courseId}/add-assessment/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to add assessment');
  }

  return await response.json();
};


export const addAssessmentQuestion = async (token, assessmentId, data) => {
  const response = await fetch(`http://localhost:8000/api/school/assessments/${assessmentId}/add-question/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to add question');
  }

  return await response.json();
};

export const getAssessmentQuestions = async (token, assessmentId) => {
  const response = await fetch(`http://localhost:8000/api/school/assessments/${assessmentId}/quiz/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch questions');
  }

  return await response.json();
};

export const enrollStudentInCourse = async (token, courseId, email) => {
  const response = await fetch(`http://localhost:8000/api/school/courses/${courseId}/enroll/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return await response.json();
};

export const getStudentCourses = async (token) => {
  const response = await fetch('http://localhost:8000/api/school/courses/enrolled/', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch enrolled courses');
  }

  return await response.json();
};

export const submitAssessmentAnswers = async (token, assessmentId, answers, files) => {
  const formData = new FormData();

  // Attach answer list as a JSON string
  formData.append("answers", JSON.stringify(answers));

  // Add files individually
  Object.entries(files).forEach(([questionId, file]) => {
    formData.append(`file_${questionId}`, file);
  });

  const response = await fetch(`http://localhost:8000/api/school/assessments/${assessmentId}/submit/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText);
  }

  return await response.json();
};
