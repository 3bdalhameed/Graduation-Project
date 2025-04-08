import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUserCreatePage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
    course_id: "",
  });
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseUsers, setCourseUsers] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await axios.get("http://localhost:8000/api/courses/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };
    fetchCourses();
  }, []);

  const fetchCourseUsers = async (courseId) => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await axios.get(`http://localhost:8000/api/courses/${courseId}/users/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourseUsers(res.data.users);
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess("");
    setError("");
  };

  const handleCourseSelect = (e) => {
    const courseId = e.target.value;
    setForm({ ...form, course_id: courseId });
    setSelectedCourse(courseId);
    fetchCourseUsers(courseId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.post("http://localhost:8000/api/admin/create-user/", form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` },
      });
      if (res.status === 201) {
        setSuccess("✅ User created successfully.");
        setForm({ username: "", email: "", password: "", role: "student", course_id: selectedCourse });
        fetchCourseUsers(selectedCourse);
      }
    } catch (err) {
      console.error(err);
      setError("❌ Failed to create user.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">🛠️ Admin – Manage Users & Courses</h1>

        <div className="mb-6">
          <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">🎓 Select Course</label>
          <select
            onChange={handleCourseSelect}
            value={selectedCourse || ""}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
          >
            <option value="" disabled>Select a course...</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 mb-8">
          <input name="username" value={form.username} onChange={handleChange} type="text" placeholder="Username" required className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white" />
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" required className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white" />
          <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" required className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white" />
          <select name="role" value={form.role} onChange={handleChange} className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white">
            <option value="student">👨‍🎓 Student</option>
            <option value="teacher">👩‍🏫 Teacher</option>
          </select>
          <button
            type="submit"
            className="col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            ➕ Create User
          </button>
        </form>

        {success && <p className="text-green-500 text-center font-medium mb-4">{success}</p>}
        {error && <p className="text-red-500 text-center font-medium mb-4">{error}</p>}

        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">👥 Users Enrolled in This Course</h3>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full table-auto bg-white dark:bg-gray-800 text-sm text-left text-gray-700 dark:text-gray-200">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
              </tr>
            </thead>
            <tbody>
              {courseUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500 dark:text-gray-400">No users enrolled in this course.</td>
                </tr>
              ) : (
                courseUsers.map((user, idx) => (
                  <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4">{idx + 1}</td>
                    <td className="py-3 px-4 font-medium">{user.username}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`font-semibold px-3 py-1 rounded-full ${
                        user.role === "teacher" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200" :
                        "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUserCreatePage;
