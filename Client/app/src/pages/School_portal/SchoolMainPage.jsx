import React, { useState, useEffect } from 'react';
import useTokenStore from '../../stores/useTokenStore';
import { fetchMyCourses, fetchCourseContent, deleteSchoolItem } from '../../api/school';

const SchoolMainPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseContent, setCourseContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useTokenStore(state => state.token);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        // Use API function instead of direct axios call
        const data = await fetchMyCourses(token);
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading courses:', error);
        setError('Failed to load courses');
        setLoading(false);
      }
    };

    loadCourses();
  }, [token]);

  const handleCourseClick = async (courseId) => {
    setSelectedCourse(courseId);
    try {
      // Use API function instead of direct axios call
      const content = await fetchCourseContent(courseId, token);
      setCourseContent(content);
    } catch (error) {
      console.error('Error loading course content:', error);
      setError('Failed to load course content');
    }
  };

  const handleDelete = async (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        // Use API function instead of direct axios call
        await deleteSchoolItem(type, id, token);
        
        if (type === 'course') {
          setCourses(courses.filter(course => course.id !== id));
          if (selectedCourse === id) {
            setSelectedCourse(null);
            setCourseContent([]);
          }
        } else {
          setCourseContent(courseContent.filter(item => item.id !== id));
        }
      } catch (error) {
        console.error(`Error deleting ${type}:`, error);
        setError(`Failed to delete ${type}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 My Courses</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex gap-4 mb-6 flex-wrap justify-center">
          {courses.map((course) => (
            <button
              key={course.id}
              className={`px-4 py-2 rounded-lg ${selectedCourse === course.id ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
              onClick={() => handleCourseClick(course.id)}
            >
              {course.name}
            </button>
          ))}
        </div>
      )}

      {selectedCourse && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">📖 Course Content</h2>
          <ul className="space-y-3 mb-6">
            {courseContent.map((item) => (
              <li key={item.id} className="bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
                <span>{item.title}</span>
                <button onClick={() => handleDelete(item.type, item.id)} className="text-red-500 hover:underline">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SchoolMainPage;
