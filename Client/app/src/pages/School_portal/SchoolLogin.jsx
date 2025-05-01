import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import useTokenStore from "../../stores/useTokenStore"; // ✅ Correct import

export default function SchoolLogin() {
  const [form, setForm] = useState({ email: "", password: "", role: "student" });
  const [loading, setLoading] = useState(false);
  const setToken = useTokenStore((state) => state.setToken); // ✅
  const setRole = useTokenStore((state) => state.setRole);   // ✅

  const BACKEND_URL = 'http://localhost:8000'; // Adjust if needed

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/school/login/`, form);

      // ✅ Save token and role properly
      setToken(res.data.access);
      setRole(res.data.role);

      toast.success("Login successful 🎉 Redirecting...");
      setTimeout(() => {
        if (form.role === "teacher") {
          window.location.href = "/schoolmain";
        } else if (form.role === "student") {
          window.location.href = "/schoolmain";
        } else {
          window.location.href = "/schoolmain"; // fallback
        }
      }, 1500);
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.error || "Login failed. Please check your credentials.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-6">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">School Portal Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>

              <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition"
              >
                Log In
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
