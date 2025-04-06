import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseMaterialPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [isTeacher, setIsTeacher] = useState(false);
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/my-courses/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data.courses);
        setIsTeacher(res.data.is_teacher);
      } catch (err) {
        console.error('Failed to fetch courses', err);
        navigate('/schoolLogin');
      }
    };
    fetchCourses();
  }, [token, navigate]);

  const fetchCourseContent = async (courseId) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/course/${courseId}/content/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaterials(res.data.materials);
      setQuizzes(res.data.quizzes);
      setSelectedCourse(courseId);
    } catch (err) {
      console.error('Error fetching content', err);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      await axios.delete(`http://localhost:8000/api/${type}/${id}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCourseContent(selectedCourse);
    } catch (err) {
      console.error(`Failed to delete ${type}`, err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 My Courses</h1>
      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        {courses.map((course) => (
          <button
            key={course.id}
            className={`px-4 py-2 rounded-lg ${selectedCourse === course.id ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
            onClick={() => fetchCourseContent(course.id)}
          >
            {course.name}
          </button>
        ))}
      </div>

      {selectedCourse && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">📖 Materials</h2>
          <ul className="space-y-3 mb-6">
            {materials.map((mat) => (
              <li key={mat.id} className="bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
                <span>{mat.title}</span>
                {isTeacher && (
                  <button onClick={() => handleDelete(mat.id, 'material')} className="text-red-500 hover:underline">Delete</button>
                )}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mb-4">📝 Quizzes</h2>
          <ul className="space-y-3">
            {quizzes.map((quiz) => (
              <li key={quiz.id} className="bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
                <span>{quiz.title}</span>
                {isTeacher && (
                  <button onClick={() => handleDelete(quiz.id, 'quiz')} className="text-red-500 hover:underline">Delete</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseMaterialPage;
